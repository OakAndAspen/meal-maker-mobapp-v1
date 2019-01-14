import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import Config from "../../config";
import {HttpClient} from "@angular/common/http";
import {NewGroupPage} from "../new-group/new-group";
import {NewRecipePage} from "../new-recipe/new-recipe";

@Component({
    selector: 'page-my-recipes',
    templateUrl: 'my-recipes.html',
})

export class MyRecipesPage {

    recipes: Object[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private http: HttpClient) {

    }

    ionViewDidLoad() {
        this.getRecipes().then(response => {
            // @ts-ignore
            this.recipes = response.recipes;
        });
    }

    getRecipes() {
        return new Promise(resolve => {
            this.http.get(Config.apiUrl + '/recipes').subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }

    goToNewRecipe() {
        this.navCtrl.push(NewRecipePage);
    }
}
