(function () {
  'use strict';
  angular
    .module('app')
    .constant('DEFAULTS', {
      general: {
        language: 'fr',
        name: 'Sancho'
      },
      stt: {
        name: 'Microsoft BingSpeech',
        service: 'BingSpeech',
        locale: 'fr-FR'
      },
      tts: {
        name: 'Microsoft BingSpeech',
        service: 'BingSpeech',
        locale: 'fr-FR',
        gender: 'female'
      },
      nlp: {
        name: 'Recast',
        service: 'Recast'
      },
      BingSpeech: {
        subscriptionKey: '0bda007549194452bd2ead37a17de48e'
      },
      Recast: {
        token: "c3555e6e03cbf3af579aa9a1221ac53b",
        language: 'fr'
      }
    });
})();
