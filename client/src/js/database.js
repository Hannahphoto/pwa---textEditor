import { openDB } from 'idb';

const initdb = async () =>
//creating new database named 'jate' which will be using version 1 fo the database.
  openDB('jate', 1, {
    //if not been initialized, add our dabatabase schema
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('edit database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{


  //Create a connection to the database
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  //Open up the desired object store
  const store = tx.objectStore('jate');

  //Use the .add() method on the stoer and pass in the content
  const request = store.put({id: 1, value: content});

  //Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
}; 


//Add logic for a method that gets all the content from the database
export const getDb = async () => {


  //Create a connection to the database
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //open up the desired object store.
  const store = tx.objectStore('jate');

  //use the .getAll() method to get all the data in the database
  const request = store.get(1);

  //get confirmation of the request
  const result = await request;
  console.log('result.value', result?.value);  //might need if statement//? if there is no .value, dont crash
  return result?.value;
};

initdb();
