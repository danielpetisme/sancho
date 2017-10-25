 (function() {
   'use strict';
   angular
     .module('app')
     .factory('Bot', Bot);

   Bot.$inject = ['$log', '$rootScope', 'Hears', 'Brain', 'Mouth'];

   function Bot($log, $rootScope, Hears, Brain, Mouth) {
     var service = {
       startListening: startListening,
       isListening: isListening,
       stopListening: stopListening,
       dialog: dialog,
       speak: speak,
       name: name,
       useName: useName
     };

     var $name;

     function name() {
       return $name;
     }

     function useName(name) {
       $name = name;
     }

     function startListening() {
       Hears.startListening();
     }

     function isListening() {
       return Hears.isListening();
     }

     function stopListening() {
       return Hears.stopListening().then(function(utterance) {
         $rootScope.$emit('bot:listened', utterance);
         return utterance;
       });
     }

     function dialog(expression) {
       return Brain.dialog(expression);
     }

     function speak(text) {
       return Mouth.synthesize(text);
     }

     return service;
   }
 })();
