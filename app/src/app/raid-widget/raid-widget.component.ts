import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-raid-widget',
  templateUrl: './raid-widget.component.html',
  styleUrls: ['./raid-widget.component.scss']
})
export class RaidWidgetComponent implements OnInit {

  @Input() raidData: any = ''

  constructor() { }
  raidName: String = '';
  raidProgress: String = '';
  raidWorldRanking: String = '';
  raidNARanking: String = '';

  ngOnInit(): void {
    console.log(this.raidData);
    this.raidName = this.raidData.name.replace(/-/g, ' ');
    this.raidProgress = this.raidData.raidProg.summary;

    if(this.raidData.raidRank.mythic) {
      this.raidWorldRanking = this.raidData.raidRank.mythic.world;
    } else {
      this.raidWorldRanking = this.raidData.raidRank.heroic.world;
    }

    if(this.raidData.raidRank.mythic) {
      this.raidNARanking = this.raidData.raidRank.mythic.region;
    } else {
      this.raidNARanking = this.raidData.raidRank.heroic.region;
    }

  }

}