import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {config} from "../../app/config";
import {Group} from "../../models/group";

@Component({
    selector: 'page-group-details',
    templateUrl: 'group-details.html',
})
export class GroupDetailsPage {

    group: Group;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: HttpClient
    ) {
        this.group = this.navParams.data.group;
    }

    ionViewDidLoad() {
        let members = this.group.members;
        let recipes = this.group.recipes;
        this.group.members = [];
        this.group.recipes = [];

        for (let m of members) {
            this.http.get(config.apiUrl + '/users/' + m).subscribe(data => {
                // @ts-ignore
                this.group.members.push(data);
            });
        }

        for (let r of recipes) {
            this.http.get(config.apiUrl + '/recipes/' + r).subscribe(data => {
                // @ts-ignore
                this.group.recipes.push(data);
            });
        }
    }
}
