var gmail;


function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function(){

  var _position = {
         rightPart: "[role='complementary']",
         rightSideContainer: ".Bu.y3 [role='complementary']>.nH",
         curPage: "[role='main']",
         attachmentButtonContainer: "[download_url]",
         attachmentName: ".aSH .a12 .aV3.a6U",
         attachmentButton: ".aSH",
         expandButton: "[alt='Expand all']",
         cloudStorageButtonContainer: "#\\:5 .G-atb>.iH>div"
     };


  gmail = new Gmail();

  // when page load, it will step into this callback
  gmail.observe.on("load", function(){
      debugger;

    // it has stepped into this callback, but the view email don't load yet, it just call when get the signal the page will be into view email page.
    gmail.observe.on('view_email', function(obj) {

        function showContent() {
           var $curPage = $(_position.curPage);
           if ($curPage) {
               var $rightSideContainer = $curPage.find(_position.rightSideContainer);
               $rightSideContainer.html('<div>' +
                        '<html>Is this email about a meeting?</html>'+
                        '<button type="button" class="">Yes</button>' +
                        '<button type="button">No</button>' +
                    '</div>');
               console.log('individual email opened', obj);
           } else {
               setTimeout(showContent, 10);
           }
        }
        setTimeout(showContent, 10);
    });

    gmail.observe.on('view_thread', function(obj) {
      console.log('conversation thread opened', obj);
    });

    console.log('Hello man,', gmail.get.user_email());

    gmail.observe.on('load_email_menu', function(match) {
      console.log('Menu loaded',match);
      $('<button />')
          .html('EasilyDo')
          .click(function () {
            console.log('clicked this bitch ');
            var JSONObject = gmail.get.email_data();
            var email_number = JSONObject.first_email;
            var email_content = JSONObject.threads[email_number].content_plain;
            shootMyData(email_content, email_number);
          })
          .appendTo(match);
    });



  });

}

function shootMyData(data, email_num){
   window.postMessage({ type: "FROM_PAGE", text: data, email_id: email_num }, "*");
}


refresh(main);
