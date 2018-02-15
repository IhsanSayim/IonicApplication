import {Injectable} from '@angular/core';

import firebase from 'firebase';

import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2";

@Injectable()
export class DataService {
    public db: any;

	data: any;

    constructor(public storage: Storage, public http: Http, public fb:AngularFireDatabase) {}

    init() {
		// You need to change the config settings for your project



		this.db = firebase.database().ref('/');
    }

	getQuestionData() {
		return this.storage.get('questions');
    }
    getTutorials(){
      return this.fb.list('/tutorials/');
    }
}
