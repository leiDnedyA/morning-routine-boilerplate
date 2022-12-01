
const tabIsOpen = (url) => {

    return new Promise((res, rej) => {
        chrome.tabs.query({}, (tabs)=>{
            for(let i in tabs){
                let tab = tabs[i];
                console.log(tab.url.toLowerCase());
                console.log(url.toLowerCase());
                console.log(tab.url.toLowerCase().includes(url.toLowerCase()))
                if (tab.url.toLowerCase().includes(url.toLowerCase())){
                    res(true);
                }
            }
            res(false);
        })
    });
}

export {tabIsOpen}