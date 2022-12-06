
import {openTab} from './tabFunctions.js'

/**
 * Scrapes desired data from a site based on a "scrapeSequence" object
 * 
 * scrapeSequence: Object
 * scrapeSequence.startURL {string} url that the is opened initially
 * scrapeSequence.urlActions {object} [key: url {string}] : value {object} {[key: domQuery], value: {input {string} //ignored if button}}
 * scrapeSequence.finalQuery {string} DOM query of target element
 * scrapeSequence.finalQueryIndex {int} if finalQuery returns a list, this index will be used to pick out the desired element
 */

async function scrapeSite(scrapeSequence){
    let tab = await openTab(scrapeSequence.startURL);
    
    for(let url in scrapeSequence.urlActions){
        // TODO: do actions based on urlActions
    }

    return new Promise((res, rej)=>{
        
        const listener = (tabId, changeInfo, updatedTab)=>{
            if (tabId == tab.id && updatedTab.url.includes(scrapeSequence.finalURL)){
                // TODO: get dom element based on finalQuery
                chrome.tabs.sendMessage(tab.id, {msgType: 'domQuery', query: scrapeSequence.finalQuery},
                (domContent)=>{
                    chrome.tabs.onUpdated.removeListener(listener);
                    res(domContent)
                })
            }
        };
        
        chrome.tabs.onUpdated.addListener(listener);
    })

}

export default scrapeSite