import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicianPage } from './musician';

@NgModule({
  declarations: [
    MusicianPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicianPage),
  ],
})
export class MusicianPageModule {}
