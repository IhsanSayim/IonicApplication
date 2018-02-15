import {Component} from '@angular/core';

import {ActionSheetController, NavController, ViewController} from 'ionic-angular';
import {TutorialsPagePage} from "../tutorials/tutorials";
import {QuestionsPage} from "../questions/questions";
import {ProgramsPagePage} from "../programs/programs";
import {AboutPagePage} from "../about/about";
import {ProfilePagePage} from "../profile/profile";
import {InterviewPagePage} from "../interview/interview";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId: any;
  public item$: FirebaseListObservable<any[]>;


  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public db: AngularFireDatabase,public actionSheetCtrl: ActionSheetController,) {
  }
  ionViewDidLoad(){}

  tutorials() {
    this.navCtrl.setRoot(TutorialsPagePage);
  }

  programs() {
    this.navCtrl.setRoot(ProgramsPagePage);
  }

  questions() {
    this.navCtrl.setRoot(InterviewPagePage);
  }

  about() {
    this.navCtrl.setRoot(AboutPagePage);
  }

  profile() {
    this.navCtrl.setRoot(ProfilePagePage);
  }

  share() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      cssClass: "action-sheets-basic-page",
      buttons: [
        {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          cssClass: 'EditionIcon',
          handler: () => {
           // this.takeImage(this.camera.PictureSourceType.CAMERA)
          }
        }, {
          text: 'Facebook',
          icon: 'logo-facebook',
          cssClass: 'EditionIcon',
          handler: () => {
           // this.takeImage(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        },{
          text: 'Twitter',
          icon: 'logo-twitter',
          cssClass: 'EditionIcon',
          handler: () => {
            // this.takeImage(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        }, {
          text: 'Back',
          role: 'cancel',
          icon: 'backspace',
          cssClass: 'EditionIcon',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
