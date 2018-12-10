import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {MyGroupsPage} from '../pages/my-groups/my-groups';
import {MyMealsPage} from '../pages/my-meals/my-meals';
import {MyRecipesPage} from '../pages/my-recipes/my-recipes';
import {AuthProvider} from '../providers/auth/auth';
import {LoginPage} from "../pages/login/login";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        MyGroupsPage,
        MyMealsPage,
        MyRecipesPage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        MyGroupsPage,
        MyMealsPage,
        MyRecipesPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider
    ]
})
export class AppModule {
}
