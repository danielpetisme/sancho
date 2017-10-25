(function() {
  'use strict';
  angular
    .module('app')
    .provider('Recast', RecastProvider);

    RecastProvider.$inject = [];

  function RecastProvider() {
    this.$get = Recast;

    var $recastApiUrl = 'https://api.recast.ai/build/v1';

    this.setRecastApiUrl = function (recastApiUrl) {
      $recastApiUrl = recastApiUrl;
    };

    Recast.$inject = ['$http', '$log', '$rootScope', 'uuid4'];

    function Recast($http, $log, $rootScope, uuid4) {
      var service = {
        useToken: useToken,
        useLanguage: useLanguage,
        dialog: dialog
      };

      var conversationId = uuid4.generate();
      var $token;
      var $language;
      var $application;

      function useToken(token) {
        $token = token;
      }

      function useLanguage(language) {
        $language = language;
      }

      function dialog(utterance) {
        if (!$token) {
          throw new Error('You must set the Token first');
        }
        return $http.post($recastApiUrl + '/dialog', {
          message: {
            type: 'text',
            content: utterance,
          },
          language: $language,
          conversation_id: conversationId
        }, {
          headers: {
            'Authorization': 'Token ' + $token
          }
        }).then(getJsonData);
      }

      function getJsonData(response) {
        if (response && response.status === 200) {
          return response.data;
        }
        throw new Error("Natural Language Understanding failed");
      }

      function descOrder(a, b) {
        return b.score - a.score;
      }

      return service;
    }
  }
})();
