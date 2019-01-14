import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {NewGroupPage} from "../new-group/new-group";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import Config from '../../config.js';

@Component({
    selector: 'page-my-groups',
    templateUrl: 'my-groups.html',
})
export class MyGroupsPage {

    pictureData: string;
    groups: Object[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private camera: Camera,
        private http: HttpClient) {
        this.groups = [];
    }

    ionViewDidLoad() {
        console.log("Hello...");
        this.getGroups().then(response => {
            console.log("Response: ", response);
            // @ts-ignore
            this.groups = response.groups;
        });
    }

    getGroups() {
        return new Promise(resolve => {
            this.http.get(Config.apiUrl+'/groups').subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }

    goToNewGroup() {
        this.navCtrl.push(NewGroupPage);
    }
}
