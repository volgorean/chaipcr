/*
 * Chai PCR - Software platform for Open qPCR and Chai's Real-Time PCR instruments.
 * For more information visit http://www.chaibio.com
 *
 * Copyright 2016 Chai Biotechnologies Inc. <info@chaibio.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.ChaiBioTech.ngApp.controller('StageStepCtrl', [
  '$scope',
  'ExperimentLoader',
  'canvas',
  '$uibModal',
  'alerts',
  'expName',
  '$rootScope',
  function($scope, ExperimentLoader, canvas, $uibModal, alerts, expName, $rootScope) {

    var that = this;
    $scope.stage = {};
    $scope.step = {};

    $scope.$on("expName:Updated", function() {
      $scope.protocol.name = expName.name;
    });

    $scope.$watch("selected", function() {
      console.log("lets change val");
    });

    $scope.initiate = function() {

      ExperimentLoader.getExperiment()
        .then(function(data) {
          $scope.protocol = data.experiment;
          $scope.stage = ExperimentLoader.loadFirstStages();
          $scope.step = ExperimentLoader.loadFirstStep();

          $scope.summaryMode = false;
          $scope.editStageMode = false;
          $scope.showScrollbar = false;
          $scope.scrollWidth = 0;
          $scope.scrollLeft = 0;
          $scope.$broadcast("dataLoaded");
          //console.log("BINGOOOOO", $rootScope);
          canvas.init($scope);
        });
    };

    $scope.initiate();

    $scope.applyValuesFromOutSide = function(circle) {
      // when the event or function call is initiated from non anular part of the app ... !!
      $scope.$apply(function() {
        $scope.step = circle.parent.model;
        $scope.stage = circle.parent.parentStage.model;
        $scope.fabricStep = circle.parent;
      });

    };

    $scope.applyValues = function(circle) {

      $scope.step = circle.parent.model;
      $scope.stage = circle.parent.parentStage.model;
      $scope.fabricStep = circle.parent;
    };

    $scope.convertToMinute = function(deltaTime) {

      var value = deltaTime.indexOf(":");
      if(value != -1) {
        var hr = deltaTime.substr(0, value);
        var min = deltaTime.substr(value + 1);

        if(isNaN(hr) || isNaN(min)) {
          deltaTime = null;
          var warningMessage1 = alerts.nonDigit;
          $scope.showMessage(warningMessage1);
          return false;
        } else {
          deltaTime = (hr * 60) + (min * 1);
          return deltaTime;
        }
      }

      if(isNaN(deltaTime) || !deltaTime) {
        var warningMessage2 = alerts.nonDigit;
        $scope.showMessage(warningMessage2);
        return false;
      } else {
        return parseInt(Math.abs(deltaTime));
      }
    };

    $scope.timeFormating = function(reading) {

      var mins = Number(reading);
      var negative = (mins < 0) ? "-" : "";

      reading = Math.abs(reading);

      var hour = Math.floor(reading / 60);
      hour = (hour < 10) ? "0" + hour : hour;

      var min = reading % 60;
      min = (min < 10) ? "0" + min : min;

      return negative + hour + ":" + min;
    };

    $scope.showMessage = function(message) {

      $scope.warningMessage = message;
      $scope.modal = $uibModal.open({
        scope: $scope,
        templateUrl: 'app/views/modal-warning.html',
        windowClass: 'small-modal'
        // This is tricky , we used it here so that,
        //Custom size of this modal doesn't change any other modal in use
      });
    };
    $scope.tryVal = function() {
      console.log("all okay");
    };
  }
]);
