exports.Car = function(name, year, model){
	this.name = name;
	this.year = year;
	this.model = model;
	this.display = display;
}

function display(){
	return "A car object created with name as " + this.name + " and manufactured in the year of " + this.year + ". And its model is " + this.model;
}

