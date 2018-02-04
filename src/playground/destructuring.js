
// Object destructuring
const person = {
	name: 'Qoo',
	age: 26,
	location: {
		city: 'New York',
		temp:92
	}
};

const {name = 'Hello', age} = person;
// const name = person.name;
// const age = person.age;

// const {city, temp: temperature} = person.location;
// if (person.location.city && person.location.temp){
// 	console.log(`It's ${temperature} in ${city}`);
// }

// Array destructuring
const address = ['123 park stree', 'State College', 'Pennsylvania', '30325'];
const [street, city, state, zip] = address
console.log(`You are in ${city} ${state}`);