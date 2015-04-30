/*
var Car = require('./Object_Understand');

var sumo = new Car.Car('Sumo', 1920, 'TATA');

console.log(sumo.name);
*/

Car = function(name, year, model){
	this.name = name;
	this.year = year;
	this.model = model;
	this.display = function(a){ return "A car object created with name as " + this.name + " and manufactured in the year of " + this.year + ". And its model is " + this.model + "Value passed :" + a; }
}


var tat = new Car("CarName",1505,"ModelName")

console.log(tat.display(1));

