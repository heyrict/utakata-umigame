var app = angular.module('App', ['ngRoute']);
app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled:true,
    requireBase: false    
  });
  $routeProvider
    .when('/',{
        templateUrl:'top_page.html',
        controller:''
    })
    .when('/mondai',{
        templateUrl : 'mondai.html',
        controller : 'ChatController'
    })
  }]).controller('ChatController', function($scope){
  var socket = io.connect();
  $scope.messages = [];
  $scope.privateMessages = [];
  $scope.roster = [];
  $scope.name = '';
  $scope.text = '';
  $scope.answer = '';
  $scope.sender = '';
  $scope.mondai ={
      sender:'',
      content:''
  }
  $scope.trueAns='';
  $scope.privateText='';
  $scope.toId=-1;
  socket.on('connect', function () {
    $scope.setName();
  });
  socket.on('mondai', function(msg){
    $scope.mondai = msg;
    $scope.$apply();
  });
  socket.on('trueAns', function(msg){
     $scope.trueAns=msg;
     $scope.$apply();     
  });
  socket.on('message', function (msg) {
    $scope.messages=msg;
    $scope.$apply();
    var elem = document.getElementById('question-area');
    elem.scrollTop = elem.scrollHeight;
  });

  socket.on('roster', function (names) {
    $scope.roster = names;
    $scope.$apply();
  });

  socket.on('privateMessage', function(msg){
    $scope.privateMessages.push(msg);
    $scope.$apply();
    var elem = document.getElementById('private-chat-area');
    elem.scrollTop = elem.scrollHeight;
  });
  $scope.sendMondai = function sendMondai(){
    if(window.confirm('問題文が変更されます。続行しますか？')){
      var data = {
      type:"mondai",
      content:$scope.content
      }
    socket.emit("message",data);
    }
    else{
      window.alert('キャンセルしました。')
    }

    
  };
  
  $scope.sendTrueAns = function sendTrueAns(){
    if(window.confirm('正解が公開されます。続行しますか？')){
      var data = {
      type:"trueAns",
      content:$scope.ans_content
      }
      socket.emit("message",data);
    }
    else{
      window.alert('キャンセルしました。')
    }

  };
  
  $scope.send = function send() {
    var data = {
      type:"question",
      question:$scope.text,
      answer: "waiting an answer"
    }
    console.log('Sending message:',data);
    socket.emit('message', data);
    $scope.text = '';
  };
  
  $scope.sendAnswer = function sendAnswer() {
    var id = document.getElementById("id_input").value || 0;
    var data = {
      type:"answer",
      answerer: String($scope.name||"Anonymous"),
      id:id,
      answer: $scope.answer
    }
    console.log('Sending message:',data);
    socket.emit('message', data);
    $scope.answer = '';
  };
  
  $scope.sendPrivateMessage = function sendPrivateMessage(){
    var data = {
        type:"privateMessage",
        to:document.getElementById("toIdLabel").value,
        content:$scope.privateText
    }
    console.log('Sending message:',data);
    socket.emit('message', data);
  };
  $scope.setName = function setName() {
    socket.emit('identify', $scope.name);
  };
  
  $scope.clearAll = function clearAll(){
    if(window.confirm('問題、質問、回答がすべて消えます。続行しますか？')){
      socket.emit('clear');
    }
    else{
      window.alert('キャンセルしました。')
    }
  }
});