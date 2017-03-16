import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017/openhid';

console.log('🍃 Opening MongoDB Connection.')

const database: Promise<Db> = MongoClient.connect(url)
  .catch(reason => console.error(reason));

function closeConnection(code) {
  database.then(db => {
    console.log('🍃 Closing MongoDB Connection.');
    db.close();
  });
}

process
  .on('SIGTERM', closeConnection)
  .on('SIGINT', closeConnection);

export { database };