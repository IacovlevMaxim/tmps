import { BehavioralPatternsClient } from './client/BehavioralPatternsClient';

async function main(): Promise<void> {
  try {
    const client = new BehavioralPatternsClient();
    await client.run();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error("Fatal error:", error);
  process.exit(1);
});

export { BehavioralPatternsClient };
export default main;