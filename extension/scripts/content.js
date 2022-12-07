
console.log('content script loaded.')

chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    
    const url = window.location.href;

    console.log('message recieved from bg script...')
    
    if(msg.msgType == 'domQuery'){
        let queryResp = document.querySelectorAll(msg.query);
        
        if(msg.hasOwnProperty('queryIndex')){
            queryResp = queryResp[msg.queryIndex];
        }else{
            queryResp = queryResp[0];
        }

        let respText = queryResp.textContent;

        if(msg.hasOwnProperty('regex')){
            console.log(msg.regex)
            const re = new RegExp(msg.regex);
            respText = re.exec(respText)[0];
        }

        console.log(respText);
        sendResponse(respText);
    }

})
