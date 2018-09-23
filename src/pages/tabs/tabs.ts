import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { MusicianPage } from '../musician/musician';
import { TeacherPage } from '../teacher/teacher';
import { StudentPage } from '../student/student';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MusicianPage;
  tab3Root = TeacherPage;
  tab4Root = StudentPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
