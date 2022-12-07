import scrapeSite from './scripts/background_modules/scrapeSite.js'
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

    const spreadSheetURL = 'https://docs.google.com/spreadsheets/d/1W2Y1LJHbjme5p9T4hSrdX7pVR3Pb8k2ylO6wqgT4MLc/edit#gid=0';
    const scrapeSequences = [
        {
            sequence: {
                startURL: 'https://beaconcard.umb.edu/login.php',
                urlActions: {},
                finalURL: 'beaconcard.umb.edu/index.php',
                finalQuery: '.jsa_amount.pos',
                finalQueryIndex: 1
            },
            sheetCell: 'a1'
        }
    ]

    // TODO: create a class or object that handles spreadsheet with methods to update values
    
    let sheetTab = null;

    if(!await tabIsOpen(spreadSheetURL)){
        sheetTab = await openTab(spreadSheetURL);
    }else{
        sheetTab = await getTabByUrl(spreadSheetURL);
    }

    // TODO: create modules for individual site scripts, run them here
    for(let i in scrapeSequences){
        let seq = scrapeSequences[i];
        // val is the scraped value from the site
        let val = await scrapeSite(seq.sequence);
        // TODO: set sheet cell at seq.sheetCell to val
        console.log(val);
    }

    const executionTime = (Date.now() - startTime) / 1000; //in seconds

    return {successful: true, userMessage: `Script completed in ${executionTime} seconds.`}

}