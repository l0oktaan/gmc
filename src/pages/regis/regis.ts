import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    phone: "",    
    email : "",    
    password : "",
    repassword: ""
  };
  userIsBlur:boolean = false;
  tosubmit:boolean;
  signupForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: DatabaseProvider,
    public formBuilder: FormBuilder) {

      this.signupForm = formBuilder.group({
        phone: ['', Validators.compose([         
          Validators.minLength(10),
          Validators.pattern('^[0-9]{10}$'),
          Validators.required
        ])],
        email: ['', Validators.compose([          
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          Validators.required
        ])],
        password: ['', Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$'),
          Validators.required
        ])],
        repassword: ['', Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$'),
          Validators.required
        ])]
      });
      this.tosubmit = false;
  }
  get phone() {
    return this.signupForm.get('phone');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get repassword() {
    return this.signupForm.get('repassword');
  }
  get email() {
    return this.signupForm.get('email');
  }
  userBlur(){
    this.userIsBlur = true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisPage');
  }
  regis(){
    console.log(this.userdata);
    this.tosubmit = true;
    this.database.CreateUser(this.userdata);
    
  }
  gosignup(){
    this.navCtrl.pop();
  }
}
