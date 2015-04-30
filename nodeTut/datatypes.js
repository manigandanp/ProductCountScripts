//Primitive Data types - Variable points the exact value
var a = "Varibale a";
var b = a;
var c;
var d = null;
var e = 1.90;

console.log(typeof d)

//Even though null is in primitive type, but it will return an object.


/*
**	Reference Data Types - Varible contains a pointer(reference) to an object.
**	In object always name of a value ie. key will be "string"
**	Object creation can be done in two ways. 
	i. var object = new Object(); // Constructor method
		object.addProperty1 = "Value of property 1";
		object.addProperty2 = "Value of property 2";
	ii. var object = {
		addProperty1 : "Value of property 1",
		addProperty2 : "Value of property 2"
	}

**	Above 2 methods will give exactly same result
**	Built-In Objects : Function, Date, Math, Object, Array, Error, Regx
	
*/


var obj = {
	"1" : "Manikandan",
	"2" : "Sabari"
}

console.log(obj[2]);

var object1 = new Object();
object1.prop1 = "Value1";
object1.prop2 = "Value2";

console.log("Object1 : ");
console.log(object1);

var object2 = {
	prop1 : "Value1",
	prop2 : "Value2"
}

console.log("Object2 : ");
console.log(object2);

//Literal Forms
//Array  - Two methods to create an array

var arr1 = ["Value1", "Value2", null, undefined, 3];
console.log("Array1 : " + arr1);

var arr2 = new Array("Value1", "Value2", null, undefined, 3);
console.log("Array2 : " + arr2);



