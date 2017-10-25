(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$rootScope', '$scope', '$log', '$translate', '$q', 'hotkeys', 'Bot'];

  function HomeController($rootScope, $scope, $log, $translate, $q, hotkeys, Bot) {
    var vm = this;

    vm.toggleRecording = toggleRecording;
    vm.isRecording = Bot.isListening;
    vm.submit = submit;
    vm.messages = [];

    hotkeys.add({
      combo: 'ctrl+space',
      description: $translate.instant('home.hotkey'),
      callback: vm.toggleRecording
    });

    welcomeMessage();

    function welcomeMessage() {
      Bot.dialog('Bonjour')
      .then(handleBotResponse)
      .catch(handleConversationError);
    }

    function addBotMessage(message, values) {
      if(message.type === 'text') {
        getBotAudioUrl(message.content).then(function (audioUrl) {
        vm.messages.push({
          user: Bot.name(),
          type: message.type,
          timestamp: new Date().getTime(),
          content: message.content,
          values: values,
          audio: audioUrl,
          image: 'bot'
        });
      });
      }
      if(message.type === 'list') {
        message.list = message.content;
        message.content = 'Voici les ' + message.list.elements.length + ' propositions:';
        getBotAudioUrl(message.content).then(function (audioUrl) {
        vm.messages.push({
          user: Bot.name(),
          type: message.type,
          timestamp: new Date().getTime(),
          content: message.content,
          list: message.list,
          values: values,
          audio: audioUrl,
          image: 'bot'
        });
      });
      }
    }

    function addUserMessage(message) {
      vm.messages.push({
        user: "me",
        type: 'text',
        timestamp: new Date().getTime(),
        content: message,
        image: 'me'
      });
    }

    function toggleRecording() {
      if (Bot.isListening()) {
        Bot.stopListening().then(process).catch(handleRecordingError);
      } else {
        Bot.startListening();
      }
    }

    function process(request) {
      addUserMessage(request);

      Bot.dialog(request)
        .then(handleBotResponse)
        .catch(handleConversationError);
    }

    function getBotTranslated(message, values) {
      return $translate("speech." + message, values);
    }

    function getBotAudioUrl(text) {
      var deferred = $q.defer();
      Bot.speak(text).then(function(audio) {
        var blob = new Blob([audio.data], {
          type: "audio/basic"
        });
        deferred.resolve(URL.createObjectURL(blob));
      });
      return deferred.promise;
    }

    function handleBotResponse(response) {
      response.results.messages.forEach(function(message) {
        addBotMessage(message, response.results.conversation.memory);
      });
    }

    function handleRecordingError(error) {
      addBotMessage({
        type: 'text',
        content: 'Pardon, je ne suis pas sur de comprendre.'
      }, {});
    }

    function handleConversationError(error) {
      console.log('Home::handleConversationError %o', error);
      addBotMessage(error.reply, error.data);
    }

    function submit() {
      if (vm.text) {
        process(vm.text);
      }
      vm.text = "";
    }
  }
})();
