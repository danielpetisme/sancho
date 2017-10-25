(function () {
  'use strict';

  angular
    .module('app')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider
      .state('home', {
        parent: 'app',
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('talk');
            $translatePartialLoader.addPart('home');
            $translatePartialLoader.addPart('global');
            $translatePartialLoader.addPart('speech/home');
            $translatePartialLoader.addPart('speech/talk');
            return $translate.refresh();
          }]
        }
      });
  }
})();
