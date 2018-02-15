import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import firebase from 'firebase';
/*
 Generated class for the InterviewPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html'
})
export class InterviewPagePage {

  question: any;
  answer: any;
  public questionArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.showData();
    console.log('ionViewDidLoad InterviewPagePage');
  }

  showData() {
    var self = this;
    var ref = firebase.database().ref('/interview/');
    ref.once('value').then(function (snapshot) {
      let rawList = [];
      snapshot.forEach(snap => {
        //console.log(snap.val().questionText);
        //console.log(snap.val().answerText)

        //if (snap.val().email == self.userEmail) {
        rawList.push({
          id: snap.key,
          questionText: snap.val().questionText,
          answerText: snap.val().answerText,
        });
        //}
      });
      //console.log("Id: " + rawList);

      self.questionArray = rawList;
    });
  }

  toggleSection(i) {
    this.questionArray[i].open = !this.questionArray[i].open;
  }


  addQuestion() {
    var newPostKey = firebase.database().ref().child('interview').push().key;

    var postData = {
      questionText: this.question,
      answerText: this.answer
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/interview/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
    this.question="";
    this.answer="";
  }

}
