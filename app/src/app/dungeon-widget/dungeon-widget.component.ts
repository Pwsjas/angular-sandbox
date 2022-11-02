import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dungeon-widget',
  templateUrl: './dungeon-widget.component.html',
  styleUrls: ['./dungeon-widget.component.scss']
})
export class DungeonWidgetComponent implements OnInit {

  @Input() dungeon: any;
  @Input() averageRating: number = 0;

  dungeonName: String = '';
  dungeonLevel: number = 0;
  dungeonUpgrade: String = '';

  plus: String = '';

  constructor() { }

  ngOnInit(): void {
    this.dungeonName = this.dungeon.short_name;
    this.dungeonLevel = Number(this.dungeon.mythic_level);
    this.dungeonUpgrade = this.dungeon.num_keystone_upgrades;
    if (Number(this.dungeonUpgrade) === 1) {
      this.plus = "+"
    } else if (Number(this.dungeonUpgrade) === 2) {
      this.plus = "++"
    } else if (Number(this.dungeonUpgrade) === 3) {
      this.plus = "+++"
    }

    this.averageRating = Math.round(this.averageRating);
  }

}
