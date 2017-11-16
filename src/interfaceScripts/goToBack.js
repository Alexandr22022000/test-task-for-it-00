const urlController = require("../dataScripts/urlController");

class goToBack {
    constructor () {
        document.getElementById("go-to-back").onclick = () => {
            history.back();
        };

        this.input = document.getElementById("search__input");

        this.input.onkeydown = (e) => {
            if (e.keyCode === 13) {
                urlController.goToMainPage(this.input.value);
            }
        };
    }
}

module.exports = goToBack;