

chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {
      if (request.Message == "getTextFile") {
          // to send back your response  to the current tab
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://54.241.134.52:5000/meeting/", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send('content=test');
            chrome.tabs.sendMessage(tabs[0].id, {fileData: "You GOT IT!"}, function(response) {
                  ;
              });
          });
      }
    }
);
