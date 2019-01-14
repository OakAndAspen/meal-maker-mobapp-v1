import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the MyGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-my-groups',
    templateUrl: 'my-groups.html',
})
export class MyGroupsPage {

    pictureData: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private camera: Camera) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyGroupsPage');
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(pictureData => {
            this.pictureData = pictureData;
        }).catch(err => {
            console.warn(`Could not take picture because: ${err.message}`);
        });
    }

}
