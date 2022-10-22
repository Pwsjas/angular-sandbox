import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fetch-test',
  templateUrl: './fetch-test.component.html',
  styleUrls: ['./fetch-test.component.scss']
})
export class FetchTestComponent implements OnInit {

  profile: String = '';
  profileIcon: String = '';

  constructor() { }

  ngOnInit(): void {
    this.getRaiderIO();
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

}
