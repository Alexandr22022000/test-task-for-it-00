const {PARAM_TOKEN, PARAM_SEARCH_TEXT, PARAM_ITEMS_COUNT, PARAM_SCROLL_POSITION, PARAM_ID} = require("../constants/constants");

class urlController {
    constructor (store) {
        this.store = store;
    }

    getToken () {
        return urlController.getParam(PARAM_TOKEN);
    }

    getSearchData () {
        const text = urlController.getParam(PARAM_SEARCH_TEXT),
            itemsCount =  parseInt(urlController.getParam(PARAM_ITEMS_COUNT)),
            scrollPosition =  parseInt(urlController.getParam(PARAM_SCROLL_POSITION));

        history.pushState(null, null, urlController.getCleanUrl());

        if (text === null) return null;
        return {text, itemsCount, scrollPosition};
    }

    setUrlSearch () {
        this.setParam(PARAM_SEARCH_TEXT, this.store.search.getValue());
        this.setParam(PARAM_ITEMS_COUNT, this.store.usersCount);
        this.setParam(PARAM_SCROLL_POSITION, this.store.usersList.getScrollPosition());
    }

    static goToMainPage (text) {
        document.location.href = `${urlController.getCleanUrl()}#${PARAM_SEARCH_TEXT}=${text}`;
    }

    static getNewToken () {
        document.location.href = `https://oauth.vk.com/authorize?client_id=6261615&display=page&redirect_uri=${this.getCleanUrl()}&scope=friends&response_type=token&v=5.6`;
    }

    static goToUserPage (id) {
        let buffer = urlController.getId(id, "element-text-");
        if (buffer) return window.location.href = `${urlController.getCleanUrl()}/user#${PARAM_ID}=${buffer}`;
        buffer = urlController.getId(id, "element-img-");
        if (buffer) return window.location.href = `${urlController.getCleanUrl()}/user#${PARAM_ID}=${buffer}`;
        window.location.href = `${urlController.getCleanUrl()}/user#${PARAM_ID}=${urlController.getId(id, "element-")}`;
    }

    static getCleanUrl () {
        let url = window.location.href;
        let end = url.indexOf("/", 8);
        end = (end === -1) ? url.length : end;
        url = url.substring(0, end);
        url = (url.indexOf("localhost:8080", 0) === -1) ? url : (url + "/dust");
        url = (url.indexOf("test-hosting-00", 0) === -1) ? url : (url + "/test-task-for-it-00");
        return url;
    }

    static getParam (param) {
        param = param + "=";
        const url = window.location.href;
        if (url.indexOf(param, 0) === -1) return null;

        let start = url.indexOf(param, 0) + param.length;
        let end = url.indexOf('&', start);
        end = (end === -1) ? url.length : end;
        return url.substring(start, end);
    }

    setParam (param, value) {
        param = param + "=";
        const url = window.location.href;
        if (url.indexOf(param, 0) === -1) return this.addParam(param, value);

        let start = url.indexOf(param, 0) + param.length;
        let end = url.indexOf('&', start);
        end = (end === -1) ? url.length : end;

        history.pushState(null, null, url.substring(0, start) + value + url.substring(end, url.length));
    }

    addParam (param, value) {
        const url = window.location.href;

        if (url.indexOf("=", 0) === -1) {
            if (url.substring(url.length - 1, url.length) === "#") {
                window.location.href = url + param + value;
            }
            else {
                window.location.href = url + "#" + param + value;
            }        }
        else {
            if (url.substring(url.length - 1, url.length) === "&") {
                window.location.href = url + param + value;
            }
            else {
                window.location.href = url + "&" + param + value;
            }
        }
    }

    static getId (text, id) {
        if (text.indexOf(id, 0) === -1) return null;
        return text.substring(id.length, text.length);
    }
}

module.exports = urlController;