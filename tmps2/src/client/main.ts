import { OrganizationClient } from './OrganizationClient';

function main(): void {
  try {
    const client = new OrganizationClient();
    
    client.demonstrateStructuralPatterns();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();