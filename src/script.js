const request = require("./dataScripts/request"),
    cookie = require("./dataScripts/cookie"),
    search = require("./interfaceScripts/search"),
    statusBar = require("./interfaceScripts/statusBar"),
    userData = require("./interfaceScripts/userData"),
    usersList = require("./interfaceScripts/usersList"),
    urlController = require("./dataScripts/urlController"),
    checkDevice = require("./otherScripts/checkDevise"),
    {METHOD_GET_USER} = require("./constants/constants"),
    store = {};

checkDevice();
store.urlController = new urlController(store);
store.cookie = new cookie();

store.token = store.urlController.getToken();

if (store.token === null) {
    store.token = store.cookie.getCookie();
}
else {
    store.cookie.setCookie(store.token);
}

if (store.token === null) {
    urlController.getNewToken();
}
else {
    store.request = new request(store);
    store.userData = new userData(store);
    store.search = new search(store);
    store.statusBar = new statusBar(store);
    store.usersList = new usersList(store);

    store.request.sendRequest(METHOD_GET_USER, {}, (error, data) => {
        if (error) return urlController.getNewToken();
        store.userData.setUser(data);
    });
}