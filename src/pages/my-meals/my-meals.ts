import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {HttpClient} from '@angular/common/http';
import {MealDetailsPage} from "../meal-details/meal-details";
import {Geolocation} from '@ionic-native/geolocation';
import {latLng, MapOptions, tileLayer, marker, Marker, Map} from 'leaflet';

/**
 * Generated class for the MyMealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-my-meals',
    templateUrl: 'my-meals.html',
})

export class MyMealsPage {

    mapOptions: MapOptions;
    mapMarkers: Marker[];
    map: Map;

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
            marker([ 46.778186, 6.641524 ]).bindTooltip('Hello'),
            marker([ 46.780796, 6.647395 ]),
            marker([ 46.784992, 6.652267 ])
        ];
    }

    ionViewDidLoad() {
        const url = 'https://comem-travel-log-api.herokuapp.com/api/trips';
        this.http.get(url).subscribe(trips => {
            console.log(`Trips loaded`, trips);
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

    goToDetails() {
        this.navCtrl.push(MealDetailsPage);
    }

    logOut() {
        this.auth.logOut();
    }
}
