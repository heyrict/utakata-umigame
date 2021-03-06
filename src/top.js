var $ = require('jquery');
window.jQuery = $;
var bootstrap = require('bootstrap');
var angular = require('angular');
var ngRoute = require('angular-route');
var app = angular.module('App', []);
var http = require('http');
function enterController() {
  this.roomName = '';
}
function currentController() {
  http
    .get('/puzzles?room=Public', res => {
      var body = '';
      res.setEncoding('utf8');

      res.on('data', chunk => {
        body += chunk;
      });

      res.on('end', res => {
        res = JSON.parse(body);
        document.getElementById('current-content').textContent =
          res.mondai.content;
      });
    })
    .on('error', e => {
      console.log('error:', e.message); //エラー時
    });
}
app.component('enter', {
  template: [
    '<h3 class="sawarabi" style="color: #FFF; text-align: center;">チャットをはじめる</h3>',
    '<div class="input-append">',
    '<p><font color="red">使えるのはアルファベット(A-Z, a-z)と数字(0-9)のみです。</font></p>',
    '<input ng-model="$ctrl.roomName" class="form-control" style="margin-bottom:10px;" placeholder="Room Name">',
    '<a class="btn btn-white" ng-href="/mondai/{{$ctrl.roomName}}">新規作成/入室</a>',
    '</div>'
  ].join(''),
  controller: enterController
});
app.component('public', {
  template:
    '<a class="btn btn-default" href="/mondai/Public">この問題を解く</a>'
});
app.component('current', {
  template:
    '<h3 class="sawarabi">- Publicで出題中 -</h3><h4 id="current-content" class="sawarabi" style="white-space: pre-wrap; text-align: center;"></h4>',
  controller: currentController
});
