import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import Config from "../../config";

@Component({
    selector: 'page-meal-details',
    templateUrl: 'meal-details.html',
})
export class MealDetailsPage {

    meal: Object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: HttpClient
    ) {
        this.meal = this.navParams.data.meal;
    }

    ionViewDidLoad() {
        // @ts-ignore
        this.http.get(Config.apiUrl + '/meals/' + this.meal._id).subscribe(data => {
            this.meal = data;
        });
    }

}
