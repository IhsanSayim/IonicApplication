import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {DataService} from "../../providers/data/data.service";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";

/*
 Generated class for the ProgramInfoPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-program-info',
  templateUrl: 'program-info.html'
})
export class ProgramInfoPagePage {

  programHeader;
  programContent;
  id;
  index;

  public item$: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _sanitizer: DomSanitizer, public ds: DataService, public db: AngularFireDatabase) {

    //this.item$ = this.db.list('quiz');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsInfo');
    this.programHeader = this.navParams.get('item').programHeader;
    this.programContent = this.navParams.get('item').programContent;
    this.index = this.navParams.get('i');
    console.log(this.index);
    this.id = this.navParams.get('item').id;
    //this.showData(this.id);
  }

  showData(id) {

    console.log(id);
    this.item$ = this.db.list('quiz');
    console.log(this.item$);
    this.item$.subscribe(item => {
      console.log(item);
      //this.programHeader = item.programHeader;
      //this.programContent = item.programContent;
    });

  }

}
