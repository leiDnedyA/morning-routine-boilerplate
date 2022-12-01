const startButton = document.querySelector('#startButton');
const updateText = document.querySelector('#messageText');

const start = () => {
    chrome.runtime.sendMessage(
        message = {type: "startScript"}
    )
    startButton.disabled = true;
}

const finish = () => {
    startButton.disabled = false;
}

chrome.runtime.onMessage.addListener((message)=>{
    if(message.type == 'update'){
        messageText.innerHTML = message.message;
        if(message.finished){
            finish();
        }
    }
});

startButton.onclick = start;


console.log(startButton.onclick)