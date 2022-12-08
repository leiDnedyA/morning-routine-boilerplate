window.onload = function () {
    document.querySelector('button').addEventListener('click', function () {
        console.log('hi')
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            console.log(token);
        });
    });
};
