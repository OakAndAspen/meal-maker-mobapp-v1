import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {NewGroupPage} from "../new-group/new-group";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {config} from "../../app/config";
import {GroupDetailsPage} from "../group-details/group-details";

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
        this.http.get(config.apiUrl+'/groups').subscribe(data => {
            // @ts-ignore
            this.groups = data.groups;
        });
    }

    goToNewGroup() {
        this.navCtrl.push(NewGroupPage);
    }

    goToDetails(group) {
        this.navCtrl.push(GroupDetailsPage, {group:group});
    }
}
