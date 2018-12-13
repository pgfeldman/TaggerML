
import startServer, { shutdown } from './startServer';

const port = process.env.SERVER_PORT || 4000;

async function main() {
  try {
    const server = await startServer();
    await server.listen({
      port,
    });
    console.info(`Server started on port ${port}`);
  } catch (err) {
    console.error('Error starting server', err);
  }
}

process.on('beforeExit', shutdown);
process.on('uncaughtException', shutdown);

main();


