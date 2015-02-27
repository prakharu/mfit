var userProfile = new function(){
  this.userAge = 0;
  this.userHeight = 0;
  this.userWeight = 0;
  this.userGender = 'f';
  this.userActivityLevel = 0;
  this.userCalorieRequirement = 0;
  this.userRevisedCalorieRequirement = 0;
  this.userCalorieRemaining = 0;
  this.userCalorieConsumed = 0;
  this.userBMI = 0;
  this.userWeightLossIndex = 1;
  this.userWeightCategory = '';
  this.userWeightLossGain = '';
  this.initializeUserProfile = function(gender, age, height, weight, activityLevel){
    this.userAge = age;
    this.userHeight = height;
    this.userWeight = weight;
    this.userGender = gender;
    this.userActivityLevel = activityLevel;

    /* Calorie requirement calcluation based on activity level */
    if(this.userGender === 'm'){
      this.userCalorieRequirement = 66 + (6.3*this.userWeight) + (12.9*this.userHeight) - (6.8*this.userAge);
      this.userCalorieRequirement = this.userCalorieRequirement*this.userActivityLevel;
    }
    else{
      this.userCalorieRequirement = 655 + (4.3*this.userWeight) + (4.7*this.userHeight) - (4.7*this.userAge);
      this.userCalorieRequirement = this.userCalorieRequirement*this.userActivityLevel;
    }
    
    this.userCalorieRequirement = parseInt(this.userCalorieRequirement);
    console.log(this.userCalorieRequirement);

    /* BMI calcluation */
    this.userBMI = (this.userWeight * 703)/(this.userHeight*this.userHeight);
    this.userBMI = Math.round(this.userBMI*10)/10;

    /* Weight loss/gain calorie requirement based on BMI */
    if(this.userBMI < 18.5){
      this.userWeightCategory = 'Underweight';
      this.userWeightLossIndex = 1.1;
      this.userWeightLossGain = 'weight gain';
    }
    else if(this.userBMI >= 18.5 && this.userBMI<25){
      this.userWeightCategory = 'Normal weight';
      this.userWeightLossIndex = 1;
      this.userWeightLossGain = 'sustaining weight';
    }
    else if(this.userBMI >= 25 && this.userBMI<30){
      this.userWeightCategory = 'Overweight';
      this.userWeightLossIndex = 0.85;
      this.userWeightLossGain = 'weight loss';
    }
    else if(this.userBMI >= 30){
      this.userWeightCategory = 'Obese';
      this.userWeightLossIndex = 0.7;
      this.userWeightLossGain = 'weight loss';
    }
    this.userRevisedCalorieRequirement = parseInt(this.userCalorieRequirement*this.userWeightLossIndex);
    this.userCalorieRemaining = this.userRevisedCalorieRequirement;
  };
  this.updateUserDetails = function(foodDetails){
    this.userCalorieRemaining = this.userCalorieRemaining - parseInt(foodDetails.calorie);
    this.userCalorieConsumed = this.userCalorieConsumed + parseInt(foodDetails.calorie);
    console.log(this.userCalorieRemaining);
    console.log(this.userCalorieConsumed);
  };
};