setInterval(function() {
    if (document.title === "<DOWNLOADER>") {
        document.title = ">DOWNLOADER<";
    } else {
        document.title = "<DOWNLOADER>";
    }
}, 100);