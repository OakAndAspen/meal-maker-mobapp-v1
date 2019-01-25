import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';

import {AuthRequest} from '../../models/auth-request';
import {AuthProvider} from '../../providers/auth/auth';
import {HomePage} from '../home/home';
import {HttpClient} from "@angular/common/http";
import {config} from "../../app/config";
import {LoginPage} from "../login/login";

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
            console.log(data);
        });
    }

    goToLogin() {
        this.navCtrl.pop();
    }
}
