api_url = 'http://www.realempirestudio.com/'

angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})

.controller('TeacherCtrl', function($scope, $http) {

  $scope.teachers = [];

  $scope.getTeacher = function(){
    var url = api_url + "api/maestros/";
    var opt = {limit:6000};
      $http({url:url,params:opt})
      .success(function(data){
        $scope.teachers = data;
      })
  }

  $scope.getTeacher();

})

.controller('TeacherDetailCtrl', function($scope, $http, $stateParams) {
  $scope.teacher = {}

  $scope.getTeacherDetail = function(){
    var url = api_url + "api/maestros/"+$stateParams.slug+"/";
    $http.get(url)
      .success(function(data){
        $scope.teacher = data;
    })
  }

  $scope.getTeacherDetail();
})




.controller('ClassCtrl', function($scope, $http, $q, $ionicLoading) {
  $scope.Monday = []
  $scope.Saturday = []
  $scope.Tuesday = []
  $scope.Wednesday = []
  $scope.Thursday = []
  $scope.Friday = []

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var daysEnglishDance = []
  var daysSpanishDance = []
  var promises = [];

  // for(i=0; i < 7 ; i++ )
  // {
  //   var today = new Date();

  //   if (i === 1) {
  //     daysEnglishDance.push(days[ today.getDay() ]);
  //   }
    
  //   else if(i>1)
  //     if (days[ today.getDay() ] !== "Sunday") {
  //         var tomorrow = new Date();
  //         tomorrow.setDate(today.getDate()+i);
  //         daysEnglishDance.push(days[ tomorrow.getDay() ]);
  //     };
  // }

  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);

  $scope.getClass = function()
  {
    for(i=0;i<days.length;i++)
      {
        $scope.getDay(days[i])
      }
  }

  $scope.getDay = function(day){
    console.log(day);
      var url = api_url + "api/clases/";
      var opt = {day:day, limit:6000};
        $http({url:url,params:opt})
        .success(function(data){
          $scope[day] = data;
          console.log(day)
          console.log($scope[day])
        })
  }

  $scope.getClass();
})
.controller('VideosCtrl', function($scope, $http, $sce,  $cordovaSocialSharing) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $scope.videos = {}

  $scope.getVideos = function(){
    var url = api_url + "api/videos/";
    $http.get(url)
      .success(function(data){
        for(i=0; i < data.results.length; i++){
          data.results[i].youtube = "https://www.youtube.com/embed/"+data.results[i].youtube_id;
        }
        console.log(data)
        $scope.videos = data;    
      })
  }

  $scope.shareAnywhere = function(title, url) {
    $cordovaSocialSharing.share(title+" - " + url, title+" - " + url, "http://realempirestudio.s3.amazonaws.com/img/realempire2.png", "www.realempirestudio.com");
  }

  $scope.getVideos();
})
.filter('youtubeUrl', function() {
  return function(embeded_id) {
    return "https://www.youtube.com/embed/"+embeded_id;
  };
})
.controller('EventsCtrl', function($scope, $http) {
  $scope.events = {}

  $scope.getEvents = function(){
    var url = api_url + "api/eventos/";
    $http.get(url)
      .success(function(data){
        $scope.events = data;
        console.log($scope.events);
    })
  }

  $scope.getEvents();
})
.controller('ContactCtrl', function($scope, $http) {
})

.filter('spanishDay', function() {
  return function(day) {
    console.log(day)
    switch(day){
       case "Monday":
         return "Lunes";
      case "Tuesday":
         return "Martes";
      case "Wednesday":
         return "Miercoles";
      case "Thursday":
         return "Jueves";
      case "Friday":
         return "Viernes";
      case "Saturday":
         return "Sabado";       
     }
  };
})