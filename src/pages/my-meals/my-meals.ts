import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {HttpClient} from '@angular/common/http';
import {MealDetailsPage} from "../meal-details/meal-details";
import {Geolocation} from '@ionic-native/geolocation';
import {latLng, Map, MapOptions, Marker, marker, tileLayer} from 'leaflet';
import Config from "../../config";
import {NewMealPage} from "../new-meal/new-meal";

@Component({
    selector: 'page-my-meals',
    templateUrl: 'my-meals.html',
})

export class MyMealsPage {

    mapOptions: MapOptions;
    mapMarkers: Marker[];
    map: Map;
    meals: Object[];

    constructor(
        private auth: AuthProvider,
        public http: HttpClient,
        public navCtrl: NavController,
        public navParams: NavParams,
        private geolocation: Geolocation
    ) {
        const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tileLayerOptions = {maxZoom: 18};
        this.mapOptions = {
            layers: [
                tileLayer(tileLayerUrl, tileLayerOptions)
            ],
            zoom: 13,
            center: latLng(46.778186, 6.641524)
        };
        this.mapMarkers = [
            marker([46.778186, 6.641524]).bindTooltip('Hello'),
            marker([46.780796, 6.647395]),
            marker([46.784992, 6.652267])
        ];
    }

    ionViewDidLoad() {
        this.http.get(Config.apiUrl + '/meals').subscribe(data => {
            // @ts-ignore
            this.meals = data.meals;
        });

        const geolocationPromise = this.geolocation.getCurrentPosition();
        geolocationPromise.then(position => {
            const coords = position.coords;
            console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
        }).catch(err => {
            console.warn(`Could not retrieve user position because: ${err.message}`);
        });
    }

    onMapReady(map: Map) {
        this.map = map;
        this.map.on('moveend', () => {
            const center = this.map.getCenter();
            console.log(`Map moved to ${center.lng}, ${center.lat}`);
        });
    }

    goToNewMeal() {
        this.navCtrl.push(NewMealPage);
    }

    goToDetails(meal) {
        this.navCtrl.push(MealDetailsPage, {meal: meal});
    }

    logOut() {
        this.auth.logOut();
    }
}
