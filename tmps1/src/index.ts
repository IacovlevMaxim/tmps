import { runFactoryDemo } from './factories/main';
import { runNonFactoryDemo } from './notfactories/main';

function main(): void {
  console.log('Creational Patterns');
  console.log('=======================');
  runFactoryDemo();

  console.log('\nStructural & Other Patterns');
  console.log('================================');
  runNonFactoryDemo();
}

main();