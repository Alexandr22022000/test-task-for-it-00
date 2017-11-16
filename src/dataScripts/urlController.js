class urlController {
    constructor (store) {
        this.store = store;
    }

    getToken () {
        return urlController.getParam('access_token=');
    }

    getSearchData () {
        const text = urlController.getParam("search_text="),
            itemsCount =  parseInt(urlController.getParam("items_count=")),
            scrollPosition =  parseInt(urlController.getParam("scroll_position="));

        history.pushState(null, null, urlController.getCleanUrl());

        if (text === null) return null;
        return {text, itemsCount, scrollPosition};
    }

    setUrlSearch () {
        this.setParam("search_text=", this.store.search.getValue());
        this.setParam("items_count=", this.store.usersCount);
        this.setParam("scroll_position=", this.store.usersList.getScrollPosition());
    }

    static goToMainPage (text) {
        document.location.href = `${urlController.getCleanUrl()}#search_text=${text}`;
    }

    static getNewToken () {
        document.location.href = `https://oauth.vk.com/authorize?client_id=6105599&display=page&redirect_uri=${this.getCleanUrl()}&scope=friends&response_type=token&v=5.6`;
    }

    static goToUserPage (id) {
        let buffer = urlController.getId(id, "element-text-");
        if (buffer) return window.location.href = urlController.getCleanUrl() + "/user#id=" +  buffer;
        buffer = urlController.getId(id, "element-img-");
        if (buffer) return window.location.href = urlController.getCleanUrl() + "/user#id=" +  buffer;
        window.location.href = urlController.getCleanUrl() + "/user#id=" + urlController.getId(id, "element-");
    }

    static getCleanUrl () {
        let url = window.location.href;
        let end = url.indexOf("/", 8);
        end = (end === -1) ? url.length : end;
        url = url.substring(0, end);
        return (url.indexOf("localhost:8080", 0) === -1) ? url : (url + "/dust");
    }

    static getParam (param) {
        const url = window.location.href;
        if (url.indexOf(param, 0) === -1) return null;

        let start = url.indexOf(param, 0) + param.length;
        let end = url.indexOf('&', start);
        end = (end === -1) ? url.length : end;
        return url.substring(start, end);
    }

    setParam (param, value) {
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