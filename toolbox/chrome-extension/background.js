function attachToYoutubePlayer(){
  console.dir(document);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  console.log(sender);
  console.log(sendResponse);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      const regex = new RegExp(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/);
      if(changeInfo.url && changeInfo.url.match(regex)){
          console.log('Client is now watching a video');
          chrome.tabs.query({active:true,currentWindow: true}, (tabs) => {
              console.log('Attaching trenity on the youtube player...');
              chrome.tabs.sendMessage(tabs[0].id,{action: "attach_to_youtube_player"}, (res) => {
                  //do something with the response
              });
          });
      }
  });
});