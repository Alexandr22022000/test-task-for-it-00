const jsonp = require("jsonp"),
    {VERSION, METHOD_SEARCH_USERS, STATUS_WAITING, STATUS_ERROR, STATUS_OK} = require("../constants/constants");

class request {
    constructor (store) {
        this.store = store;
        this.requesting = false;
    }

    sendRequest (method, params, callback) {
        params.v = VERSION;
        params.access_token = this.store.token;

        let paramsString = null;
        for (let name in params) {
            if (paramsString === null) {
                paramsString = `${name}=${params[name]}`;
            }
            else {
                paramsString = `${paramsString}&${name}=${params[name]}`;
            }
        }

        this.store.statusBar.setStatus(STATUS_WAITING);

        jsonp(`https://api.vk.com/method/${method}?${paramsString}`, null, (errorData, data) => {
            if (errorData) {
                console.log(errorData);
                this.store.statusBar.setStatus(STATUS_ERROR);
                callback(errorData, null);
                return;
            }

            if (data.error) {
                console.log(data.error);
                this.store.statusBar.setStatus(STATUS_ERROR);
                callback(data.error, null);
            }
            else {
                this.store.statusBar.setStatus(STATUS_OK);
                callback(errorData, data.response);
            }
        });
    }

    loadNewUsers () {
        if (!this.requesting) {
            this.requesting = true;
            this.store.usersList.addAlertLoading();

            this.sendRequest(METHOD_SEARCH_USERS, {
                q: this.store.search.getValue(),
                fields: 'photo_200',
                count: 10,
                offset: this.store.usersCount
            }, (error, data) => {
                this.store.usersList.delAlert();
                this.requesting = false;
                if (error) return this.store.usersList.addAlertError();
                this.store.usersList.addItems(data);
                this.store.usersCount += 10;
            });
        }
    }

    startSearch (count, callback) {
        this.sendRequest(METHOD_SEARCH_USERS, {
            q: this.store.search.getValue(),
            fields: 'photo_200',
            count: count
        }, (error, data) => {
            this.store.usersList.cleaning(false);
            this.store.usersList.addItems(data);
            this.store.usersCount = count;
            if (callback) callback();
        });
    }
}

module.exports = request;