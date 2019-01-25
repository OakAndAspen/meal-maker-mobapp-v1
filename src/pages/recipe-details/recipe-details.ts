import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {config} from "../../app/config";

@Component({
    selector: 'page-recipe-details',
    templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {

    recipe: Object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: HttpClient
    ) {
        this.recipe = this.navParams.data.recipe;
    }

    ionViewDidLoad() {
        // @ts-ignore
        this.http.get(config.apiUrl + '/recipes/' + this.recipe._id).subscribe(data => {
            this.recipe = data;
        });
    }

}
