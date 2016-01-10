angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})

.controller('TeacherCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('TeacherDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})




.controller('ClassCtrl', function($scope, $http) {
  $scope.classes = []

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var daysEnglishDance = []
  
  for(i=0; i < 7 ; i++ )
  {
    var today = new Date();

    if (i === 1) 

      daysEnglishDance.push(days[ today.getDay() ]);
    
    else if(i>1)
      if (days[ today.getDay() ] !== "Sunday") {

          var tomorrow = new Date();
          tomorrow.setDate(today.getDate()+i);
          daysEnglishDance.push(days[ tomorrow.getDay() ]);

      };
  }

      console.log(daysEnglishDance);


  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);

  $scope.getClass = function(){
    $http.get("http://www.realempirestudio.com/api/clases/",
    {day:"Monday"})
    .success(function(data){
      $scope.classes = data;
    })


  }

  $scope.getClass();
});
