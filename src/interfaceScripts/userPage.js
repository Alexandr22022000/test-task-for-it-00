const {DEFAULT_IMG} = require("../constants/constants");

class userPage {
    constructor () {
        this.name = document.getElementsByClassName("user-page-title__name");
        this.online = document.getElementsByClassName("user-page-title__online");
        this.status = document.getElementsByClassName("user-page-title__status");

        this.img = document.getElementById("user-page-img__img");

        this.work = document.getElementsByClassName("user-page-title__work");
        this.city = document.getElementsByClassName("user-page-title__city");

        this.friends = document.getElementById("user-page-content__friends");
        this.groups = document.getElementById("user-page-content__groups");
        this.subscribers = document.getElementById("user-page-content__subscribers");
        this.interestingPages = document.getElementById("user-page-content__interesting-pages");
        this.photos = document.getElementById("user-page-content__photo");
        this.photoAlbum = document.getElementById("user-page-content__photo-album");
        this.videos = document.getElementById("user-page-content__videos");
        this.audio = document.getElementById("user-page-content__audio");
        this.notes = document.getElementById("user-page-content__memos");
    }

    setData (data) {
        console.log(data);

        for (let key in this.name) {
            this.setDataSameElements(this.name[key], data.first_name + " " + data.last_name);
            this.setDataSameElements(this.online[key], (data.online === 0) ? "Offline" : "Online");
            this.setDataSameElements(this.status[key], data.status);

            this.setDataSameElements(this.work[key], data.occupation ? data.occupation.name : "");
            this.setDataSameElements(this.city[key], data.city ? "Город: " + data.city.title : "");
        }

        let img = DEFAULT_IMG;
        img = data.photo_200 ? data.photo_200 : img;
        this.img.src = img;

        this.friends.textContent = this.createCountersText("Друзья", data.counters.friends);
        this.groups.textContent = this.createCountersText("Группы", data.counters.groups);
        this.subscribers.textContent = this.createCountersText("Подпищики", data.counters.subscriptions);
        this.interestingPages.textContent = this.createCountersText("Интересные страницы", data.counters.pages);
        this.photos.textContent = this.createCountersText("Фото", data.counters.photos);
        this.photoAlbum.textContent = this.createCountersText("Фото альбомы", data.counters.albums);
        this.videos.textContent = this.createCountersText("Видео", data.counters.videos);
        this.audio.textContent = this.createCountersText("Аудио записи", data.counters.audios);
        this.notes.textContent = this.createCountersText("Заметки", data.counters.notes);
    }

    createCountersText (name, count) {
        if (count === undefined) return name + ": СКРЫТО";
        return name + ": " + count;
    }

    setDataSameElements (element, data) {
        if (!element.textContent) return;
        element.textContent = data;
    }
}

module.exports = userPage;