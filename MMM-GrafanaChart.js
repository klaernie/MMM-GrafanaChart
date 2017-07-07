Module.register("MMM-GrafanaChart", {
    // Default module config.
    defaults: {
        height:"100%",
        width:"100%",
        refreshInterval: 900
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.scheduleUpdate(this.config.refreshInterval);
    },
    // Override dom generator.
    getDom: function() {
        var iframe = document.createElement("IFRAME");
        iframe.style = "border:0"
        iframe.width = this.config.width;
        iframe.height = this.config.height;
        iframe.src =  "http://" +  this.config.host + ":" + this.config.port + "/dashboard-solo/db/" + this.config.dashboardname+  "?orgId=" + this.config.orgId + "&panelId=" + this.config.panelId;;
        iframe.setAttribute("timestamp", new Date().getTime());
        return iframe;
    },
    scheduleUpdate: function(delay) {
        var nextLoad = this.config.refreshInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay * 1000; // Convert seconds to millis
        }
        var self = this;
        setTimeout(function() {
            self.updateFrame();
        }, nextLoad);
    },
    updateFrame: function() {
        if (this.config.url === "") {
            Log.error("Tried to refresh, iFrameReload URL not set!");
            return;
        }
        this.src = "http://" +  this.config.host + ":" + this.config.port + "/dashboard-solo/db/" + this.config.dashboardname+  "?orgId=" + this.config.orgId + "&panelId=" + this.config.panelId;
        Log.info("attempting to update dom for iFrameReload");
        Log.info('/"this/" module is: ' + this);
        this.updateDom(1000);
        this.scheduleUpdate(this.config.refreshInterval);
    }
});