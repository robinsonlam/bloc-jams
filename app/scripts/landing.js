$(document).ready(function() { 

	$('.hero-content h3').click(function() {
		subText = $(this).text();
      	$(this).text(subText + "!");
	});

	var onHoverAction = function(event) {
		console.log("Hover action TRIGGERED!!");
		$(this).animate({'margin-top': '10px'});
	};

	var offHoverAction = function(event) {
		console.log("Off-Hover action TRIGGERED!!");
		$(this).animate({'margin-top': '0px'});
	};

	var onHoverColourChange = function(event) {
		console.log("Let's colour this text!");
		$(this).css({'color': 'red'});
	};

	var offHoverColourChange = function(event) {
		console.log("Let's un-colour this text!");
		$(this).css({'color': 'white'});
	};

	$('.selling-points .point').hover(onHoverAction, offHoverAction);
	$('.logo').click(function() {
		console.log("GOODBYE SUCKERS! Hehehehe")
		$(this).fadeOut()});
	$('.hero-content h3').hover(onHoverColourChange, offHoverColourChange);
});