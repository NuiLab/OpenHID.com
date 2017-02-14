import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017/db';

const database: Promise<Db> = MongoClient.connect(url)
  .catch(reason => console.error(reason));

process.on('exit', code => {
  database.then(db => {
    console.log('📡 Closing Database Connection.');
    db.close();
  });
});

export { database };