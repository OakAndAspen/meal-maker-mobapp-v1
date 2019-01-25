import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {MealDetailsPage} from "../meal-details/meal-details";
import {latLng, Map, MapOptions, Marker, marker, tileLayer} from 'leaflet';
import {config} from "../../app/config";
import {NewMealPage} from "../new-meal/new-meal";
import {Meal} from "../../models/meal";

@Component({
    selector: 'page-my-meals',
    templateUrl: 'my-meals.html',
})

export class MyMealsPage {

    mapOptions: MapOptions;
    mapMarkers: Marker[];
    map: Map;
    meals: Meal[];

    constructor(
        public http: HttpClient,
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
        let defaultLoc = latLng(46.778186, 6.641524);
        this.mapOptions = {
            layers: [
                tileLayer(config.osmTileUrl, {maxZoom: 18})
            ],
            zoom: 13,
            center: defaultLoc
        };
        this.mapMarkers = [];
    }

    onMapReady(map: Map) {
        this.map = map;
        this.getMeals();
    }

    ionViewDidEnter() {
        this.getMeals();
    }

    getMeals() {
        this.http.get(config.apiUrl + '/meals').subscribe(data => {
            // @ts-ignore
            this.meals = data.meals;
            this.mapMarkers = this.meals.map(m => {
                // @ts-ignore
                return marker([m.location.x, m.location.y]).bindTooltip(m.date.slice(0,10));
            });
            if(this.mapMarkers.length) this.map.panTo(this.mapMarkers[0].getLatLng());
        });
    }

    goToNewMeal() {
        this.navCtrl.push(NewMealPage);
    }

    goToDetails(meal) {
        this.navCtrl.push(MealDetailsPage, {meal: meal});
    }
}
