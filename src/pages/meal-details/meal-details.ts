import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the MealDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-meal-details',
    templateUrl: 'meal-details.html',
})
export class MealDetailsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log(this.navParams.data);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MealDetailsPage');
    }

}
