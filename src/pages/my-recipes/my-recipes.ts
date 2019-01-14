import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import Config from "../../config";
import {HttpClient} from "@angular/common/http";
import {NewGroupPage} from "../new-group/new-group";
import {NewRecipePage} from "../new-recipe/new-recipe";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";

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
        this.http.get(Config.apiUrl + '/recipes').subscribe(data => {
            // @ts-ignore
            this.recipes = data.recipes;
        });
    }

    goToNewRecipe() {
        this.navCtrl.push(NewRecipePage);
    }

    goToDetails(recipe) {
        this.navCtrl.push(RecipeDetailsPage, {recipe:recipe});
    }
}
