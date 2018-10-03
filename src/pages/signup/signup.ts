import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisPage } from '../regis/regis';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gologin(){
    this.navCtrl.push(LoginPage);
  }

  goregister(){
    this.navCtrl.push(RegisPage);
  }
}
