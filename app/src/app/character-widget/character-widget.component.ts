import { Component, Input, OnInit } from '@angular/core';
import { RaiderIOService } from '../raider-io.service';

@Component({
  selector: 'app-character-widget',
  templateUrl: './character-widget.component.html',
  styleUrls: ['./character-widget.component.scss']
})
export class CharacterWidgetComponent implements OnInit {
  
  @Input() characterName: String = ''
  @Input() server: String = ''

  profile: any = {};
  rating: String = '';
  class: String = '';
  spec: String = '';
  profilePicture: String = '';

  constructor(private raiderIO: RaiderIOService) { }

  ngOnInit(): void {
    this.raiderIO.getCharacterProfile(this.characterName, this.server).subscribe(data => {
      this.profile = data;
      console.log(this.profile);
      this.rating = this.profile.mythic_plus_scores_by_season[0].scores.all;
      this.class = this.profile.class;
      this.spec = this.profile.active_spec_name;
      this.profilePicture = this.profile.thumbnail_url;
    });
  }
}
