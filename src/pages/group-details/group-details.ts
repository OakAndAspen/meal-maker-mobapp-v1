import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {config} from "../../app/config";
import {Group} from "../../models/group";
import {User} from "../../models/user";
import {Recipe} from "../../models/recipe";

@Component({
    selector: 'page-group-details',
    templateUrl: 'group-details.html',
})
export class GroupDetailsPage {

    group: Group;
    mode: string;
    newMember: User;
    newRecipe: Recipe;
    allUsers: User[];
    allRecipes: Recipe[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: HttpClient
    ) {
        this.group = this.navParams.data.group;
        this.mode = "list";
    }

    ionViewDidLoad() {
        let members = this.group.members;
        let recipes = this.group.recipes;
        this.group.members = [];
        this.group.recipes = [];

        for (let m of members) {
            this.http.get(config.apiUrl + '/users/' + m).subscribe(data => {
                this.group.members.push(<User>data);
            });
        }

        for (let r of recipes) {
            this.http.get(config.apiUrl + '/recipes/' + r).subscribe(data => {
                this.group.recipes.push(<Recipe>data);
            });
        }
    }

    addMember() {
        this.http.get(config.apiUrl + "/users").subscribe(data => {
            // @ts-ignore
            this.allUsers = data.users;
            this.allUsers = this.allUsers.filter(u =>
                !this.group.members.find(m => m._id === u._id));
            this.mode = "addMember";
        });
    }

    addRecipe() {
        this.http.get(config.apiUrl + "/recipes").subscribe(data => {
            // @ts-ignore
            this.allRecipes = data.recipes;
            this.allRecipes = this.allRecipes.filter(u =>
                !this.group.recipes.find(r => r._id === u._id));
            this.mode = "addRecipe";
        });
    }

    addUserToGroup() {
        this.group.members.push(this.newMember);
        let data = {
            members: this.group.members.map(m => m._id)
        };
        this.http.patch(config.apiUrl + "/groups/" + this.group._id, data).subscribe(data => {
            this.mode = 'list';
        });
    }

    addRecipeToGroup() {
        this.group.recipes.push(this.newRecipe);
        let data = {
            recipes: this.group.recipes.map(r => r._id)
        };
        this.http.patch(config.apiUrl + "/groups/" + this.group._id, data).subscribe(data => {
            this.mode = 'list';
        });
    }

    cancel() {
        this.mode = 'list';
    }
}
