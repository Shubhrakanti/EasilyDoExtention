var gmail;

var _position = {
      rightPart: "[role='complementary']",
      rightSideContainer: ".Bu.y3 [role='complementary']>.nH",
      curPage: "[role='main']",
  };


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function(){

  gmail = new Gmail();
  gmail.observe.on("load", function(){
    active();
    $(window).on('hashchange', active);
  });

}
function active(){
  if(gmail.check.is_inside_email){
    checkForEmail();
  }
}

function checkForEmail() {
   var $curPage = $(_position.curPage);
   if ($curPage.find(_position.rightSideContainer)) {
      var $rightSideContainer = $curPage.find(_position.rightSideContainer);
      var JSONObject = gmail.get.email_data();
      try {
        var JSONObject = gmail.get.email_data();
        var email_number = JSONObject.first_email;
        var email_content = JSONObject.threads[email_number].content_plain;
        shootInitialData(email_content,email_number);
      } catch (e) {

      }
   } else {
       setTimeout(showContent, 10);
   }
}

function shootInitialData(data, email_num){
   window.postMessage({ type: "FROM_PAGE", text: data, email_id: email_num}, "*");
}

window.addEventListener("message", function(event) {

  if (event.source != window)
    return;
  if (event.data.type && (event.data.type == "TO_PAGE")) {
    showResult(event.data.text);
  }
}, false);

function showResult(data){
  if(data == 0){
    var text = "This email is NOT about a meeting. Is that correct?"
    var correct = 0;
    var incorrect = 1;
  } else if (data == 1){
    var text = "This email is about a meeting. Is that correct?"
    var correct = 1;
    var incorrect = 0;
  } else {
    console.log("we didn't get the right response to main.js");
    return;
  }
  var $curPage = $(_position.curPage);
  if ($curPage.find(_position.rightSideContainer)){
    var JSONObject = gmail.get.email_data();
    var email_number = JSONObject.first_email;
    var $rightSideContainer = $curPage.find(_position.rightSideContainer);
    $rightSideContainer.prepend('<div class="extension">' +
            '<html>'+text+'</html>'+
            '<button type="button" class="yes_button">Yes</button>' +
            '<button type="button" class="no_button">No</button>' +
        '</div>');
    var yButton = $rightSideContainer.find('.yes_button');
    yButton.click(function() {
      shootUserData(correct, email_number);
      yButton.css("background-color","yellow");
      nButton.css("background-color","inherit");
    });
    var nButton = $rightSideContainer.find('.no_button');
    nButton.click(function() {
      shootUserData(incorrect, email_number);
      nButton.css("background-color","yellow");
      yButton.css("background-color","inherit");
    });
  }

}

function shootUserData(data, email_number){
  window.postMessage({ type: "FROM_PAGE_2", text: data, email_id: email_number}, "*");
}

refresh(main);
