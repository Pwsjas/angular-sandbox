import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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

  characterName: String = 'tea';
  characterGuild: String = '';
  characterSpec: String = '';
  characterClass: String = '';
  characterRating: String = '';
  characterFaction: String = '';

  dungeonData: Array<any> = [];
  averageRating: number = 0;
  roundedAverageRating: number = 0;

  raidProgressionData: Array<any> = [];
  raidRankingData: Array<any> = [];
  raidData: Array<any> = [];
  guildName: String = '';

  acquired: String = 'white';

  cutoff: String = '';
  addButton: Boolean = true;

  deleteFriendName: String = '';

  invalidInput: boolean = false;
  friends: Array<any> = [];

  constructor(private cookie: CookieService, private raiderIO: RaiderIOService) {}
  

  ngOnInit(): void {
    this.getSeasonCutoff();
    this.getRaiderIO();

    if (this.cookie.check('friend-list')) {
      this.friends = JSON.parse(this.cookie.get('friend-list'))
    } else {
      this.friendNameInput = this.characterNameInput;
      this.friendServerInput = this.serverNameInput;

      this.getFriendRaiderIO();

      this.friendNameInput = '';
      this.friendServerInput = '';
    }

    console.log(this.friends);
  }

  async getRaiderIO() {

    this.raiderIO.getCharacterProfile(this.characterNameInput, this.serverNameInput).subscribe(data => {
      console.log(data);
      this.characterName = `${data.name}`;
      if (data.guild) {
        this.guildName = `${data.guild.name}`
      }
      this.characterClass = data.class.replace(/\s+/g, '').toLowerCase();
      this.characterSpec = `${data.active_spec_name} ${data.class}`;
      this.characterRating = `${data.mythic_plus_scores_by_season[0].scores.all}`
      this.characterFaction = data.faction;
      this.profileIcon = data.thumbnail_url;
      this.sortDungeonData(data.mythic_plus_best_runs, data.mythic_plus_alternate_runs);
      console.log(this.dungeonData);
  
      this.cookie.set(
        "character-name",
        `${this.characterNameInput}`,
        365
      );
      this.cookie.set(
        "server-name",
        `${this.serverNameInput}`,
        365
      );
      if (Number(this.characterRating) < Number(this.cutoff)) {
        this.acquired = 'red';
      } else if (Number(this.characterRating) > Number(this.cutoff) + 10) {
        this.acquired = 'green';
      } else {
        this.acquired = 'yellow';
      }
      this.getGuildData();
    })
  }

  getFriendRaiderIO() {
    this.raiderIO.getCharacterProfile(this.friendNameInput, this.friendServerInput).subscribe(data => {
      if(data) {
        this.invalidInput = false;

        this.friends.push({
          name: data.name,
          rating: data.mythic_plus_scores_by_season[0].scores.all,
          class: data.class.replace(/\s+/g, ''),
          spec: data.active_spec_name.replace(/\s+/g, ''),
          role: `${data.active_spec_role.toLowerCase()}.png`,
          server: data.realm,
          profilePicture: data.thumbnail_url
        })
      }
      this.cookie.set(
        "friend-list",
        JSON.stringify(this.friends),
        365
      )
      this.addButton = true;
      this.friendNameInput = '';
      this.friendServerInput = '';
    }, err => {
      this.invalidInput = true;
    });
  }

  async getSeasonCutoff() {

    this.raiderIO.getSeasonCutoff().subscribe(data => {
      console.log(data);
      this.cutoff = data.cutoffs.p999.all.quantileMinValue;
      this.averageRating = Math.round(((Number(this.cutoff) - 480) / 112) * 100)/100;
      this.roundedAverageRating = Math.round(this.averageRating);
    })
  }

  toggleAddButton() {
    this.addButton = false;
  }

  async getGuildData() {
    this.raiderIO.getGuildData(this.guildName, this.serverNameInput).subscribe(data => {
      this.raidRankingData = [];
      this.raidProgressionData = [];
      this.raidData = [];

      let num = 0;
      for (let i in data.raid_progression) {
        if (!i.includes('fated')) {
          this.raidRankingData.push(data.raid_rankings[i]);
          this.raidProgressionData.push(data.raid_progression[i]);
          this.raidData[num] = {name: i, raidProg: this.raidProgressionData[num], raidRank: this.raidRankingData[num]}
          num += 1;
        }
      }

      this.guildName = data.name
    })
  }

  deleteFriend(name: String) {
    for (let i = 0; i < this.friends.length; i++) {
      if (this.friends[i].name === name) {
        this.friends.splice(i, 1)
        this.cookie.set(
          "friend-list",
          JSON.stringify(this.friends),
          365
        )
        return;
      }
    }
  }

  updateCharacterData(data: any) {
    this.characterNameInput = data.name;
    this.serverNameInput = data.server;

    this.getRaiderIO();
  }

  searchFriend(friend: any) {
    this.characterNameInput = friend.name;
    this.serverNameInput = friend.server;
    this.getRaiderIO();
  }

  sortDungeonData(dungeonsBest: any, dungeonsAlternate: any) {
    this.dungeonData = [];
    let fort = [];
    let tyran = [];
    for (let dungeon of dungeonsBest) {
      if (dungeon.affixes[0].name === 'Fortified') {
        fort.push(dungeon);
      } else {
        tyran.push(dungeon);
      }
    }
    for (let dungeon of dungeonsAlternate) {
      if (dungeon.affixes[0].name === 'Fortified') {
        fort.push(dungeon);
      } else {
        tyran.push(dungeon);
      }
    }

    fort.sort((a, b) => a.short_name < b.short_name ? 1: -1);
    tyran.sort((a, b) => a.short_name < b.short_name ? 1: -1);

    let num: number = 0;
    if (fort.length >= tyran.length) {
      num = fort.length;
    } else {
      num = tyran.length;
    }

    for (let i = 0; i < num; i++) {
      if (i === 0) {
        this.dungeonData.push({fort: fort[i], tyran: tyran[i], first: true});
      } else {
        this.dungeonData.push({fort: fort[i], tyran: tyran[i]});
      }
    }
  }
}
