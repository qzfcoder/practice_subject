function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.eating = function () {
  console.log(this.name, "eating");
};

function Student(name, age, play) {
  this.play = play;
  Person.call(this, name, age);
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.studying = function () {
  console.log(this.name, "studying");
};

const asd = new Student("qqq", 18, "basketball");
console.log(asd);
console.log(asd.eating());
console.log(asd.studying());
console.log("---");
console.log(asd.__proto__);
console.log("---");
console.log(Student.prototype);
