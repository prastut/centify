const youtubePlayButtonSelector = '#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button';
const youtubeSeekSelector = '#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar';

let runOnce = false;

/**
 * Returns an object which shows the current value of aria_label, which means that the player state 
 * is opposite of this
 * @param {String} aria_label This methods acts a watcher for the play pause button of the youtube player
 */
function watchYoutubePlayButton(aria_label){
    const newAriaLabel = document.querySelector(youtubePlayButtonSelector).getAttribute('aria-label');
    if(newAriaLabel !== aria_label){
        document.querySelector(youtubePlayButtonSelector).dispatchEvent(
            new CustomEvent('playPauseCheck', { 
                bubbles: false,
                detail: {
                    aria_label: newAriaLabel
                }
            })
        );
    }
    setTimeout(() => {
        watchYoutubePlayButton(newAriaLabel);
    },100);
}

function watchForUserScrubbing(oldAriavaluenow){
    const newAriaValuenow = document.querySelector(youtubeSeekSelector).getAttribute('aria-valuenow');
    if(newAriaValuenow !== oldAriavaluenow){
        document.querySelector(youtubeSeekSelector).dispatchEvent(
            new CustomEvent('seek', {
                bubbles: false,
                detail: {
                    time_now: newAriaValuenow
                }
            })
        );
    }
    setTimeout(() => {
        watchForUserScrubbing(newAriaValuenow);
    },100);
}

function listenForFullscreenChanges(){
    document.onwebkitfullscreenchange = (evt) => {
        /**
         * Send a message to background js telling about the state of the fullscreen
         */
        // console.log(document.webkitIsFullScreen);
        console.log({
            event: 'WINDOW_FULL_SCREEN_CHANGE',
            fullscreen: document.webkitIsFullScreen
        });
        chrome.runtime.sendMessage({
            event: 'WINDOW_FULL_SCREEN_CHANGE',
            fullscreen: document.webkitIsFullScreen
        }, (response) => {
            /**
             * Do something with the response given by the background js
             */
        });
    }
}


function attachToYoutube(){
    if(document.getElementById('trenity-youtube-view') !== null){
        return;
    }
    let relatedDiv = document.getElementById('related');
    let helloDiv = document.createElement('div');
    helloDiv.style.overflow = 'auto';
    // helloDiv.innerHTML = `<h1 style="height: 50vh;color:#fff;">Hello</h1>`;
    helloDiv.innerHTML = `<iframe src="https://trenity.me" id="trenity-youtube-view" style="height: 50vh;"/>`;
    relatedDiv.insertBefore(helloDiv, relatedDiv.firstChild);
    setTimeout(() => {
        /**
         * Attaching the event which can tell us about play/pause events based on the aria-label value of the
         * youtube play button
         */
        document.querySelector(youtubePlayButtonSelector).addEventListener('playPauseCheck', (e) => {
            /**
             * Define any message passing that needs to be done to the background.js when this even occurs.
             */
            console.log({
                event: 'PLAY_PAUSE_CHANGE',
                playing: e.detail.aria_label !== 'Play'
            });
            chrome.runtime.sendMessage({
                event: 'PLAY_PAUSE_CHANGE',
                playing: e.detail.aria_label !== 'Play'
            });
        });
        document.querySelector(youtubeSeekSelector).addEventListener('seek', (e) => {
            console.log(e.detail);
        });
        const aria_label = document.querySelector(youtubePlayButtonSelector).getAttribute('aria-label');
        const aria_valuenow = Number(document.querySelector(youtubeSeekSelector).getAttribute('aria-valuenow'));
        watchYoutubePlayButton(aria_label);
        watchForUserScrubbing(aria_valuenow);
    },1500);//giving this timeout, so that youtube player is ready, hacky for now, needs a proper check until div is present using a watcher.
}

function attachToHotstar(){
    if(document.getElementById('trenity-hotstar-view') !== null){
        return;
    }
    let app = document.getElementsByClassName('master-container')[0];
    let iframeElement = document.createElement('iframe');
    iframeElement.src = `https://trenity.me`;
    iframeElement.style.height = '50vh';
    iframeElement.style.position = `sticky`;
    iframeElement.style.zIndex = `999`;
    iframeElement.id = 'trenity-hotstar-view';
    setTimeout(() => {
        if(document.getElementById('trenity-hotstar-view') !== null){
            return;
        }
        app.insertBefore(iframeElement,app.firstChild);
        app.style.display = 'flex';
        app.style.justifyContent = 'space-between';
        scroll(0,0);
    },1000);
}

/**
 * Only run ContentScript when background js sends appropriate message
 */
chrome.runtime.onMessage.addListener((req,sender,res) => {
    if(req.action && req.action === 'attach_to_youtube_player' && !runOnce){
        runOnce = true;
        console.log('Attaching overlay on the youtube player');
        attachToYoutube();
        listenForFullscreenChanges();
    }
    else if(req.action && req.action === 'attach_to_hotstar_player'){
        console.log('In contentscript');
        console.log('Attaching iframe on hotstar player');
        attachToHotstar();
    }
});