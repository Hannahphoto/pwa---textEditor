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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
