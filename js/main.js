$(document).ready(function(){

	/* Form submit action */
	$('#calcBMI').on('click', function(){
		var genderValue = $('.sex-container input:radio:checked').val();
		var age = $('#age').val();
		var weight = $('#weight').val() * 2.20462;
		var height = parseInt($('#heightFeet').val())*12 + parseInt($('#heightInches').val());
		var activityLevel = $('#activity').val();
		userProfile.initializeUserProfile(genderValue, age, height, weight, activityLevel);
		var userMessage = 'Your calorie requirement to sustain your current weight is ' + userProfile.userCalorieRequirement + ' and your BMI is ' + userProfile.userBMI + '. According to your BMI you are ' + userProfile.userWeightCategory + ' and your revised calorie target for ' + userProfile.userWeightLossGain +' should be ' + userProfile.userRevisedCalorieRequirement;
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

	var foodJson = new Array();
	foodJson.push({'label':'Chapati','value':'Chapati','calorie':'50'});
	foodJson.push({'label':'Dal','value':'Dal','calorie':'100'});
	foodJson.push({'label':'Rice','value':'Rice','calorie':'100'});
	foodJson.push({'label':'Parantha','value':'Parantha','calorie':'100'});

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