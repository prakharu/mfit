$(document).ready(function(){

	/* Form submit action */
	$('#calcBMI').on('click', function(){
		var genderValue = $('.sex-container input:radio:checked').val();
		var age = $('#age').val();
		var weight = $('#weight').val() * 2.20462;
		var height = parseInt($('#heightFeet').val())*12 + parseInt($('#heightInches').val());
		var activityLevel = $('#activity').val();
		userProfile.initializeUserProfile(genderValue, age, height, weight, activityLevel);
		var userMessage = 'Your calorie requirement to sustain your current weight is <b>' + userProfile.userCalorieRequirement + '</b> and your <b>BMI</b> is ' + userProfile.userBMI + '. According to your BMI you are <b>' + userProfile.userWeightCategory + '</b> and your revised calorie target for <b>' + userProfile.userWeightLossGain +'</b> should be <b>' + userProfile.userRevisedCalorieRequirement+'</b>';
		$('#userResult .modal-body p').html(userMessage);
	});

	/* On click of proceed on popup */
	$('#userResult .modal-footer .btn-warning').on('click', function(){
		$('#userResult').modal('hide');
		$('.page').hide();
		$('#page2').show();
		$("html, body").animate({scrollTop:0}, '500', 'swing', function() {
		});
	});

	/* Adding food item */
	$("#foodItem").autocomplete({
        source: foodJson,
        minLength: 1,
        select: function(event, ui) {
            //var $item = $('<li>');
            //$item.text(ui.item.label);
            //calorieRemaining = calorieRemaining - parseInt(ui.item.calorie);
            //calorieConsumed = calorieConsumed + parseInt(ui.item.calorie);
            //updateCalories();
            userProfile.updateUserDetails(ui.item);
        },
        open: function(event, ui) {
            
        },
        close: function(event, ui) {
            
        },
        change: function (event, ui) {
            if (ui.item === null) {
                $(this).val('');
            }
        }
    });
});