//This is a class that will roll an amount of dice with inputted amount of sides and return the result
module.exports = function (dice, sides){
	this.dice = dice; //Amount of dice
	this.sides = sides; //Number of sides on dice
	this.sum = 0; //Numerical value of all dice results
	this.equation = ""; //String of equation of roll

	this.roll = function(){
		for(var i = 0; i < (this.dice - 1); i++){
			var die = Math.ceil(Math.random() * this.sides);
			sum += die;
			equation += (die.toString() + " + ");
		}
		die = Math.ceil(Math.random() * this.sides);
		sum += die;
		equation += (die.toString() + " = " + sum.toString());
	}
}
