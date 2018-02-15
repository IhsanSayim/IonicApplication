import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';

import {QuizPage} from '../pages/quiz/quiz';


import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';

import {AuthService} from "./auth.service";
import {DataService} from '../providers/data/data.service';

import {QuestionsPage} from '../pages/questions/questions';
import {ProfilePagePage} from "../pages/profile/profile";
import {TutorialsPagePage} from "../pages/tutorials/tutorials";
import {ProgramsPagePage} from "../pages/programs/programs";
import {AboutPagePage} from "../pages/about/about";
import {InterviewPagePage} from "../pages/interview/interview";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, private authService: AuthService, data: DataService) {
    this.initializeApp();
    data.init();
    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage,icon:'home'},
      {title: 'Tutorials', component: TutorialsPagePage,icon:'md-book'},
      {title: 'Programs', component: ProgramsPagePage,icon:'md-code-working'},
      {title: 'Questions', component: InterviewPagePage,icon:'help'},
      {title: 'Profile', component: ProfilePagePage,icon:'person'},
      {title: 'About', component: AboutPagePage,icon:'information-circle'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    console.log("Auth"+this.isAuth());
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
