
const tabIsOpen = async (url) => {

    const tab = await getTabByUrl(url);

    return tab != null

}

// Opens a new tab, resolves with resulting tab
const openTab = async (url, active = false, pinned = false) => {

    const tab = await chrome.tabs.create({
        url: url,
        active: active,
        pinned: pinned
    });

    return tab;
}

const getTabByUrl = async (url) => {
    return new Promise((res, rej) => {
        chrome.tabs.query({}, (tabs)=>{
            for(let i in tabs){
                let tab = tabs[i];
                if (tab.url.toLowerCase().includes(url.toLowerCase())){
                    res(tab);
                }
            }
            res(null);
        })
    })
}

export {tabIsOpen, openTab, getTabByUrl}