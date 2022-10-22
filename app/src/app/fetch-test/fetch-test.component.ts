import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fetch-test',
  templateUrl: './fetch-test.component.html',
  styleUrls: ['./fetch-test.component.scss']
})
export class FetchTestComponent implements OnInit {

  profileIcon: String = '';

  characterName: String = '';
  characterSpec: String = '';
  characterRating: String = '';

  cutoff: String = '';

  constructor() { }

  ngOnInit(): void {
    this.getRaiderIO();
    this.getSeasonCutoff();
  }

  async getRaiderIO() {
    await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=bleeding-hollow&name=Pwsjas&fields=mythic_plus_scores_by_season%3Acurrent`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.characterName = `${data.name}`;
      this.characterSpec = `${data.active_spec_name} ${data.class}`;
      this.characterRating = `${data.mythic_plus_scores_by_season[0].scores.all}`
      this.profileIcon = data.thumbnail_url;
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
