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
  constructor(
    public http: HttpClient,
    public storage: SQLite
  ) {
    if (!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name: "data.db", location: "default"}).then((db:SQLiteObject)=>{
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXITS users (id INIEGER PRIMARY KEY AUTOINCREMENT,username TEXT,email TEXT,password TEXT)",[]);
        this.isOpen = true;
      }).catch((error)=>{
        console.log(error);
      })
    }
  }
  CreateUser(userdata:any){
    return new Promise ((resolve, reject)=>{
      let sql = "INSERT INTO users (username,email,password) VALUES (?, ?, ?)";
      this.db.executeSql(sql,[userdata.user,userdata.email,userdata.password]).then((data)=>{
        resolve(data);
      },(error)=>{
        reject(error);
      });
    });
  }
}
