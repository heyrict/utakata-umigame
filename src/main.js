var app = require('./angular-init');
var chatController = require('./chat');
var http = require('http');

app.component('links', {
  template: [
    '<div class="sawarabi">',
    '<div class="sawarabi">',
    '<h3 class="sawarabi">',
    '<a target="_blank" href="https://github.com/pb10001/utakata-umigame/wiki">Wiki</a>',
    '</h3>',
    '<h3 class="sawarabi">',
    '<a target="_blank" href="https://github.com/pb10001/utakata-umigame/wiki/利用規約">利用規約</a>',
    '</h3>',
    '<h3>他サイトへのリンク</h3>',
    '<p>',
    '<a target="_blank" href="http://www.cindythink.com">Cindy</a>',
    '<a target="_blank" href="https://wiki3.jp/cindy-lat">(Wiki)</a>',
    '</p>',
    '<p>',
    '<a target="_blank" href="http://openumigame.sakura.ne.jp/openumi/">Openウミガメ R鯖</a>',
    '</p>',
    '<p>',
    '<a target="_blank" href="http://sui-hei.net">ラテシン</a>',
    '</p>',
    '</div>',
    '</div>'
  ].join(''),
  controller: ''
});
app.controller('ChatController', chatController);
