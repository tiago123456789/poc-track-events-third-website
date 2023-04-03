(function () {
    let accountId = document.currentScript.getAttribute('account-id');
    let eventProjectId = document.currentScript.getAttribute('event-project-id');
    const key = 'browser_session'
    let browserSession = localStorage.getItem(key);

    function setBrowserSession() {
        const sessionId = `${accountId}${eventProjectId}${new Date().getTime()}`
        if (!browserSession) {
            localStorage.setItem(key, sessionId)
            browserSession = sessionId
        }
    }

    window.emitEvent = function (event, data) {

        fetch(`http://localhost:3000/track-events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                browserSession,
                event, data, 
                accountId, eventProjectId
            })
        })
    }

    setBrowserSession()
})()