(function() {

  App.service('Helper', [
    'CONSTANTS',
    function Helper(CONSTANTS) {

      var self = this;

      self.getResult = function(baseline, excitation) {
        return (excitation >= CONSTANTS.MIN_EXCITATION_FLUORESCENCE) && (excitation / baseline >= CONSTANTS.MIN_EXCITATION_FLUORESCENCE_MULTIPLE) && (excitation <= CONSTANTS.MAX_EXCITATION)
      };

      self.getBaselineAndExcitation = function(data) {
        var baseline = _.find(data, {
          step_id: 12
        });
        var excitation = _.find(data, {
          step_id: 13
        });
        var new_data = [];

        for (var i = 0; i < 16; i++) {
          new_data.push({
            baseline: baseline ? baseline.data[i] : {},
            excitation: excitation ? excitation.data[i] : {}
          });
        }
        return new_data;
      };

    }
  ]);

}).call(window);
