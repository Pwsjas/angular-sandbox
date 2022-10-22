import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fetch-test',
  templateUrl: './fetch-test.component.html',
  styleUrls: ['./fetch-test.component.scss']
})
export class FetchTestComponent implements OnInit {

  profile: String = '';
  profileIcon: String = '';
  cutoff: String = '';

  constructor() { }

  ngOnInit(): void {
    this.getRaiderIO();
    this.getSeasonCutoff();
  }

  async getRaiderIO() {
    await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=bleeding-hollow&name=Pwsjas`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.profile = `${data.name} ${data.active_spec_name} ${data.class}`;
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
