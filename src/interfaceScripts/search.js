class search {
    constructor (store) {
        this.store = store;
        this.input = document.getElementById("search__input");
        this.input.onkeydown = (e) => {
            if (e.keyCode === 13) {
                if (this.getValue() === "" || this.getValue() === null) {
                    this.store.usersList.cleaning(true);
                }
                else {
                    this.store.request.startSearch(10);
                }
            }
        };
    }

    getValue () {
        return this.input.value;
    }

    setValue (value) {
        this.input.value = value;
    }
}

module.exports = search;