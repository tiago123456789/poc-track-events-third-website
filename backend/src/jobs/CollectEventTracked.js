const Queue = require("bull")

const EventTrackedModel = require("../collections/EventTracked")

const eventTrackQueue = new Queue('event_track')

eventTrackQueue.process(async (job, done) => {
    console.log("Starting process to collect event tracked")
    const eventTrack = new EventTrackedModel({
        event: job.data.event,
        accountId: job.data.accountId,
        eventProjectId: job.data.eventProjectId,
        ip: job.data.ip,
        userAgent: job.data["user-agent"],
        browserSession: job.data.browserSession,
        originalUrl: job.data.originalUrl,
        data: job.data.data
    })
    await eventTrack.save()
    console.log("Saved event tracked")
    console.log("Finish process to save event tracked")
    done();
})
