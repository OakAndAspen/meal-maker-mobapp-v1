import {Component} from '@angular/core';
import {DateTime, NavController, NavParams} from 'ionic-angular';
import {config} from "../../app/config";
import {Group} from "../../models/group";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../../models/recipe";

@Component({
    selector: 'page-new-meal',
    templateUrl: 'new-meal.html',
})
export class NewMealPage {

    groups: Group[];
    group: Group;
    date: DateTime;
    recipes: Recipe[];
    recipe: Recipe;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private http: HttpClient
    ) {

    }

    ionViewDidLoad() {
        this.http.get(config.apiUrl + '/groups').subscribe(data => {
            // @ts-ignore
            this.groups = data.groups;
            // @ts-ignore
            this.group = this.groups[0];
        });
    }

    findRecipe() {
        console.log(this.group);
        let url = config.apiUrl + '/recipes/filtered/match?groupId=' + this.group._id;
        for (let p of this.group.members) {
            url += "&participants=" + p;
        }

        this.http.get(url).subscribe(data => {
            // @ts-ignore
            this.recipes = data.recipes;
        });
    }
}
