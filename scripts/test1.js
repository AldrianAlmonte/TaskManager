//obj constructor
function Dog(name, age) {
  this.name = name;
  this.age = age;
}

class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

function runTest() {
  console.log("test");

  //creating objects

  //object literal
  let dog = { name: "Alex", age: 3 };
  console.log(dog);

  let dog2 = { name: "Bella", age: 3, color: "pink" };
  console.log(dog2);

  //object constructor
  let dog3 = new Dog("Max", 9);
  console.log(dog3);

  let dog4 = new Dog("some", 4);
  console.log(dog4);

  // class
  let cat1 = new Cat("Snowflakes", 2);
  console.log(cat1);
}

//only 1 window.onload because it will override others
runTest();
