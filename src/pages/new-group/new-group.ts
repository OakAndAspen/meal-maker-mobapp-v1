import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {config} from "../../app/config";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";

@Component({
    selector: 'page-new-group',
    templateUrl: 'new-group.html',
})
export class NewGroupPage {

    users: User[];
    selected: string[];
    name: string;
    message: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private http: HttpClient
    ) {
        this.users = [];
        this.selected = [];
        this.name = '';
        this.message = "Save";
    }

    ionViewDidLoad() {
        this.http.get(config.apiUrl + '/users').subscribe(data => {
            // @ts-ignore
            this.users = data.users;
        });
    }

    select(user) {
        if(this.selected.find(u => u === user._id)) {
            this.selected = this.selected.filter(u => u !== user._id);
        } else this.selected.push(user._id);
    }

    send() {
        this.message = "Saving...";
        let data = {
            name: this.name,
            members: this.selected
        };
        this.http.post(config.apiUrl + '/groups', data).subscribe(data => {
            this.navCtrl.pop();
        });
    }
}
