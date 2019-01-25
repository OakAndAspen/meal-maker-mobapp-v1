import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {config} from "../../app/config";
import {Group} from "../../models/group";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../../models/recipe";
import {Geolocation} from '@ionic-native/geolocation';
import {LatLng, latLng, Map, MapOptions, Marker, marker, tileLayer} from 'leaflet';

@Component({
    selector: 'page-new-meal',
    templateUrl: 'new-meal.html',
})
export class NewMealPage {

    groups: Group[];
    group: Group;
    recipes: Recipe[];
    recipe: Recipe;
    date: string;
    time: string;

    mapOptions: MapOptions;
    map: Map;
    mapMarkers: Marker[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private http: HttpClient,
        private geolocation: Geolocation
    ) {
        const url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        let defaultLoc = latLng(46.778186, 6.641524);
        this.mapOptions = {
            layers: [
                tileLayer(url, {maxZoom: 18})
            ],
            zoom: 13,
            center: defaultLoc
        };
        this.mapMarkers = [new Marker(defaultLoc)];

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.date = tomorrow.toISOString().slice(0, 10);
        this.time = "19:00";
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
        let url = config.apiUrl + '/recipes/filtered/match?groupId=' + this.group._id;
        for (let p of this.group.members) {
            url += "&participants=" + p;
        }

        this.http.get(url).subscribe(data => {
            // @ts-ignore
            this.recipes = data.recipes;
            this.recipe = this.recipes[0];
        });
    }

    onMapReady(map: Map) {
        this.map = map;

        // Get the user's location
        this.geolocation.getCurrentPosition().then(pos => {
            let userLoc = latLng(pos.coords.latitude, pos.coords.longitude);
            this.map.panTo(userLoc);
            this.mapMarkers = [new Marker(userLoc)];
        }).catch(err => {
            console.warn(`Could not retrieve user position because: ${err.message}`);
        });
    }

    onClick($event) {
        this.map.panTo($event.latlng);
        this.mapMarkers = [new Marker($event.latlng)];
    }

    saveMeal() {
        let loc = this.mapMarkers[0].getLatLng();
        let data = {
            groupId: this.group._id,
            recipeId: this.recipe._id,
            date: this.date + "T" + this.time + ":00",
            participants: this.group.members,
            location: {
                x: loc.lat,
                y: loc.lng
            }
        };
        console.log(data);
        this.http.post(config.apiUrl + '/meals', data).subscribe(data => {
            this.navCtrl.pop();
        });
    }
}
