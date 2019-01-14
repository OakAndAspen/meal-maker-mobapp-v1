import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

@Component({
    selector: 'page-new-meal',
    templateUrl: 'new-meal.html',
})
export class NewMealPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

}
