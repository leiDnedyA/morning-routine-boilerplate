import SiteScraper from './scripts/background_modules/SiteScraper.js'
import {tabIsOpen} from './scripts/background_modules/tabFunctions.js';

chrome.runtime.onInstalled.addListener(() => {
    console.log('<3')
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse)=>{
    if(req.message == 'start'){
        console.log('Good morning, Ayden!')
        console.log('starting script...')
        main()
        .then((message)=>{
            console.log(message.message)
        });
    }
})

//fills out spreadsheet with all needed info
const main = async () => {

    const spreadSheetURL = 'https://docs.google.com/spreadsheets/d/1C7BUsezoUFqRsp2SzK7I7XorhBda2_fmpiEeeB9Mmt8/edit#gid=0';
    const otherSites = [
        new SiteScraper('https://beaconcard.umb.edu/login.php',
        async () =>{
            
        })
    ]

    let isOpen = await tabIsOpen(spreadSheetURL)

    console.log(isOpen)

    if(!isOpen){
        chrome.tabs.create(
            {active: false,
                index: 0,
                pinned: true,
                url: spreadSheetURL}
        );
    }

    return {message: 'success'}

}