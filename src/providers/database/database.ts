import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  private isOpen : boolean;
  items: Array<Object>;
  constructor(
    public http: HttpClient,
    public storage: SQLite
  ) {
    
    if (!this.isOpen){
      
     //this.storage = new SQLite();     
      this.storage.create({
        name: "data1.db", 
        location: "default"
      }).then((db:SQLiteObject)=>{
        
        db.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT,email TEXT,password TEXT)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        this.db = db;
        this.isOpen = true;
      }).catch((error)=>{
        console.log(error);
      })
    }
  }
  CreateUser(userdata){
    console.log(userdata);
    return new Promise ((resolve, reject)=>{
      let sql = "INSERT INTO users (username,email,password) VALUES (?, ?, ?)";
      this.db.executeSql(sql,[userdata.user,userdata.email,userdata.password]).then((data)=>{
        resolve(data);
      },(error)=>{
        reject(error);
      });
    });
    
  }
  CheckUser(){
    
      let sql = "SELECT * FROM users";
      this.db.executeSql(sql,[])
        .then((data) => {
          this.items = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              this.items.push(data.rows.item(i));
            }
            console.log(this.items);
          }
        })
        .catch((error)=>{          
            console.log(error);          
        })
    

    
  }
}
