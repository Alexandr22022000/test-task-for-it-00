const request = require("../dataScripts/request"),
    statusBat = require("../interfaceScripts/statusBar"),
    userData = require("../interfaceScripts/userData"),
    goToBack = require("../interfaceScripts/goToBack"),
    cookie = require("../dataScripts/cookie"),
    userPage = require("../interfaceScripts/userPage"),
    urlController = require("../dataScripts/urlController"),
    checkDevise = require("../otherScripts/checkDevise"),
    {METHOD_GET_USER, STATUS_ERROR} = require("../constants/constants"),
    store = {};

checkDevise();

store.token = new cookie().getCookie();

if (store.token === null) {
    urlController.getNewToken();
}
else {
    store.goToBack = new goToBack();
    store.statusBar = new statusBat(store);
    store.request = new request(store);
    store.userData = new userData(store);
    store.userPage = new userPage();

    store.request.sendRequest(METHOD_GET_USER, {}, (error, data) => {
        if (error) return urlController.getNewToken();
        store.userData.setUser(data);

        let id = urlController.getParam("id=");
        if (!id) {
            store.statusBar.setStatus(STATUS_ERROR);
        }
        else {
            store.request.sendRequest(METHOD_GET_USER, {
                user_ids: id,
                fields: "photo_200,city,online,occupation,counters,status"
            }, (error, data) => {
                if (error) return;

                store.userPage.setData(data[0]);
            });
        }
    });
}