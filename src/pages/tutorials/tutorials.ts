import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import firebase from 'firebase';
import {DataService} from "../../providers/data/data.service";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2";
import {DomSanitizer} from "@angular/platform-browser";
import {AboutPagePage} from "../about/about";
import {TutorialInfoPagePage} from "../tutorial-info/tutorial-info";

/*
 Generated class for the TutorialsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-tutorials',
  templateUrl: 'tutorials.html'
})
export class TutorialsPagePage {


  tutorialIndex: any;
  header: any;
  content: any;
  public tutorialArray: any;
  userId: any;
  public itemm$: FirebaseListObservable<any[]>;
  public deneme$: FirebaseListObservable<any[]>;

  tutorialItems: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ds: DataService,
              public _sanitizer: DomSanitizer,
              public db: AngularFireDatabase,
              public loadingCtrl: LoadingController) {
    //console.log("User wadkopdwodawodwawd"+this.userId);
    //this.showData();
    //this.tutorialItems = this.ds.getTutorials();
    //console.log(this.tutorialItems);
  }

  ionViewDidLoad() {
    this.userId = firebase.auth().currentUser.uid;
    console.log(this.userId);
    this.itemm$ = this.db.list('/userresult/');

    let sayac = 0;
    this.itemm$.subscribe(items => {
      items.forEach(item => {
        if (item.userId == this.userId) {
          sayac++;
        }
      });
      if (sayac == 0) {
        var newPostKey = firebase.database().ref().child('userresult').push().key;
        var postData = {
          userId: this.userId,
          tutorialIndex: 0,
        };
        var updates = {};
        updates['/userresult/' + newPostKey] = postData;
        firebase.database().ref().update(updates);
      }
    });

    this.itemm$.subscribe(items => {
      items.forEach(item => {
        if (item.userId == this.userId) {
          console.log("ahahaha" + this.userId);
          this.tutorialIndex = item.tutorialIndex;
          console.log("INDEX" + this.tutorialIndex);
        }
      });
    });
    //console.log(this.itemm$);
    this.showData();
    console.log('ionViewDidLoad TutorialsPagePage');
   //this.showData();
  }

  addTutorial() {
    var newPostKey = firebase.database().ref().child('tutorials').push().key;

    var postData = {
      headerText: this.header,
      contentText: this.content
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/tutorials/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
  }

  showData() {
    //this.tutorialIndex=5;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var self = this;
    let sani = this._sanitizer;
    var ref = firebase.database().ref('/tutorials/');
    ref.once('value').then(function (snapshot) {
      let rawList = [];
      snapshot.forEach(snap => {
        //console.log(snap.val().headerText)
        //console.log(snap.val().contentText)

        //if (snap.val().email == self.userEmail) {
        rawList.push({
          id: snap.key,
          headerText: sani.bypassSecurityTrustHtml(snap.val().headerText),
          contentText: sani.bypassSecurityTrustHtml(snap.val().contentText),
        });
        //}
      });
      //console.log("Id: " + rawList);

      self.tutorialArray = rawList;
      loading.dismiss();
    });


  }

  showTutorial(item, i) {
    // Let's pass the item param
    this.navCtrl.push(TutorialInfoPagePage, {
      item: item,
      i: i
    });
  }

  checkTutorial() {
    this.itemm$ = this.db.list('/userresult/');
    this.itemm$.subscribe(items => {
      items.forEach(item => {
        if (item.userId == this.userId) {
          console.log("ahahaha" + this.userId);
          this.tutorialIndex = item.tutorialIndex;
          console.log(this.tutorialIndex);
        }
      });
    });
  }

}
