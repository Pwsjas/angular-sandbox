import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule}        from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchTestComponent } from './fetch-test/fetch-test.component';
import { CharacterWidgetComponent } from './character-widget/character-widget.component';
import { RaidWidgetComponent } from './raid-widget/raid-widget.component';
import { DungeonWidgetComponent } from './dungeon-widget/dungeon-widget.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './common/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    FetchTestComponent,
    CharacterWidgetComponent,
    RaidWidgetComponent,
    DungeonWidgetComponent,
    WelcomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
