chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            // get url of the current url
            var page_location = window.location.href;
            // get selection
            var selection = window.getSelection();
            // start out with the whole page
            var body = document.getElementsByTagName("body");
            // place to stash the html source
            var html = document.createElement('html');
            // check if user has highlighted any content
            if (selection.type === "Range") {
                // get the highlighted content's source
                var range = selection.getRangeAt(0);
                // stash it
                html.appendChild(range.cloneContents());
            } else {
              // stash the entire <body>
              html.appendChild(body[0]);
            }

            if (html) {
              console.log(html);
              // send a message to background.js
              chrome.runtime.sendMessage({
                  "message": "selection_exists",
                  "url": page_location,
                  "content": html
              });
            } else {
              console.log("Oops - something ain't right....");
            };
        }
    }
);
