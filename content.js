
var j = document.createElement('script');
j.src = chrome.extension.getURL('jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head || document.documentElement).appendChild(s);


var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    chrome.runtime.sendMessage({Message: "sendEmail", text:event.data.text, email_id:event.data.email_id}, function (response) {
    });
  }

  if (event.data.type && (event.data.type == "FROM_PAGE_2")) {
    chrome.runtime.sendMessage({Message: "sendUserInput", text:event.data.text, email_id:event.data.email_id}, function (response) {
    });
  }
}, false);

chrome.runtime.onMessage.addListener (function (request, sender, sendResponse) {
    if(request.message && (request.message == "Result")){
      console.log(request.answer);
      window.postMessage({ type: "TO_PAGE", text: request.answer}, "*");
    }
});
