
class SiteScraper{
    //callback should be async and take the parameter URL
    constructor(url, callback){
        this.url = url;
        this.callback = callback;
    }

    async openTab(){
        chrome.tabs.open()
    }

    //returns the value of an element from a dom query
    async scrape(domQuery){
        const tab = await chrome.tabs.create(
            { 
                active: true, 
                url: this.url
            }
        );
        
        

    }

}

export default SiteScraper