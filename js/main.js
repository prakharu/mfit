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
		if(isNaN(userProfile.userCalorieRequirement) || isNaN(userProfile.userBMI) || isNaN(userProfile.userRevisedCalorieRequirement)){
			alert('Error. Please fill the form correctly!');
		}
		else{
			$('#userResult').modal('show');
		}
	});

	/* On click of proceed on popup */
	$('#userResult .modal-footer .btn-warning').on('click', function(){
		$('#userResult').modal('hide');
		$('.page').hide();
		$('#page2').show();
		$("html, body").animate({scrollTop:0}, '500', 'swing', function() {
		});
		userProfile.updateUI();
	});

	/* Adding food item */
	var $table = $('#foodTable');
	$("#foodItem").autocomplete({
        source: foodJson,
        minLength: 1,
        select: function(event, ui) {
            var $tr = $('<tr>');
            $tr.append($('<td>').html(ui.item.label));
            $tr.append($('<td>').html(ui.item.calorie));
            $tr.append($('<td>').html('1'));
            $table.prepend($tr);
            userProfile.updateUserDetails(ui.item);
            userProfile.updateUI();
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