# Topic: *Creational Design Patterns*
## Author: *Iacovlev Maxim*
------
## Objectives:
__1. Study and understand the Creational Design Patterns.__

__2. Choose a domain, define its main classes/models/entities and choose the appropriate instantiation mechanisms.__

__3. Use some creational design patterns for object instantiation in a sample project.__

## Some Theory:
In software engineering, the creational design patterns are the general solutions that deal with object creation, trying to create objects in a manner suitable to the situation. The basic form of object creation could result in design problems or added complexity to the design. Creational design patterns solve this problem by optimizing, hiding or controlling the object creation.

Some examples of this kind of design patterns are:

   * Singleton
   * Builder
   * Prototype
   * Object Pooling
   * Factory Method
   * Abstract Factory
   
## Main tasks:
__1. Choose an OO programming language and a suitable IDE or Editor (No frameworks/libs/engines allowed).__

__2. Select a domain area for the sample project.__

__3. Define the main involved classes and think about what instantiation mechanisms are needed.__

__4. Based on the previous point, implement atleast 3 creational design patterns in your project.__

## Solution:

#### Singleton:
I implemented the singleton pattern for the PesonObjectPool:


```js
static getInstance(maxPoolSize: number): PersonObjectPool {
    if (PersonObjectPool.instance === null) {
        PersonObjectPool.instance = new PersonObjectPool(maxPoolSize, {
            createObject: () => new Person()
        });
    }
    return PersonObjectPool.instance;
}
```

I have a variable for the instance and I check if it's null. If yes, then we have never created a instance of the singleton. 

Then we lock the method for one thread using Reantrant lock for multithreaded access to the method. We then check again after locking, for the case where 2 threads passed the first check. There are 2 checks so that we don't lock the thread everytime we need a new instance of the PersonObjectPool. Then if the instance is null we create a new object and set it to the object instance, if not, return the previous instance.

#### Builder:
I have implemented the builder pattern in the Person class:


First we create a private Person contructor.

```js
// Person
constructor(firstName?: string, lastName?: string, age: number = 0, address?: string, phone?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
    this.phone = phone;
}
```

It is private because we want to instanciate it only if we make it through the Builder class, in the build method:

```ts
build(): Person {
    return new Person(this.firstName, this.lastName, this.personAge, this.personAddress, this.personPhone);
}
```

Then we create the internal Builder class in the Person class, with all of the variables Person has:

```js
export class PersonBuilder {
  private readonly firstName: string;
  private readonly lastName: string;
  private personAge: number = 0;
  private personAddress: string | undefined;
  private personPhone: string | undefined;
  //...
}
```

Then we define the variables a instance should definetely have, by declaring them setable only through the Builder constructor

```js
// PersonBuilder
constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
}
```

Then we set the setable variables, which are not always required:

```java
setAge(age: number): this {
    this.personAge = age;
    return this;
}

age(age: number): this {
    return this.setAge(age);
}

setAddress(address: string): this {
    this.personAddress = address;
    return this;
}

address(address: string): this {
    return this.setAddress(address);
}

setPhone(phone: string): this {
    this.personPhone = phone;
    return this;
}

phone(phone: string): this {
    return this.setPhone(phone);
}
```

Now we can create a Person like this:

```js
Person person = new PersonBuilder("josh", "bou").setAddress("myHome").build();
```

### Prototype:

I implemented the prototype by creating a generic interface for the prototype:

```js
export interface Prototype<T> {
  copy(): T;
}
```

We can create a full instance only through the Builder, so we create a Builder with all of the variables of the Person class, which creates a exact copy of the object. 

### Object Pooling:

I have implemented the ObjectPooling by creating a PersonObjectPool:

```js
// PersonObjectPool
private constructor(maxPoolSize: number, objectFactory: ObjectFactory<Person>) {
    this.maxPoolSize = maxPoolSize;
    this.objectFactory = objectFactory;
}
```

Where maxPoolSize is how many objects max could be in the pool and ObjectFactory is a FunctionalInterface:
```js
export interface ObjectFactory<T> {
  createObject(): T;
}
```

And because ObjectFactory is a functional interface I can create it using the constructor reference for the Person object which implements the FunctionalInterface method.

Then we implement the borrow and return methods:

```js
borrowObject(): Person {
    let person = this.pool.pop();
    if (!person) {
      person = this.objectFactory.createObject();
    }
    return person;
}
```
Here we just take an element from the front of the queue and if it is null, we just make a new Person object
from the factory.

```js
returnObject(obj: Person | null): void {
    if (!obj) {
        return;
    }

    obj.reset();
    if (this.pool.length < this.maxPoolSize) {
        this.pool.push(obj);
    }
}
```

Then I implemented the reset:

```js
reset(): void {
    this.firstName = undefined;
    this.lastName = undefined;
    this.age = 0;
    this.address = undefined;
    this.phone = undefined;
}
```

Now I can borrow and return objects when I need it:

```js
const person1 = resourcePool.borrowObject();
person1.setFirstName("Resource 1");
person1.setLastName("Damn");
console.log("Borrowed: " + person1.toString());

const person2 = resourcePool.borrowObject();
person2.setFirstName("Resource 2");
person2.setLastName("Cool");
console.log("Borrowed: " + person2.toString());

resourcePool.returnObject(person1);
resourcePool.returnObject(person2);

const person3 = resourcePool.borrowObject();
console.log("Reused: " + person3.toString());

resourcePool.returnObject(person3);
```

## Conclusion

In conclusion, I have made a singleton PersonObjectPool which can lend and retrieve Person objects, which can be created using a Builder, and can be dublicated using the Prototype pattern.