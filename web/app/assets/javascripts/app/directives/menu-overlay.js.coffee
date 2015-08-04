window.ChaiBioTech.ngApp.directive 'menuOverlay', [
  '$rootScope'
  '$templateCache'
  '$compile'
  ($rootScope, $templateCache, $compile) ->

    restrict: 'EA'
    transclude: true
    scope:
      sidemenuTemplate: '@'
    templateUrl: 'app/views/directives/menu-overlay.html'
    link: ($scope, elem) ->

      $scope.sideMenuOpen = false
      $scope.sideMenuOptionsOpen = false

      sidemenu = $templateCache.get $scope.sidemenuTemplate
      compiled = $compile(sidemenu)($scope.$parent)
      sidemenuContainer = elem.find('#sidemenu')
      sidemenuContainer.html compiled

      $rootScope.$on 'sidemenu:toggle', ->
        sidemenuContainer.css minHeight: sidemenuContainer.parent().height()

        $scope.sideMenuOpen = !$scope.sideMenuOpen

        if !$scope.sideMenuOpen
          $scope.sideMenuOptionsOpen = false
          elem.find('.menu-overlay-menu-item').removeClass 'active'


      $rootScope.$on 'submenu:toggle', (e, html, subOption) ->
        $scope.sideMenuOptionsOpen = !$scope.sideMenuOptionsOpen
        elem.find('#submenu').html html

        if $scope.sideMenuOptionsOpen
          subOption.addClass('active')
        else
          subOption.removeClass('active')



]