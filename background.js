chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {
      if (request.Message == "sendEmail") {
          fetch("http://54.241.134.52:5000/meeting/",{
            method: "post",
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            },
            body:"email_id="+request.email_id+"&content="+request.text
          }).then(function(response) {
            return response.text();
          })
          .then(function(text) {
            console.log('Request successful', text);
            var obj = JSON.parse(text)
            var server_response = obj.is_meeting;
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
              chrome.tabs.sendMessage(tabs[0].id, {message:"Result", answer:server_response}, function(response) {});
            });
          })
          .catch(function(error) {
            console.log('Request failed', error)
          });
      }
      if (request.Message == "sendUserInput"){
        fetch("http://54.241.134.52:5000/feedback/",{
          method: "post",
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          body:"email_id="+request.email_id+"&is_meeting="+request.text
        }).then(function(response) {
          return response.text();
        })
        .then(function(text) {
          console.log('Request successful', text);
        })
        .catch(function(error) {
          console.log('Request failed', error)
        })
      }
    }
);
