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
import {LoginPage} from '../pages/login/login';
import {SignUpPage} from "../pages/sign-up/sign-up";
import {MyGroupsPage} from '../pages/my-groups/my-groups';
import {MyRecipesPage} from '../pages/my-recipes/my-recipes';
import {MyMealsPage} from '../pages/my-meals/my-meals';
import {NewGroupPage} from '../pages/new-group/new-group';
import {NewRecipePage} from '../pages/new-recipe/new-recipe';
import {NewMealPage} from '../pages/new-meal/new-meal';
import {GroupDetailsPage} from '../pages/group-details/group-details';
import {RecipeDetailsPage} from '../pages/recipe-details/recipe-details';
import {MealDetailsPage} from '../pages/meal-details/meal-details';
import {AuthProvider} from '../providers/auth/auth';
import {AuthInterceptorProvider} from '../providers/auth-interceptor/auth-interceptor';
import {PictureProvider} from '../providers/picture/picture';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        SignUpPage,
        MyGroupsPage,
        MyMealsPage,
        MyRecipesPage,
        NewGroupPage,
        NewRecipePage,
        NewMealPage,
        GroupDetailsPage,
        RecipeDetailsPage,
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
        LoginPage,
        SignUpPage,
        MyGroupsPage,
        MyMealsPage,
        MyRecipesPage,
        NewGroupPage,
        NewRecipePage,
        NewMealPage,
        GroupDetailsPage,
        RecipeDetailsPage,
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
        Camera,
        PictureProvider
    ]
})
export class AppModule {
}
