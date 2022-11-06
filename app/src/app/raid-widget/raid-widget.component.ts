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
    this.raidName = this.getRaidName(this.raidData.name);
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

  getRaidName(raidName: String) {
    let output: String = raidName.replace(/-/g, ' ');
    let tempArr: Array<string> = output.split(' ');

    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === "Of" || tempArr[i] === "The") {
        tempArr[i] = tempArr[i].toLowerCase();
      } else if (tempArr[i] !== 'of' && tempArr[i] !== 'the'){
        let temp: Array<any> = tempArr[i].split('');
        temp[0] = temp[0].toUpperCase();
        tempArr[i] = temp.join('');
      }
    }

    output = tempArr.join(' ');
    console.log(output);
    return output;
  }
}