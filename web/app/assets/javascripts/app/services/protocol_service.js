window.ChaiBioTech.ngApp.service('ExperimentLoader', [
  'Experiment',
  '$q',
  '$stateParams',
  '$rootScope',
  '$http',
  function(Experiment, $q, $stateParams, $rootScope, $http) {

    this.protocol = {};
    this.index = 0;

    this.getExperiment = function() {

      var delay, that = this;
      delay = $q.defer();
      Experiment.get({'id': $stateParams.id}, function(data) {
        that.protocol = data.experiment;
        $rootScope.$broadcast("dataLoaded");
        delay.resolve(data);
      }, function() {
        delay.reject('Cant bring the data');
      });

      return delay.promise;
    };

    this.loadFirstStages = function() {
      return this.protocol.protocol.stages[0].stage;
    };

    this.loadFirstStep = function() {
      return this.protocol.protocol.stages[0].stage.steps[0].step;
    };

    this.getNew = function() {

      return this.protocol.protocol.stages[1].stage;
    };

    this.update = function(url, dataToBeSend, delay) {

      $http.put(url, dataToBeSend)
        .success(function(data) {
          delay.resolve(data);
        })
        .error(function(data) {
          delay.reject(data);
        });

      return delay.promise;
    };

    /********************Stage API Methods************************/

    this.addStage = function($scope, type) {

      var id = $scope.stage.id;
      var dataToBeSend = {
        "prev_id": id,
        "stage": {
          'stage_type': type
        }
      };
      $.ajax({
        url: "/protocols/"+protocolId+"/stages",
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(dataToBeSend)
      })
      .done(function(data) {
        fabricStageView.canvas.fire("modelChanged", data);
      })
      .fail(function() {
        console.log("Failed to update");
      });
    };

    this.saveCycle = function($scope) {

      var dataToBeSend = {'stage': {'num_cycles': $scope.stage.num_cycles}},
      url = "/stages/"+ $scope.stage.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };

    this.changeStartOnCycle = function($scope) {

      var dataToBeSend = {'stage': {'auto_delta_start_cycle': $scope.stage.auto_delta_start_cycle}},
      url = "/stages/"+ $scope.stage.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };

    this.updateAutoDelata = function($scope) {

      var dataToBeSend = {'stage': {'auto_delta': $scope.stage.auto_delta}},
      url = "/stages/"+ $scope.stage.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };
    /********************Step API Methods************************/

    this.changeTemperature = function($scope) {

      var dataToBeSend = {'step':{'temperature': $scope.step.temperature}},
      url = "/steps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };

    this.addStep = function($scope) {

      var stageId = $scope.stage.id,
      dataToBeSend = {"prev_id": $scope.step.id},
      delay = $q.defer(),
      url = "/stages/"+ stageId +"/steps";

      $http.post(url, dataToBeSend)
        .success(function(data) {
          delay.resolve(data);
        })
        .error(function(data) {
          delay.reject(data);
        });

      return delay.promise;
    };

    this.deleteStep = function($scope) {

      var that = this,
      url = "/steps/" + $scope.step.id,
      delay = $q.defer();

      $http.delete(url)
        .success(function(data) {
          delay.resolve(data);
        })
        .error(function(data) {
          delay.reject(data);
        }
      );
      return delay.promise;
    };

    this.gatherDuringStep = function($scope) {

      var that = this,
      dataToBeSend = {'step': {'collect_data': $scope.step.collect_data}},
      url = "/steps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };

    this.gatherDataDuringRamp = function($scope) {

      var dataToBeSend = {'ramp': {'collect_data': $scope.step.ramp.collect_data}},
      url = "/ramps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };

    this.changeRampSpeed = function($scope) {

      var dataToBeSend = {'ramp': {'rate': $scope.step.ramp.rate}},
      url = "/ramps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };

    this.changeHoldDuration = function($scope) {

      var dataToBeSend = {'step': {'hold_time': $scope.step.hold_time}},
      url = "/steps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);

    };

    this.saveName = function($scope) {

      var dataToBeSend = {'step': {'name': $scope.step.name}},
      url = "/steps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);
    };

    this.changeDeltaTemperature = function($scope) {

      var dataToBeSend = {'step': {'delta_temperature': $scope.step.delta_temperature}},
      url = "/steps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);
    };

    this.changeDeltaTime = function($scope) {

      var dataToBeSend = {'step': {'delta_duration_s': $scope.step.delta_duration_s}},
      url = "/steps/" + $scope.step.id,
      delay = $q.defer();
      return this.update(url, dataToBeSend, delay);
    };

  }
]);