const startButton = document.querySelector('#startButton');

const sendStart = () => {
    chrome.runtime.sendMessage(
        message = {message: "start"}
    )
}

startButton.onclick = sendStart;


console.log(startButton.onclick)