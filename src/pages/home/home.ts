import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MyGroupsPage} from '../my-groups/my-groups';
import {MyRecipesPage} from '../my-recipes/my-recipes';
import {MyMealsPage} from '../my-meals/my-meals';
import {AuthProvider} from "../../providers/auth/auth";

export interface HomePageTab {
    title: string;
    icon: string;
    component: Function;
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tabs: HomePageTab[];

    constructor(
        public navCtrl: NavController,
        private auth: AuthProvider
    ) {
        this.tabs = [
            {title: 'Meals', icon: 'time', component: MyMealsPage},
            {title: 'Groups', icon: 'people', component: MyGroupsPage},
            {title: 'Recipes', icon: 'pizza', component: MyRecipesPage}
        ];
    }

    logOut() {
        this.auth.logOut();
    }

}
