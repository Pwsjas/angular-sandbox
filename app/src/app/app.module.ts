import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule}        from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchTestComponent } from './fetch-test/fetch-test.component';
import { CharacterWidgetComponent } from './character-widget/character-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    FetchTestComponent,
    CharacterWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
