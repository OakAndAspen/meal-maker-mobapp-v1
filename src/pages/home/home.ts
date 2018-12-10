import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MyGroupsPage} from '../my-groups/my-groups';
import {MyRecipesPage} from '../my-recipes/my-recipes';
import {MyMealsPage} from '../my-meals/my-meals';

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

    constructor(public navCtrl: NavController) {
        this.tabs = [
            {title: 'MY MEALS', icon: 'list', component: MyMealsPage},
            {title: 'MY GROUPS', icon: 'add', component: MyGroupsPage},
            {title: 'MY RECIPES', icon: 'map', component: MyRecipesPage}
        ];
    }

}
