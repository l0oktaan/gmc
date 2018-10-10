import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import jsSHA from 'jssha';
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
        //db.executeSql('DROP TABLE users', []);
        //db.executeSql('DROP TABLE auth_token', []);
        db.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,phone TEXT,email TEXT,password TEXT,token TEXT)', [])
        db.executeSql('CREATE TABLE IF NOT EXISTS auth_token (id INTEGER PRIMARY KEY AUTOINCREMENT,token TEXT, usertype INTEGER, status INTEGER)', [])
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
    
    let shaPass = new jsSHA("SHA-256", "TEXT");
    shaPass.update(userdata.password);
    let password = shaPass.getHash("HEX");

    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(userdata);
    let token = shaObj.getHash("HEX");
    console.log(token);
    console.log(userdata);

    return new Promise ((resolve, reject)=>{
      let sql = "INSERT INTO users (phone,email,password,token) VALUES (?, ?, ?, ?)";
      this.db.executeSql(sql,[userdata.phone,userdata.email,password,token]).then((data)=>{
        shaObj.update(data);        
        sql = "INSERT INTO auth_token (token,usertype,status) VALUES (?,?,?)";
        this.db.executeSql(sql, [token,1,1]);
        resolve(data);
      },(error)=>{
        reject(error);
      });
    });
    
  }
  hashFunction(source){
    let shaPass = new jsSHA("SHA-256", "TEXT");
    shaPass.update(source);
    return shaPass.getHash("HEX");
  }
  


  logout(): Promise<Boolean> {
    let sql = "UPDATE auth_token SET status = 0 WHERE status = 1";
    return new Promise((resolve) => {  
      this.db.executeSql(sql, []).then(()=>{
        console.log('logout');
        this.CheckUser();
        resolve(true);
      });
    });
  } 
  
  public checkLogined(): Promise<Boolean> {    
    return this.db.executeSql("SELECT * FROM auth_token WHERE status = 1", [])
    .then((data) => { 
        console.log('checked') ;
        return (data.rows.length > 0);
    })
    .catch((error)=>{
        console.log(error);
        return false;
    })
      //resolve(true);
    
  } 
  loginwith(user){
    console.log("user :" + user);
    var n = user.search("@");
    if(n>0){
      return "email";
    }else if(Number.isInteger(+user)){
      return "phone";
    }else{
      return "";
    }
    
  }
  login(user, password): Promise<Boolean> {
    let sql="";
    let userType = this.loginwith(user);
    console.log("usertype : " + userType);
    
    
    return new Promise((resolve, reject) => {
      if (userType != "") {
        sql = "SELECT * FROM users WHERE " + userType + " = (?) AND password = (?)";
      } else {
        reject(false);
      }
      this.db.executeSql(sql, [user, this.hashFunction(password)])
        .then((data) => {
          console.log('data :' + data.rows.length);
          if(data.rows.length > 0){
            this.setLogined();
            resolve(true);
          }else{
            resolve(false);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    });
  }
  setLogined(){
    let sql = "UPDATE auth_token SET status = 1 WHERE status = 0";    
      this.db.executeSql(sql, []).then(() => {        
      });    
  }
    
    
   
    
  
  CheckUser(){
      
      //let sql = "SELECT * FROM auth_token";
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
