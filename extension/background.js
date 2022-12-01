import SiteScraper from './scripts/background_modules/SiteScraper.js'
import {tabIsOpen, openTab, getTabByUrl} from './scripts/background_modules/tabFunctions.js';

const sendUpdateMessage = (msg, finished = false) => {
    chrome.runtime.sendMessage({
        type: 'update',
        message: msg,
        finished: finished
    });
};

chrome.runtime.onInstalled.addListener(() => {
    console.log('<3')
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse)=>{
    if(req.type == 'startScript'){
        console.log('Good morning, Ayden!')
        console.log('starting script...')
        main()
            .then((result)=>{
                console.log(result);
                sendUpdateMessage(result.userMessage, true);
            })
    }
});

//fills out spreadsheet with all needed info
const main = async () => {

    sendUpdateMessage('Script started...');

    const startTime = Date.now();

    const spreadSheetURL = 'https://docs.google.com/spreadsheets/d/1C7BUsezoUFqRsp2SzK7I7XorhBda2_fmpiEeeB9Mmt8/edit#gid=0';
    const otherSites = [
        new SiteScraper('https://beaconcard.umb.edu/login.php',
        async () =>{
            
        })
    ]

    // TODO: create a class or object that handles spreadsheet with methods to update values
    
    let sheetTab = null;

    if(!await tabIsOpen(spreadSheetURL)){
        sheetTab = await openTab(spreadSheetURL);
    }else{
        sheetTab = getTabByUrl(spreadSheetURL);
    }

    // TODO: create modules for individual site scripts, run them here


    const executionTime = (Date.now() - startTime) / 1000; //in seconds

    return {successful: true, userMessage: `Script completed in ${executionTime} seconds.`}

}