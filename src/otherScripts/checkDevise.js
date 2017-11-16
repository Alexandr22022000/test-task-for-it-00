module.exports = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);

    if (isMobile) {
        document.write('<script src="./style-mobile.js"></script>');
    }
    else {
        document.write('<script src="./style.js"></script>')
    }
};