(function () {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'ui.bootstrap',
      'ngStorage',
      'ngCookies',
      'uuid4',
      'angularMoment',
      'luegg.directives',
      'ngCookies',
      'tmh.dynamicLocale',
      'pascalprecht.translate',
      'cfp.hotkeys'
    ]).run(run);

  run.$inject = ['settingssHandler'];

  function run(settingssHandler) {
    settingssHandler.initialize();
  }
})();
