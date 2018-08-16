function attachToYoutubePlayer(){
    console.dir(document);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    console.log(sender);
    console.log(sendResponse);
});

function sendMessageForYoutube(){
    console.log('Client is now watching a video');
    chrome.tabs.query({active:true,currentWindow: true}, (tabs) => {
        console.log('Attaching trenity on the youtube player...');
        chrome.tabs.sendMessage(tabs[0].id,{action: "attach_to_youtube_player"}, (res) => {
            //do something with the response
        });
    });
}

function sendMessageForHotstar(){
    console.log('Client is on hotstar and watching a video');
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log('Attaching trenity on hotstar video player...');
        console.log(tabs);
        setTimeout(() => {
            console.log('Sending message to the page');
            chrome.tabs.sendMessage(Number(tabs[0].id), {action: "attach_to_hotstar_player"}, (res) => {
                //do something with the response.
            });
        },2000);
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const youtubeRegex = new RegExp(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/);
    const hotstarRegex = new RegExp(/^(https?\:\/\/)?(www\.)?(hotstar\.com)\/sports\/football\/([A-Za-z-0-9])*\/([0-9])+\/?/)
    if(changeInfo.url && changeInfo.url.match(youtubeRegex)){
        sendMessageForYoutube();
    }
    else if(changeInfo.url && changeInfo.url.match(hotstarRegex)){
        sendMessageForHotstar();
    }
    if(!(changeInfo.url)){
        if(tab.url.match(youtubeRegex)){
            sendMessageForYoutube();
        }
        else if(tab.url.match(hotstarRegex)){
            sendMessageForHotstar();
        }
    }
});