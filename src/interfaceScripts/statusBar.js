const {STATUS_OK, STATUS_WAITING, STATUS_ERROR} = require("../constants/constants");

class statusBar {
    constructor () {
        this.loading = document.getElementById("status-bar__loading");
        this.ok = document.getElementById("status-bar__ok");
        this.error = document.getElementById("status-bar__error");
    }

    setStatus (status) {
        switch (status) {
            case STATUS_OK:
                this.error.style.display = "none";
                this.loading.style.display = "none";
                this.ok.style.display = "block";
                break;

            case STATUS_WAITING:
                this.error.style.display = "none";
                this.loading.style.display = "block";
                this.ok.style.display = "none";
                break;

            case STATUS_ERROR:
                this.error.style.display = "block";
                this.loading.style.display = "none";
                this.ok.style.display = "none";
                break;
        }
    }
}

module.exports = statusBar;