var gmail;


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

    gmail.observe.on('view_email', function(obj) {
    console.log('individual email opened', obj);
    });

    gmail.observe.on('view_thread', function(obj) {
      console.log('conversation thread opened', obj); // gmail.dom.thread object
    });

    console.log('Hello man,', gmail.get.user_email());

    gmail.observe.on('load_email_menu', function(match) {
      console.log('Menu loaded',match);
      $('<button />').addClass('J-N-Jz')
          .html('EasilyDo')
          .click(function () {
            console.log('clicked this bitch');
          })
          .appendTo(match);
    });



  });

}


refresh(main);
