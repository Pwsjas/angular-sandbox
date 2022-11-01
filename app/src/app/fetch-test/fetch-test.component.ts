import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { isObservable, of } from 'rxjs';
import { RaiderIOService } from '../raider-io.service';

@Component({
  selector: 'app-fetch-test',
  templateUrl: './fetch-test.component.html',
  styleUrls: ['./fetch-test.component.scss']
})
export class FetchTestComponent implements OnInit {

  profileIcon: String = '';
  characterNameInput: String = this.cookie.get('character-name');
  serverNameInput: String = this.cookie.get('server-name');
  friendNameInput: String = '';
  friendServerInput: String = '';

  characterName: String = '';
  characterGuild: String = '';
  characterSpec: String = '';
  characterRating: String = '';

  guildName: String = '';
  guildProgress: String = '';
  guildRank: string = '';

  acquired: String = 'white';

  cutoff: String = '';
  addButton: Boolean = true;

  friends: Array<any> = [
    {characterName: "Tylerskohai", server: "illidan"},
    {characterName: "Falfa", server: "sargeras"},
    {characterName: "Deadlyb", server: "bleeding-hollow"}
  ];

  constructor(private cookie: CookieService, private raiderIO: RaiderIOService) {}
  

  ngOnInit(): void {
    this.getSeasonCutoff();
    this.getRaiderIO();

    this.raiderIO.getGuildData('tabbed out', 'bleeding-hollow').subscribe(data => {
      console.log(data);
      this.guildProgress = data.raid_progression['castle-nathria'].summary;
    })
  }

  async getRaiderIO() {

    this.raiderIO.getCharacterProfile(this.characterNameInput, this.serverNameInput).subscribe(data => {
      console.log(data);
      this.characterName = `${data.name}`;
      this.guildName = `${data.guild.name}`
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
    })
  }

  getFriendRaiderIO() {

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

  toggleAddButton() {
    this.addButton = false;
  }
}
