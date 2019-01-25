import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {config} from "../../app/config";
import {Meal} from "../../models/meal";
import {Group} from "../../models/group";
import {Recipe} from "../../models/recipe";
import {User} from "../../models/user";

@Component({
    selector: 'page-meal-details',
    templateUrl: 'meal-details.html',
})
export class MealDetailsPage {

    meal: Meal;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: HttpClient
    ) {
        this.meal = this.navParams.data.meal;
    }

    ionViewDidEnter() {
        // @ts-ignore
        this.http.get(config.apiUrl + '/meals/' + this.meal._id).subscribe(meal => {
            this.meal = <Meal>meal;
            // @ts-ignore
            this.http.get(config.apiUrl + '/groups/' + meal.groupId).subscribe(group => {
                this.meal.group = <Group>group;
            });
            // @ts-ignore
            this.http.get(config.apiUrl + '/recipes/' + meal.recipeId).subscribe(recipe => {
                this.meal.recipe = <Recipe>recipe;
            });

            // @ts-ignore
            let partIds = meal.participants;
            this.meal.participants = [];
            // @ts-ignore
            for(let p of partIds) {
                console.log(p);
                this.http.get(config.apiUrl + '/users/' + p).subscribe(user => {
                    this.meal.participants.push(<User>user);
                });
            }
        });
    }

}
