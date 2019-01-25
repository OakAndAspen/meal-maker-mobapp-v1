import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {config} from "../../app/config";
import {HttpClient} from "@angular/common/http";
import { QimgImage } from '../../models/qimg-image';
import { PictureProvider } from '../../providers/picture/picture';

@Component({
    selector: 'page-new-recipe',
    templateUrl: 'new-recipe.html',
})
export class NewRecipePage {

    name: string;
    description: string;
    servings: Number;
    pictureData: string;
    picture: QimgImage;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private camera: Camera,
        public http: HttpClient,
        private pictureService: PictureProvider
    ) {
        this.name = '';
        this.description = '';
        this.servings = 1;
        this.pictureData = '';
    }

    /*takePicture() {
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
    */

    takePicture() {
        this.pictureService.takeAndUploadPicture().subscribe(picture => {
            this.picture = picture;
        }, err => {
            console.warn('Could not take picture', err);
        });
    }

    save() {
        let data = {
            name: this.name,
            description: this.description,
            servings: this.servings,
            imageUrl: this.picture.url
        };

        this.http.post(config.apiUrl + '/recipes', data).subscribe(data => {
            this.navCtrl.pop();
        });
    }
}
