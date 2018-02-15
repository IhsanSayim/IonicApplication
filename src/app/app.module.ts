import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {QuizPage} from '../pages/quiz/quiz';
import {DataService} from '../providers/data/data.service';

import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';

import {AuthService} from "./auth.service";

import {
  ReactiveFormsModule
} from '@angular/forms';

import {AuthGuard} from "./auth.guard";

import {UserService} from '../providers/user/user.service';

import {Storage} from '@ionic/storage';

import {QuestionsAdd} from '../pages/questions-add/questions-add'
import {QuestionsInfo} from '../pages/questions-info/questions-info';
import {QuestionsPage} from '../pages/questions/questions';
import {TutorialsPagePage} from "../pages/tutorials/tutorials";
import {ProgramsPagePage} from "../pages/programs/programs";
import {AngularFireDatabase, AngularFireModule} from "angularfire2";
import {ProfilePagePage} from "../pages/profile/profile";
import {AboutPagePage} from "../pages/about/about";
import {TutorialInfoPagePage} from "../pages/tutorial-info/tutorial-info";
import {InterviewPagePage} from "../pages/interview/interview";
import {ProgramInfoPagePage} from "../pages/program-info/program-info";
import {TestPagePage} from "../pages/test/test";

const config = {
  apiKey: "AIzaSyCQaoPoIzP1S_EE3C7DIDf8wVSYMRXhAiE",
  authDomain: "quiz-app-3ef5d.firebaseapp.com",
  databaseURL: "https://quiz-app-3ef5d.firebaseio.com",
  storageBucket: "quiz-app-3ef5d.appspot.com",
  messagingSenderId: "827592424579"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuizPage,
    SigninPage,
    SignupPage,
    QuestionsAdd,
    QuestionsInfo,
    QuestionsPage,
    TutorialsPagePage,
    ProgramsPagePage,
    ProfilePagePage,
    AboutPagePage,
    TutorialInfoPagePage,
    InterviewPagePage,
    ProgramInfoPagePage,
    TestPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{ scrollAssist: false, autoFocusAssist: false } ),
    AngularFireModule.initializeApp(config),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuizPage,
    SigninPage,
    SignupPage,
    QuestionsAdd,
    QuestionsInfo,
    QuestionsPage,
    TutorialsPagePage,
    ProgramsPagePage,
    ProfilePagePage,
    AboutPagePage,
    TutorialInfoPagePage,
    InterviewPagePage,
    ProgramInfoPagePage,
    TestPagePage
  ],
  providers: [Storage, DataService, UserService, AuthService, AuthGuard, {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }]
})
export class AppModule {
}
