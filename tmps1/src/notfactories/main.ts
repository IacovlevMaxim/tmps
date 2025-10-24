import { PersonBuilder } from './Person';
import { PersonObjectPool } from './PersonObjectPool';

export function runNonFactoryDemo(): void {
  console.log('Builder Pattern Demo ');
  
  const person = new PersonBuilder("josh", "doe")
    .address("myHome")
    .build();
    
  const personb = person.copy();
  console.log(person.toString());
  console.log(personb.toString());

  console.log('\nObject Pool Pattern Demo ');
  
  const resourcePool = PersonObjectPool.getInstance(3);

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
}

// Export for use in other modules
export default runNonFactoryDemo;