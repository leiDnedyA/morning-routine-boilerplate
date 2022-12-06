
chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    
    if(msg.msgType == 'domQuery'){
        sendResponse(Document.querySelector(msg.query));
    }

})
