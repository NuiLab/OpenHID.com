import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017/openhid';

const database: Promise<Db> = MongoClient.connect(url)
  .catch(err => console.error(err));

process.on('exit', code => {
  database.then(db => {
    console.log('📡 Closing Database Connection.');
    db.close();
  });
});

export { database };