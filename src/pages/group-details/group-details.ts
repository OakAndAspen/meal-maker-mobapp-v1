import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import Config from "../../config";

@Component({
    selector: 'page-group-details',
    templateUrl: 'group-details.html',
})
export class GroupDetailsPage {

    group: Object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: HttpClient
    ) {
        this.group = this.navParams.data.group;
    }

    ionViewDidLoad() {
        // @ts-ignore
        this.http.get(Config.apiUrl + '/groups/' + this.group._id).subscribe(data => {
            this.group = data;
        });
    }

}
