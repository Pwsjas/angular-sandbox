import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-widget',
  templateUrl: './character-widget.component.html',
  styleUrls: ['./character-widget.component.scss']
})
export class CharacterWidgetComponent implements OnInit {

  @Input() profilePicture: String = ''
  @Input() characterName: String = ''
  @Input() rating: String = ''

  constructor() { }

  ngOnInit(): void {
  }

}
