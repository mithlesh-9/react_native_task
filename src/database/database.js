import SQLite from 'react-native-sqlite-storage';
// import config from '../config/config';
// import { onError } from '../services/ErrorService';

SQLite.enablePromise(true);

const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 10000000;

export class UserAuth {
  initDB() {
    let db;
    return new Promise((resolve, reject) => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then((DB) => {
              db = DB;
              db.executeSql('CREATE TABLE IF NOT EXISTS User (isAuthenticated,currentUser);').then(() => {
                resolve(db);
              }).catch((error) => {
                reject(error);
              });
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        })
        .catch((error) => {
          console.log('echoTest failed - plugin not functional');
          reject(error);
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      db.close()
        .catch((error) => {
          // this.errorCB(error);
          // TODO makes unhandled promise reject in addSample function - need to check why
        });
    }
  }

  addAuth(username) {
    return new Promise((resolve) => {
        this.initDB().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT INTO User VALUES (?,?)',[true,username] ).then(([tx, results]) => {
              resolve(results);
            });
          }).then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      });
  }

  getAuth() {
    return new Promise((resolve) => {
        this.initDB().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM User',[]).then(([tx, results]) => {
              let auth;
              const len = results.rows.length
                if(len > 0) {
                    auth = results.rows.item(0)
                }
              resolve(auth);
            });
          }).then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      });
  }

  clearAuth() {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('drop table User', []).then(([tx, results]) => {
            resolve();
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}