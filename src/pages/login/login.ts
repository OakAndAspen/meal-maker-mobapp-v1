import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController} from 'ionic-angular';

import { AuthRequest } from '../../models/auth-request';
import { AuthProvider } from '../../providers/auth/auth';
import {SignUpPage} from "../sign-up/sign-up";

@Component({
    templateUrl: 'login.html'
})
export class LoginPage {
    authRequest: AuthRequest;
    loginError: boolean;

    @ViewChild(NgForm)
    form: NgForm;

    constructor(private auth: AuthProvider, private navCtrl: NavController) {
        this.authRequest = new AuthRequest();
    }

    onSubmit($event) {
        $event.preventDefault();
        if (this.form.invalid) return;
        this.loginError = false;

        this.auth.logIn(this.authRequest).subscribe(undefined, err => {
            this.loginError = true;
            console.warn(`Authentication failed: ${err.message}`);
        });
    }

    goToSignUp() {
        this.navCtrl.push(SignUpPage);
    }
}
