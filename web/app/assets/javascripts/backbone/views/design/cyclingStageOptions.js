ChaiBioTech.Views.Design = ChaiBioTech.Views.Design || {} ;

ChaiBioTech.Views.Design.cyclingStageOptions = Backbone.View.extend({
	numCycles: 0,
	template: JST["backbone/templates/design/cyclingStageOptions"],
	events: {
		"click .save-cycle": "saveCycle",
		"click .form-control": "stopPropagation",
		"keypress .form-control": "checkForEnter"
	},

	saveCycle: function(evt) {
		evt.stopPropagation();
		value = this.numCycles = parseInt($(this.el).find(".form-control").val());
		//true if value is a number and within range
		if(! _.isNaN(value) && (value > 0 && value < 1000 )) {
			$(this.el).find(".noof-cycle-warning").hide();
			$(this.el).find(".noof-cycle-success").show();
			this.options.grandParent.changeStageCycle(value, this.model.id, this.model["stage_type"]); 
		} else {
			$(this.el).find(".noof-cycle-warning").show();
			$(this.el).find(".noof-cycle-success").hide();
		}
	},

	checkForEnter: function(evt) {
		if(evt.keyCode === 13) {
			this.saveCycle(evt);
		}
	},

	stopPropagation: function(evt) {
		evt.stopPropagation();
	},

	initialize: function() {
		this.numCycles = parseInt(this.model["num_cycles"]);
	},

	render: function() {
		cycleConfig = {
			cycleNo: this.numCycles
		}
		$(this.el).html(this.template(cycleConfig));
		return this;
	}
});