/* --- EXTERNAL SOURCES --- */
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from "@ionic/storage";
import {Geolocation} from '@ionic-native/geolocation';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {Camera} from '@ionic-native/camera';

/* --- PROJECT SOURCES --- */
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MyGroupsPage} from '../pages/my-groups/my-groups';
import {MyMealsPage} from '../pages/my-meals/my-meals';
import {MyRecipesPage} from '../pages/my-recipes/my-recipes';
import {NewGroupPage} from '../pages/new-group/new-group';
import {NewRecipePage} from "../pages/new-recipe/new-recipe";
import {MealDetailsPage} from '../pages/meal-details/meal-details';
import {AuthProvider} from '../providers/auth/auth';
import {AuthInterceptorProvider} from '../providers/auth-interceptor/auth-interceptor';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        MyGroupsPage,
        MyMealsPage,
        MyRecipesPage,
        NewGroupPage,
        NewRecipePage,
        LoginPage,
        MealDetailsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        LeafletModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        MyGroupsPage,
        MyMealsPage,
        MyRecipesPage,
        NewGroupPage,
        NewRecipePage,
        LoginPage,
        MealDetailsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        AuthInterceptorProvider,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true},
        Geolocation,
        Camera
    ]
})
export class AppModule {
}
