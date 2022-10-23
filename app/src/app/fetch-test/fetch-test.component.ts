import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-fetch-test',
  templateUrl: './fetch-test.component.html',
  styleUrls: ['./fetch-test.component.scss']
})
export class FetchTestComponent implements OnInit {
  
  constructor(private cookie: CookieService) { }
  
  profileIcon: String = '';
  characterNameInput: String = this.cookie.get('character-name');
  serverNameInput: String = this.cookie.get('server-name');

  characterName: String = '';
  characterSpec: String = '';
  characterRating: String = '';

  acquired: String = 'white';
  difference: number = 0;
  differenceMessage: String = '';
  keyLevelMessage = `This is approximately: `;
  majorKeyLevelMessage: String = '';
  minorKeyLevelMessage: String = '';

  cutoff: String = '';


  ngOnInit(): void {
    this.getSeasonCutoff();
    this.getRaiderIO()
    .then(() => {
      this.difference = Math.round((Number(this.characterRating) - Number(this.cutoff)) * 100) / 100;
      if(this.difference >= 10) {
        this.acquired = 'green';
      } else if (this.difference >= 0) {
        this.acquired = 'yellow';
      } else {
        this.acquired = 'red';
      }
  
      if (this.difference > 10) {
        this.differenceMessage = `is ${Math.abs(this.difference)} ahead of the cutoff!`
        this.majorKeyLevelMessage = `- ${this.getMajorKeyLevel()} major keystones ahead`;
        this.minorKeyLevelMessage = `- ${this.getMinorKeyLevel()} minor keystones ahead`;
      } else if (this.difference >= 0) {
        this.differenceMessage = `is ${Math.abs(this.difference)} ahead of the cutoff!`
        this.majorKeyLevelMessage = `- ${this.getMajorKeyLevel()} major keystones ahead`;
        this.minorKeyLevelMessage = `- ${this.getMinorKeyLevel()} minor keystones ahead`;
      } else {
        this.differenceMessage = `is ${Math.abs(this.difference)} behind the cutoff :(`
        this.majorKeyLevelMessage = `- ${this.getMajorKeyLevel()} major keystones behind`;
        this.minorKeyLevelMessage = `- ${this.getMinorKeyLevel()} minor keystones behind`;
      }
    });

  }

  getMajorKeyLevel() {
    return Math.abs(Math.round(this.difference / 7.5));
  }

  getMinorKeyLevel() {
    return Math.abs(Math.round(this.difference / 2.5));
  }

  async getRaiderIO() {
    await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${this.serverNameInput}&name=${this.characterNameInput}&fields=mythic_plus_scores_by_season%3Acurrent`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.characterName = `${data.name}`;
      this.characterSpec = `${data.active_spec_name} ${data.class}`;
      this.characterRating = `${data.mythic_plus_scores_by_season[0].scores.all}`
      this.profileIcon = data.thumbnail_url;

      this.cookie.set(
        "character-name",
        `${this.characterNameInput}`,
        1
      );
      this.cookie.set(
        "server-name",
        `${this.serverNameInput}`,
        1
      );
      this.difference = Math.round((Number(this.characterRating) - Number(this.cutoff)) * 100) / 100;
      if(this.difference >= 10) {
        this.acquired = 'green';
      } else if (this.difference >= 0) {
        this.acquired = 'yellow';
      } else {
        this.acquired = 'red';
      }
      this.differenceMessage = `is ${Math.abs(this.difference)} ahead of the cutoff!`
      this.majorKeyLevelMessage = `- ${this.getMajorKeyLevel()} major keystones`;
      this.minorKeyLevelMessage = `- ${this.getMinorKeyLevel()} minor keystones`;
    })
    .catch((err) => console.log(err));
  }

  async getSeasonCutoff() {
    await fetch(`https://raider.io/api/v1/mythic-plus/season-cutoffs?season=season-sl-4&region=us`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.cutoff = data.cutoffs.p999.all.quantileMinValue;
    })
    .catch((err) => console.log(err));
  }
}
