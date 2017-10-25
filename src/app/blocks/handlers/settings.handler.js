(function () {
  'use strict';

  angular
    .module('app')
    .factory('settingssHandler', settingssHandler);

  settingssHandler.$inject = ['$rootScope', 'Settings', 'Bot', 'Hears', 'Mouth', 'LanguageService', 'Brain', 'Recast', 'BingSpeech', 'DEFAULTS'];

  function settingssHandler($rootScope, Settings, Bot, Hears, Mouth, LanguageService, Brain, Recast, BingSpeech, DEFAULTS) {
    return {
      initialize: initialize
    };

    function initialize() {
      update(Settings.load());

      var settingsSavedSuccess = $rootScope.$on('settings:saved', function (event, settings) {
        update(settings);
      });

      $rootScope.$on('$destroy', function () {
        if (angular.isDefined(settingsSavedSuccess) && settingsSavedSuccess !== null) {
          settingsSavedSuccess();
        }
      });
    }

    function update(settings) {
      var config = {
        general: settings.general || DEFAULTS.general,
        stt: settings.stt || DEFAULTS.stt,
        tts: settings.tts || DEFAULTS.tts,
        nlp: settings.nlp || DEFAULTS.nlp,
        Recast: settings.Recast || DEFAULTS.Recast,
        BingSpeech: settings.BingSpeech || DEFAULTS.BingSpeech
      };
      Bot.useName(config.general.name);
      LanguageService.changeLanguage(config.general.language);
      Hears.useLocale(config.stt.locale);
      Hears.useSpeechToText(config.stt.service);
      Mouth.useLocale(config.tts.locale);
      Mouth.useGender(config.tts.gender);
      Mouth.useTextToSpeech(config.tts.service);
      Brain.useNaturalLanguageProcessor(config.nlp.service);
      Recast.useToken(config.Recast.token);
      Recast.useLanguage(config.Recast.language);
      BingSpeech.useSubscriptionKey(config.BingSpeech.subscriptionKey);
    }
  }
})();
