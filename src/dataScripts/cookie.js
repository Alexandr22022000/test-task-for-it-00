class cookie {
    getCookie () {
        //document.cookie = `token=q;max-age=0;path=/`;
        //document.cookie = `token=gmmasgndjlgmsldgnkasdad243254345764;max-age=2678400;path=/`;

        const cookie = document.cookie;

        const name = "token";
        if (cookie.indexOf("token", 0) === -1) {
            return null;
        }
        else {
            let start = cookie.indexOf(name, 0) + name.length + 1;
            let end = cookie.indexOf(';', start);

            if (end === -1) {
                return cookie.substring(start, cookie.length);
            }
            return cookie.substring(start, end);
        }
    }

    setCookie (token) {
        document.cookie = `token=${token};max-age=2678400;path=/`;
    }
}

module.exports = cookie;