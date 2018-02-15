import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";

import {AuthService} from "../../app/auth.service";
import {HomePage} from "../home/home";
import {SigninPage} from "../signin/signin";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2";
import firebase from 'firebase';

export interface User {
  email: string;
  password: string;
  confirmPassword?: string;
}

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
  public item$: FirebaseListObservable<any[]>;
  userId: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private authService: AuthService,
              public db: AngularFireDatabase,
              public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  myForm: FormGroup;
  error = false;
  errorMessage = '';

  showToast(){
    this.toastCtrl.create({
      message: 'Kullanıcı Zaten Var',
      duration: 3000,
      cssClass: "mini-toast"
    }).present();
  }

  onSignup() {

    //this.authService.signupUser(this.myForm.value);
    //this.navCtrl.setRoot(HomePage);

      firebase.auth().createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
        .then(data => {
          this.navCtrl.setRoot(HomePage);
          console.log("User " + data.email)},)
        .catch(error=> {
          this.showToast();
          console.log(error);
        });

  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])],
    });
  }

  isEmail(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  isEqualPassword(control: FormControl): { [s: string]: boolean } {
    if (!this.myForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.myForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

  login() {
    this.navCtrl.push(SigninPage);
  }

}
