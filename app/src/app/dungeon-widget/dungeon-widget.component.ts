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
  dungeonLevelFort: number = 0;
  dungeonLevelTyran: number = 0;
  dungeonUpgradeFort: String = '';
  dungeonUpgradeTyran: String = '';

  plusFort: String = '';
  plusTyran: String = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.dungeon);
    if (this.dungeon.fort) {
      this.dungeonName = this.dungeon.fort.short_name;
      this.dungeonLevelFort = Number(this.dungeon.fort.mythic_level);
      this.dungeonUpgradeFort = this.dungeon.fort.num_keystone_upgrades;

      if (Number(this.dungeonUpgradeFort) === 1) {
        this.plusFort = "+"
      } else if (Number(this.dungeonUpgradeFort) === 2) {
        this.plusFort = "++"
      } else if (Number(this.dungeonUpgradeFort) === 3) {
        this.plusFort = "+++"
      }
    }

    if (this.dungeon.tyran) {
      this.dungeonLevelTyran = Number(this.dungeon.tyran.mythic_level);
      this.dungeonUpgradeTyran = this.dungeon.tyran.num_keystone_upgrades;


      if (Number(this.dungeonUpgradeTyran) === 1) {
        this.plusTyran = "+"
      } else if (Number(this.dungeonUpgradeTyran) === 2) {
        this.plusTyran = "++"
      } else if (Number(this.dungeonUpgradeTyran) === 3) {
        this.plusTyran = "+++"
      }
    }

    this.averageRating = Math.round(this.averageRating);
  }

}
