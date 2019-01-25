import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {HttpClient} from "@angular/common/http";
import {config} from "../../app/config";

@Component({
    templateUrl: 'sign-up.html'
})
export class SignUpPage {

    email: string;
    userName: string;
    password: string;

    constructor(
        private navCtrl: NavController,
        private http: HttpClient
    ) {
        this.email = '';
        this.userName = '';
        this.password = '';
    }

    onSubmit() {
        let data = {
            email: this.email,
            userName: this.userName,
            password: this.password
        };
        this.http.post(config.apiUrl + '/signup', data).subscribe(data => {
            this.navCtrl.pop();
        });
    }

    goToLogin() {
        this.navCtrl.pop();
    }
}
