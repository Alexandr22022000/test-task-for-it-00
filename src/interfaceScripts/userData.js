class userData {
    constructor () {
        this.text = document.getElementById("user-data__text");
    }

    setUser (data) {
        this.text.textContent = data[0].first_name + " " + data[0].last_name;
    }
}

module.exports = userData;