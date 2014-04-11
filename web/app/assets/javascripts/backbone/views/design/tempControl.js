ChaiBioTech.Views.Design = ChaiBioTech.Views.Design || {} ;

ChaiBioTech.Views.Design.tempControl = Backbone.View.extend({
	
	template: JST["backbone/templates/design/step"],
	className: 'tempBar',

	initialize: function() {
		
		$(this.el).draggable({
			containment: "parent",
			axis: "y",

			start: function() {
				
			},
			drag: function() {
				currentPosition = parseInt($(this).css("top").replace("px", ""), 10);
				//1.57 could be changed as we change interface , whatever the number is (tempControl container width)/100;
				number = (157 - currentPosition) / 1.57; 
				$(this).find(".label").html(number.toFixed(2));
			}
		});
	},

	render:function() {
		temperature = this.options["stepData"]["step"]["temperature"];
		console.log(temperature * 1.57)
		//$(this.el).find(".ui-draggable").css("top", (157 - temperature) +"px");
		
		$(this.el).html(this.template(this.options["stepData"]["step"]));
		return this;
	}
});