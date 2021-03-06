// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $ionicNavBarDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
     if(window.StatusBar) {
        // StatusBar.overlaysWebView(false);
        StatusBar.style(1)
        // StatusBar.backgroundColorByHexString('#000000') 

      } 

      ionic.Platform.fullScreen(true, true);
      
      $rootScope.$on('$stateChangeSuccess', function() {

          // if(toState.name.indexOf('main') !== -1) {
              $ionicNavBarDelegate.showBackButton(true);
          // }

      });
      
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Each tab has its own nav history stack:
  .state('main', {
    url: '/main',
    views: {
      'main': {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      }
    }
  })

  .state('teachers', {
      url: '/teachers',
      views: {
        'main': {
          templateUrl: 'templates/teachers.html',
          controller: 'TeacherCtrl'
        }
      }
    })
    .state('teacher-detail', {
      url: '/teacher/:slug',
      views: {
        'main': {
          templateUrl: 'templates/teacher-detail.html',
          controller: 'TeacherDetailCtrl'
        }
      }
    })

  .state('class', {
    url: '/class',
    views: {
      'main': {
        templateUrl: 'templates/class.html',
        controller: 'ClassCtrl'
      }
    }
  })

  .state('videos', {
    url: '/videos',
    views: {
      'main': {
        templateUrl: 'templates/videos.html',
        controller: 'VideosCtrl'
      }
    }
  })

  .state('events', {
    url: '/events',
    views: {
      'main': {
        templateUrl: 'templates/events.html',
        controller: 'EventsCtrl'
      }
    }
  })
  .state('contact', {
    url: '/contact',
    views: {
      'main': {
        templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');

}).config(function($httpProvider) { 

  $httpProvider.interceptors.push(function($rootScope) {
      
      return {
        
        request: function(config) {
          
          $rootScope.$broadcast('loading:show')
          
          return config
          
        },
        
        response: function(response) {
          
          $rootScope.$broadcast('loading:hide')
          
          return response
          
        }
        
      }
      
  })

}).run(function($ionicPlatform, $rootScope, $ionicLoading) {
    
    $rootScope
    
    $rootScope.$on('loading:show', function() {
      
      $ionicLoading.show({template: 'Please Wait!'})
      
    })
  
    $rootScope.$on('loading:hide', function() {
      
      $ionicLoading.hide()
      
    })
  
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        
      }
      
      if(window.StatusBar) {
        
        StatusBar.styleDefault();
        
      }
      
    });
    
  });
