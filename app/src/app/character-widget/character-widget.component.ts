import { Component, Input, OnInit } from '@angular/core';
import { RaiderIOService } from '../raider-io.service';

@Component({
  selector: 'app-character-widget',
  templateUrl: './character-widget.component.html',
  styleUrls: ['./character-widget.component.scss']
})
export class CharacterWidgetComponent implements OnInit {
  
  @Input() profile: any;

  characterName: String = '';
  rating: String = '';
  class: String = '';
  spec: String = '';
  profilePicture: String = '';

  constructor(private raiderIO: RaiderIOService) { }

  ngOnInit(): void {
    this.characterName = this.profile.name;
    this.rating = this.profile.rating;
    this.class = this.profile.class.toLowerCase() + "-background";
    this.spec = this.profile.spec;
    this.profilePicture = this.profile.profilePicture
  }
}
