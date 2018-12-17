import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the MyMealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-my-meals',
    templateUrl: 'my-meals.html',
})
export class MyMealsPage {

    constructor(
        private auth: AuthProvider,
        public http: HttpClient,
        public navCtrl: NavController,
        public navParams: NavParams
    ) {

    }

    ionViewDidLoad() {
        const url = 'https://comem-travel-log-api.herokuapp.com/api/trips';
        this.http.get(url).subscribe(trips => {
            console.log(`Trips loaded`, trips);
        });
    }

    logOut() {
        this.auth.logOut();
    }
}
