import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() characterNameInput: String = '';
  @Input() serverNameInput: String = '';
  @Output() characterDataEmitter = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void {
  }

  emitCharacterData() {
    this.characterDataEmitter.emit({name: this.characterNameInput, server: this.serverNameInput});
  }

}
