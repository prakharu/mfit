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
});