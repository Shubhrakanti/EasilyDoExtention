chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {
      if (request.Message == "getTextFile") {
          // to send back your response  to the current tab
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            fetch("http://54.241.134.52:5000/meeting/",{
              method: "post",
              headers: {
                "Content-type": "application/x-www-form-urlencoded"
              },
              body:"content="+request.text+"&email_id="+request.email_id
            }).then(function(response) {
              return response.text();
            })
            .then(function(text) {
              console.log('Request successful', text);
            })
            .catch(function(error) {
              log('Request failed', error)
            });
          });
      }
    }
);
