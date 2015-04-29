var scheme  = 'ws://';
var uri     = scheme + window.document.location.host + '/';
var ws      = new WebSocket(uri);

ws.onopen = function(event){
  console.log(event);
};

ws.onmessage = function(message){
  var data = JSON.parse(message.data);
  var current_time = new Date($.now()).toString();

  $('#js-chat-messages').append("<div style='padding-left: 10px; font-size: 150%; word-wrap: break-word;'>" + "<i><small><small>" + current_time + '</small></small></i> ' + data.handle + ': ' + data.text + "</div>" + "<br/>");
  $('#js-chat-messages').stop().animate({
    scrollTop: $('#js-chat-messages')[0].scrollHeight
  }, 800);
};

ws.onclose = function(){
  alert('bye bye bye bye bye...');
};


$('#input-form').on('submit', function(event){
  event.preventDefault();

  var handle = $('#input-handle')[0].value;
  var text   = $('#input-text')[0].value;
  ws.send(JSON.stringify({ handle: handle, text: text }));
  $('#input-text')[0].value = '';
});


$('#js-disconnect').on('click', function(event){
  ws.close();
});
