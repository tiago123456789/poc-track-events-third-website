require("dotenv").config()
const crypto = require("crypto")
const express = require("express")
const cors = require("cors")
const Queue = require("bull")
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const { createClient } = require("redis");

const app = express();
require("./config/Database")

app.use(express.json())
app.use(cors("*"))

const AccountModel = require("./collections/Account");
const EventProjectModel = require("./collections/EventProject")

const client = createClient({});

client.connect();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => client.sendCommand(args),
    }),
});

const eventTrackQueue = new Queue('event_track')

const checkIfDomainAllowedSendedRequest = async (request, response, next) => {
    const domain = request.headers.origin
            .replace(/http:\/\/|https:\/\//, "")
            .replace(/:([0-9])+/g, "")


    
    let hasDomainAllowed = false;
    const keyCache = `${request.body.eventProjectId}${domain}`
    const eventProjectDomainAllowedCached = await client.get(keyCache);
    if (eventProjectDomainAllowedCached) {
        hasDomainAllowed = true
    } else {
        hasDomainAllowed = await EventProjectModel.findOne({ 
            token: request.body.eventProjectId,
            domainAllowed: domain
        })
        await client.set(`${request.body.eventProjectId}${domain}`, "true", 10)
    }
    
    if (!hasDomainAllowed) {
        return response.sendStatus(403)
    }

    next();
}

const hasAuthorization = async (request, response, next) => {
    const { accountId, eventProjectId } = request.body;
    const keyCache = `${accountId}${eventProjectId}`
    let hasValidCredentials;
    
    const hasValidCredentialsCached = await client.get(keyCache)
    if (hasValidCredentialsCached) {
        hasValidCredentials = true;
    } else {
        hasValidCredentials = await EventProjectModel.findOne({
            token: eventProjectId,
            accountId: accountId
        })
        await client.set(keyCache, "true", 10)
    }

    if (!hasValidCredentials) {
        return response.sendStatus(403)
    }

    next();
}

app.post(
    "/track-events",
    checkIfDomainAllowedSendedRequest,
    hasAuthorization,
    limiter,
    async (request, response) => {
        const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress
        await eventTrackQueue.add({
            ip,
            ...request.body,
            ...request.headers
        })
        response.sendStatus(202)
    })

app.post("/accounts", async (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: ["Name is required"]
        })
    }

    const account = new AccountModel({
        name: body.name,
        token: crypto.randomUUID()
    })

    const accountCreated = await account.save()
    return response.status(201).json(accountCreated)

})

app.post("/accounts/:accountId/event-projects", async (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: ["The name is required"]
        })
    }

    if (!body.domainAllowed) {
        return response.status(400).json({
            error: ["The domainAllowed is required"]
        })
    }

    const account = await AccountModel.find({ token: request.params.accountId })
    const isAccountNotFound = account.length == 0
    if (isAccountNotFound) {
        return response.status(404).json({
            error: "Account not found"
        })
    }

    const eventProjectModel = new EventProjectModel({
        name: body.name,
        accountId: request.params.accountId,
        token: crypto.randomUUID(),
        domainAllowed: body.domainAllowed
    })

    const eventProjectCreated = await eventProjectModel.save()
    return response.status(201).json(eventProjectCreated)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:3000`)
})