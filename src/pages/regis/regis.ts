import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
/**
 * Generated class for the RegisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regis',
  templateUrl: 'regis.html',
})
export class RegisPage {
  userdata:any = {
    user: "",    
    email : "",    
    password : "",
    repassword: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisPage');
  }
  regis(){
    this.database.CreateUser(this.userdata).then((data) => {
      console.log(data);      
    }, (error) => {
      console.log(error);
    })
  }
  gosignup(){
    this.navCtrl.pop();
  }
}
