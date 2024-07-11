import { setupServer } from './server';
import { initMongoDB } from './db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

bootstrap();
