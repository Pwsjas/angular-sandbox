import { Component, destroyPlatform, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RaiderIOService } from '../raider-io.service';

@Component({
  selector: 'app-character-widget',
  templateUrl: './character-widget.component.html',
  styleUrls: ['./character-widget.component.scss']
})
export class CharacterWidgetComponent implements OnInit {
  
  @Input() profile: any;
  @Output() deleteFriendName = new EventEmitter<String>();
  @Output() searchFriendName = new EventEmitter<Object>();

  characterName: String = '';
  rating: String = '';
  class: String = '';
  spec: String = '';
  role: String = '';
  server: String = '';
  profilePicture: String = '';
  specIcon: String = '';

  constructor(private raiderIO: RaiderIOService) { }

  ngOnInit(): void {
    this.characterName = this.profile.name;
    this.rating = this.profile.rating;
    this.class = this.profile.class.toLowerCase() + "-background";
    this.spec = this.profile.spec;
    this.role = this.profile.role;
    this.server = this.profile.server;
    this.profilePicture = this.profile.profilePicture
    this.specIcon = `${this.spec}_${this.profile.class}.jpg`.toLocaleLowerCase();
    console.log(this.profile);
  }

  removeFriend() {
    this.deleteFriendName.emit(this.characterName);
  }

  searchFriend() {
    this.searchFriendName.emit({name: this.characterName, server: this.server});
  }
}
