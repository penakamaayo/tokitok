var scheme  = 'wss://';
var uri     = scheme + 'penyakatokitok.herokuapp.com/';
var ws      = new WebSocket(uri);

ws.onopen = function(event){
  console.log(event);
};

ws.onmessage = function(message){
  var data = JSON.parse(message.data);

  alert(data.text);
};

ws.send(JSON.stringify({ handle: 'koko', text: 'james' }));
