import {Component, ChangeDetectorRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

import {DataService} from '../../providers/data/data.service';
import {UserService} from '../../providers/user/user.service';

import {ShowdataPage} from '../showdata/showdata';

import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {SignupPage} from "../signup/signup";
import firebase from 'firebase';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  public userEmail: string;
  public userPassword: string;

  public authStatus: boolean;
  public message: string;
  public auth: any;

  private isAuth: BehaviorSubject<boolean>;

  constructor(public nav: NavController,
              private data: DataService,
              private user: UserService,
              private cd: ChangeDetectorRef,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
    this.auth = firebase.auth();
    this.nav = nav;
    this.isAuth = new BehaviorSubject(false);
    this.isAuth.subscribe(val => this.authStatus = val);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  ionViewWillEnter() {
    var load = this.loadingCtrl.create();
    this.user.auth.onAuthStateChanged(user => {
      this.isAuth.next(!!user);
      if (user) {
        this.nav.setRoot(HomePage);
      }
      this.cd.detectChanges();
    });
  }

  public logout() {
    this.user.logout()
  }

  alert(message: string) {
    this.alertCtrl.create({
        title: 'Hata',
        subTitle: message,
        buttons: ['OK'],
      }
    ).present();
  }

  showToast() {
    this.toastCtrl.create({
      message: 'Kullanıcı Adı veya Şifre Hatalı',
      duration: 3000,
      cssClass: "mini-toast"
    }).present();
  }

  public login() {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(this.userEmail, this.userPassword)
        .then(userData => {
          resolve(userData),
            err => reject(err),
            this.nav.setRoot(HomePage);
        }).catch(error => {
        this.showToast();
        //this.alert("Kullanıcı adı veya şifre hatalı!");
        console.log("got error" + error);
      });
    });
    //this.user.login(this.userEmail, this.userPassword)
    //this.nav.setRoot(HomePage);
  }

  ngOnInit(): any {

  }

  register() {
    this.nav.push(SignupPage);
  }
}
