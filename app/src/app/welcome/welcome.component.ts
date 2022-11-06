import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RaiderIOService } from '../raider-io.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  characterNameInput: string = '';
  serverNameInput: string = '';

  invalidInput: boolean = false;
  new: boolean = true;

  constructor(private cookie: CookieService, private raiderIO: RaiderIOService) { }

  ngOnInit(): void {
    if (this.cookie.get('character-name') && this.cookie.get('server-name')) {
      this.new = false;
    }
  }

  search() {

    this.raiderIO.getCharacterProfile(this.characterNameInput, this.serverNameInput).subscribe(data => {
      if (data) {
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
    
        this.new = false;
      }
    }, err => {
      this.invalidInput = true;
    })
  }

}
