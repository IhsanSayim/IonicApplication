import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DataService} from "../../providers/data/data.service";
import {UserService} from "../../providers/user/user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {SigninPage} from "../signin/signin";
import firebase from 'firebase';

/*
 Generated class for the ProfilePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePagePage {
  public authStatus: boolean;
  public message: string;

  private isAuth: BehaviorSubject<boolean>;

  userEmail: string;

  constructor(public nav: NavController, private data: DataService, private user: UserService, private cd: ChangeDetectorRef, public navParams: NavParams) {
    this.nav = nav;
    this.isAuth = new BehaviorSubject(false);
    this.showProfile();
    this.isAuth.subscribe(val => this.authStatus = val);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');

    this.user.auth.onAuthStateChanged(user => {
      this.isAuth.next(!!user);
      this.cd.detectChanges();
    });
  }

  public logout() {
    this.user.logout();
    firebase.auth().currentUser == null;
    setTimeout(()=>{
      this.nav.setRoot(SigninPage);
    },400);
  }

  showProfile() {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      this.userEmail = user.email;
    } else {
      // No user is signed in.
    }
  }

}
