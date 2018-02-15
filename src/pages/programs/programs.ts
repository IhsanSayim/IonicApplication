import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {DomSanitizer} from "@angular/platform-browser";
import {ProgramInfoPagePage} from "../program-info/program-info";

/*
  Generated class for the ProgramsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html'
})
export class ProgramsPagePage {

  programHeader:any;
  programContent:any;
  public programArray:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _sanitizer: DomSanitizer) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramsPagePage');
    this.showData();
  }

  addProgram() {
    var newPostKey = firebase.database().ref().child('programs').push().key;

    var postData = {
      programHeader: this.programHeader,
      programContent: this.programContent
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/programs/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
  }
  showData() {
    var self = this;
    let sani=this._sanitizer;
    var ref = firebase.database().ref('/programs/');
    ref.once('value').then(function (snapshot) {
      // We need to create this array first to store our local data
      let rawList = [];
      snapshot.forEach(snap => {
        //console.log(snap.val().headerText)
        //console.log(snap.val().contentText)

        //if (snap.val().email == self.userEmail) {
        rawList.push({
          id: snap.key,
          programHeader: sani.bypassSecurityTrustHtml(snap.val().programHeader),
          programContent: sani.bypassSecurityTrustHtml(snap.val().programContent),
        });
        //}
      });
      //console.log("Id: " + rawList);

      self.programArray = rawList;
    });
  }

  showProgram(item,i){
    // Let's pass the item param
    this.navCtrl.push(ProgramInfoPagePage, {
      item: item,
      i:i,
      "parentPage": this
    });
  }

}
