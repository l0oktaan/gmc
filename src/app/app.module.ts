import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { MyApp } from './app.component';
import { Facebook} from '@ionic-native/facebook';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { RegisPage } from '../pages/regis/regis';
import { MusicianPage } from '../pages/musician/musician';
import { TeacherPage } from '../pages/teacher/teacher';
import { StudentPage } from '../pages/student/student';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

IonicModule.forRoot(MyApp, {
  scrollAssist: true,
  autoFocusAssist: true
})

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MusicianPage,
    TeacherPage,
    StudentPage,
    ProfilePage,
    //LoginPage,
    SignupPage,
    RegisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MusicianPage,
    TeacherPage,
    StudentPage,
    ProfilePage,
    //LoginPage,
    SignupPage,
    RegisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})

export class AppModule {}
