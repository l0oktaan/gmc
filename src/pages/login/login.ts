import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpClient } from '@angular/common/http';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { DatabaseProvider } from '../../providers/database/database'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:any = {};  
  loginname:String="";
  password:String="";
  login:boolean = false;
  userdata:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: Facebook,
    private http: HttpClient,
    private statusBar: StatusBar,
    private database: DatabaseProvider) {
      
  }
  
  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);

    console.log('ionViewDidLoad LoginPage');
    
    
  }
  
  loginFb(){
    this.fb.login(['public_profile','email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile =>{
          this.userdata = { token: res.authResponse.accessToken, email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
          //this.navCtrl.push(SignupPage, {userdata: this.userdata} );
          console.log(this.userdata);

        });
        this.login = true;
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  /* loginFb() {
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status==='connected'){
        this.login = true;
        this.fb.api('/me',{fields: 'last_name'},function(response){
          console.log(response);
        });
        //this.getData(res.authResponse.accessToken);
        //this.user.img = 'https://graph.fb.com/' + res.authResponse.userID + '/picture?type=square';
      }else{
        alert('Login Failed');
      }
      
        console.log('Logged into Facebook!', res)
    })
    .catch(e => console.log('Error logging into Facebook', e));

  } */
  getData(access_token:string){
    let url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=' + access_token;
    this.http.get(url).subscribe(data=>{
      this.userdata = JSON.stringify(data);
      console.log(data);
    })
  }
  logoutFb() {
    this.fb.logout();
    this.login = false;
    this.user.img = "";    
  }
  signup(){
    this.navCtrl.push(SignupPage);
  }
  tologin(){
    console.log(this.loginname + ':' + this.password);
    this.database.login(this.loginname,this.password)
    .then((data)=>{
      if(data){
        this.login = true;
        this.loginname = "";
        this.password = "";
        this.navCtrl.push(HomePage);
      }
    })
      
  }
  checklogin(){
    this.database.CheckUser();
  }
  tologout(){
    this.database.logout()
    .then((data)=>{
      if(data){
        this.login=false;
      }
    })
  }
}
