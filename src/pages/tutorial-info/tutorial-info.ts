import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import * as $ from 'jquery';
import {DomSanitizer} from "@angular/platform-browser";
import {DataService} from "../../providers/data/data.service";
import firebase from 'firebase';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {TestPagePage} from "../test/test";

/*
 Generated class for the TutorialInfoPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-tutorial-info',
  templateUrl: 'tutorial-info.html'
})
export class TutorialInfoPagePage {

  headerText;
  contentText;
  id;
  infoIndex;
  public item$: FirebaseListObservable<any[]>;
  private item: FirebaseObjectObservable<any>;
  public questionArray = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public _sanitizer: DomSanitizer, public ds: DataService, public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsInfo');
    this.headerText = this.navParams.get('item').headerText;
    this.contentText = this.navParams.get('item').contentText;
    this.infoIndex = this.navParams.get('i');
    console.log("Tutorial indexxxxxxx"+this.infoIndex);
    this.id = this.navParams.get('item').id;
   // this.showData(this.id);

  }

  ionViewWillEnter() {
    this.item$ = this.db.list('/quiz/');
    this.item$.subscribe(items => {
      items.forEach(item => {
        if (item.tutorialId == this.id) {
          console.log("ahahaha" + this.id);
          this.questionArray = item.questions;
        }
      });
    });

  }


  goNext() {

  }

  goBack() {

  }

  showData(id) {

    console.log(id);
    this.item = this.db.object('/tutorials/' + id);

    this.item.subscribe(item => {
      //this.headerText = item.headerText;
      this.contentText = item.contentText;
    });

  }


  goTest(){
    console.log("test"+this.id);
    this.navCtrl.push(TestPagePage, {
      index:this.infoIndex,
      id: this.id,
      questionArray:this.questionArray,
    });
  }


}
