angular.module('starter.services', [])
.directive('socialGroup', [function () {
  return {
    restrict: 'A',
    scope:{},
    link: function (scope, element, attrs) {
      element.on('click',function(){
      window.open(attrs.url, '_system', 'location=yes');      
        if (attrs.url.match("twitter") || attrs.url.match("fb") || attrs.url.match("instagram") || attrs.url.match("pinterest") || attrs.url.match("gplus")) 
          window.open(attrs.alternative, '_system', 'location=yes');
      });
    }
  }
}]);