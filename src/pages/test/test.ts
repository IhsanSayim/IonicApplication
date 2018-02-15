import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {DataService} from "../../providers/data/data.service";
import {BehaviorSubject} from 'rxjs/Rx';
import firebase from 'firebase';
import {TutorialsPagePage} from "../tutorials/tutorials";


/*
 Generated class for the TestPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPagePage {

  id: any;
  index: any;
  userId: any;
  switch:boolean=false;

  public item$: FirebaseListObservable<any[]>;
  @ViewChild('slides') slides: any;

  answeredFinally: boolean = false;

  // Our total score counter
  score: number = 0;

  questions: any;

  loggedIn: boolean;

  public authStatus: boolean;

  private isAuth: BehaviorSubject<boolean>;

  public items = [];

  public questionArray = [];
  size:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public ds: DataService, public db: AngularFireDatabase) {
    this.userId = firebase.auth().currentUser.uid;
    console.log("User Id" + this.userId);
    this.id = this.navParams.get("id");
    this.index = this.navParams.get("index");
    //console.log("testpage" + this.id);
    console.log("Tutoial Index " + this.index);
    //this.showData();
    this.questionArray=this.navParams.get("questionArray");
    this.size=this.questionArray.length;
    console.log("size"+this.size);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPagePage');
  }

  showData() {

    this.item$ = this.db.list('/quiz/');
    this.item$.subscribe(items => {
      items.forEach(item => {
        if (item.tutorialId == this.id) {
          console.log("ahahaha" + this.id);
          this.questionArray = item.questions;
          this.size=item.questions.length;
          console.log(this.size);
        }
      });
    });

    /* this.item$ = this.db.list('quiz');
     console.log(this.item$);
     this.item$.subscribe(item => {
     console.log(item);
     //this.programHeader = item.programHeader;
     //this.programContent = item.programContent;
     });*/

  }

  /* showData2() {
   var self = this;

   var ref = firebase.database().ref('/questions/');
   ref.once('value').then(function(snapshot) {
   // We need to create this array first to store our local data
   let rawList = [];
   snapshot.forEach( snap => {
   //if (snap.val().email == self.userEmail) {
   rawList.push({
   id: snap.key,
   questionText: snap.val().questionText,
   firstChoice: snap.val().firstChoice,
   secondChoice: snap.val().secondChoice,
   thirdChoice: snap.val().thirdChoice,
   fourthChoice: snap.val().fourthChoice,
   correct: snap.val().correct
   });
   //}

   // This is for debugging
   console.log("Rawlist questionText: " + snap.val().questionText);
   console.log("Rawlist firstChoice: " + snap.val().firstChoice);
   console.log("Rawlist secondChoice: " + snap.val().secondChoice);
   console.log("Rawlist thirdChoice: " + snap.val().thirdChoice);
   console.log("Rawlist fourthChoice: " + snap.val().fourthChoice);
   console.log("Rawlist correct: " + snap.val().correct);
   });

   self.questionArray = rawList;

   let order = self.questionArray;
   rawList = self.getRandomQuestions(order);
   self.questionArray = rawList;
   });
   }*/

  changeSlide() {
    this.slides.slideNext();
  }

  selectFirst: boolean;
  selectSecond: boolean;
  selectThird: boolean;
  selectFourth: boolean;

  checkAllFalse() {
    this.selectFirst = false;
    this.selectSecond = false;
    this.selectThird = false;
    this.selectFourth = false;
  }

  selectAnswer(question, selection, choice, index) {
    console.log("wadkmodwamojnwdamojkwdakmo" + index);

    if (selection == "first") {
      this.checkAllFalse();
      this.selectFirst = true;
    }

    else if (selection == "second") {
      this.checkAllFalse();
      this.selectSecond = true;
    }

    else if (selection == "third") {
      this.checkAllFalse();
      this.selectThird = true;
    }

    else if (selection == "fourth") {
      this.checkAllFalse();
      this.selectFourth = true;
    }

    this.answeredFinally = true;
    if (question.correct == choice) {
      this.score++;
    }

    if (index == this.questionArray.length - 1) {
      if (this.score == this.questionArray.length) {
        this.switch=true;
        console.log("geçtiniz");
        this.addResult();

      }
    }

    setTimeout(() => {
      this.answeredFinally = false;
      this.changeSlide();
      this.checkAllFalse();
    }, 1000);
  }


  userResultItem$: FirebaseObjectObservable<any>;

  addResult() {
    let idd;
    this.index++;
    this.item$ = this.db.list('/userresult/');
    this.item$.subscribe(items => {
      items.forEach(item => {
        if ((item.userId == this.userId) && (item.tutorialIndex < this.index)) {
          console.log("test " + this.userId);
          idd = item.$key;
          console.log(idd);
          var reff = firebase.database().ref('userresult/' + idd);
          reff.set({
            tutorialIndex: this.index,
            userId: this.userId,
          });
          /*firebase.database().ref('userresult/' + idd).set({
           userId: this.userId,
           tutorialIndex: this.index,
           });*/
        }
      });
    });



    /*
     var newPostKey = firebase.database().ref().child('userresult').push().key;

     var postData = {
     userId: this.userId,
     tutorialIndex: index
     };

     // Write the new post's data simultaneously in the posts list and the user's post list.
     var updates = {};
     updates['/userresult/' + newPostKey] = postData;

     firebase.database().ref().update(updates);*/
  }

  /*getRandomQuestions(answers: any[]): any[] {

   for (let i = answers.length - 1; i > 0; i--) {
   let j = Math.floor(Math.random() * (i + 1));
   let temp = answers[i];
   answers[i] = answers[j];
   answers[j] = temp;
   }

   return answers;
   }*/
  goTutorial(){
    this.navCtrl.setRoot(TutorialsPagePage);
  }

  restartQuiz() {
    this.score = 0;
    this.slides.slideTo(0, 1000);

    // In order to randomize our questions
    this.showData();
  }


}
