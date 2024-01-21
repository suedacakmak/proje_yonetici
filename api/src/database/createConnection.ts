import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = (): Promise<Connection> => {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: Number(5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'database',
    entities: Object.values(entities),
    synchronize: true,
  });
};

export default createDatabaseConnection;
