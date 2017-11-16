const urlController = require("../dataScripts/urlController");

class usersList {
    constructor (store) {
        this.store = store;
        this.isEnd = false;
        this.items = [];
        this.list = document.getElementById("content__scroll");

        this.list.onscroll = () => {
            if (((this.list.scrollTop + this.list.clientHeight) >= (this.list.scrollHeight - 100)) && !this.isEnd)
                this.store.request.loadNewUsers();
        };

        const searchData = store.urlController.getSearchData();
        if (!searchData) return;

        this.store.search.setValue(searchData.text);
        this.store.request.startSearch(searchData.itemsCount ? searchData.itemsCount : 10, () => {
            if (!searchData.scrollPosition) return;
            this.list.scrollTop = searchData.scrollPosition;
        });
    }

    addItems ({items}) {
        if (!items || items.length === 0 ) {
            this.addAlertEnd();
            this.isEnd = true;
        }

        this.items = this.items.concat(items);

        let dataLine = "";
        for (let key in items) {
            let img = "https://akphoto3.ask.fm/095/881/054/-99997000-1tq2mj8-915nosf68ntdrap/original/file.jpg";
            img = items[key].photo_200 ? items[key].photo_200 : img;
            dataLine += `<div id="element-${items[key].id}" class="element"><img id="element-img-${items[key].id}" class="element__img" src="${img}"/><h1 id="element-text-${items[key].id}" class="element__text">${items[key].first_name} ${items[key].last_name}</h1></div>`;
        }
        this.list.innerHTML += dataLine;

        this.addOnClicks();
    }

    cleaning () {
        this.isEnd = false;
        this.list.innerHTML = "";
        this.items = [];
        this.list.scrollTop = 0;
    }

    addAlertLoading () {
        this.list.innerHTML += `<div class="alert-element" id="alert-element"><div class="alert-element__loader"></div></div>`;
        this.addOnClicks();
    }

    addAlertError () {
        this.list.innerHTML += `<div id="alert-element" class="alert-element"><h1 class="alert-element__text">Ошибка</h1></div>`;
        this.isEnd = true;
        this.addOnClicks();
    }

    delAlert () {
        this.list.removeChild(document.getElementById("alert-element"));
    }

    addAlertEnd () {
        this.list.innerHTML += `<div id="alert-element" class="alert-element"><h1 class="alert-element__text">Нет данных</h1></div>`;
        this.addOnClicks();
    }

    getScrollPosition () {
        return this.list.scrollTop;
    }

    addOnClicks () {
        for (let key in this.items) {
            document.getElementById(`element-${this.items[key].id}`).onclick = (e) => {
                this.store.urlController.setUrlSearch();
                urlController.goToUserPage(e.srcElement.id);
            };
        }
    }
}

module.exports = usersList;