$(document).ready(function(){
	var revisedCalorieRequirement = 0;
	var calorieRemaining = 0;
	var calorieConsumed = 0;
	$('#calcBMI').on('click', function(){
		
		/* Calorie requirement calcluation based on activity level */
		var genderValue = $('#gender').val();
		var age = $('#age').val();
		var weight = $('#weight').val();
		var height = $('#height').val();
		var activityLevel = $('#activity').val();
		var calorieRequirement = 0;
		if(genderValue === 'm'){
			calorieRequirement = 66 + (6.3*weight) + (12.9*height) - (6.8*age);
			calorieRequirement = calorieRequirement*activityLevel;
		}
		else{
			calorieRequirement = 655 + (4.3*weight) + (4.7*height) - (4.7*age);
			calorieRequirement = calorieRequirement*activityLevel;
		}
		calorieRequirement = parseInt(calorieRequirement);

		/* BMI calcluation */
		var calculatedBMI = 0;
		calculatedBMI = (weight * 703)/(height*height);
		calculatedBMI = Math.round(calculatedBMI*10)/10;

		/* Weight loss/gain calorie requirement based on BMI */
		var weightLossIndex = 1;
		var weightCategory = '';
		var weightLossGain = '';
		if(calculatedBMI < 18.5){
			weightCategory = 'Underweight';
			weightLossIndex = 1.1;
			weightLossGain = 'weight gain';
		}
		else if(calculatedBMI >= 18.5 && calculatedBMI<25){
			weightCategory = 'Normal weight';
			weightLossIndex = 1;
			weightLossGain = 'sustaining weight';
		}
		else if(calculatedBMI >= 25 && calculatedBMI<30){
			weightCategory = 'Overweight';
			weightLossIndex = 0.85;
			weightLossGain = 'weight loss';
		}
		else if(calculatedBMI >= 30){
			weightCategory = 'Obese';
			weightLossIndex = 0.7;
			weightLossGain = 'weight loss';
		}
		revisedCalorieRequirement = parseInt(calorieRequirement*weightLossIndex);

		$('#msg').html('Your calorie requirement to sustain weight is ' + calorieRequirement + ' and BMI is ' + calculatedBMI + '. According to your BMI you are ' + weightCategory + ' and your revised calorie target for ' + weightLossGain +' should be ' + revisedCalorieRequirement);
		$('#dailyPage #calorieNeeds span').html(revisedCalorieRequirement);
		$('#dailyPage #calorieConsumed span').html(calorieConsumed);
		calorieRemaining = revisedCalorieRequirement;
	});

	/* Daily Page Component */	
	$('#dailyPage #calorieNeeds span').html(calorieRemaining);

	var foodJson = new Array();
	foodJson.push({'label':'Chapati','value':'Chapati','calorie':'50'});
	foodJson.push({'label':'Dal','value':'Dal','calorie':'100'});
	foodJson.push({'label':'Rice','value':'Rice','calorie':'100'});
	foodJson.push({'label':'Parantha','value':'Parantha','calorie':'100'});
	foodJson.push({'label':'Stuffed Parantha','value':'Stuffed Parantha','calorie':'120'});
	foodJson.push({'label':'Chapati1','value':'Chapati1','calorie':'50'});
	foodJson.push({'label':'Dal1','value':'Dal1','calorie':'100'});
	foodJson.push({'label':'Rice1','value':'Rice1','calorie':'100'});
	foodJson.push({'label':'Parantha1','value':'Parantha1','calorie':'100'});
	foodJson.push({'label':'Stuffed Parantha1','value':'Stuffed Parantha1','calorie':'120'});

	var $selectedFoodList = $('#dailyPage #itemList');

	$("#meal").autocomplete({
        source: foodJson,
        minLength: 1,
        select: function(event, ui) {
            console.log(event);
            console.log(ui);
            var $item = $('<li>');
            $item.text(ui.item.label);
            calorieRemaining = calorieRemaining - parseInt(ui.item.calorie);
            calorieConsumed = calorieConsumed + parseInt(ui.item.calorie);
            $selectedFoodList.append($item);
            $('#dailyPage #calorieNeeds span').html(calorieRemaining);
            $('#dailyPage #calorieConsumed span').html(calorieConsumed);
        },
        open: function(event, ui) {
            
        },
        close: function(event, ui) {
            
        },
        // mustMatch implementation so that nothing except json can be added
        change: function (event, ui) {
            if (ui.item === null) {
                $(this).val('');
            }
        }
    });

});