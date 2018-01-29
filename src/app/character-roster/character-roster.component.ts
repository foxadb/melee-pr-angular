import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-roster',
  templateUrl: './character-roster.component.html',
  styleUrls: ['./character-roster.component.scss']
})
export class CharacterRosterComponent implements OnInit {

  // selected characters list
  @Input() mains: Array<string> = [];

  // Character input
  @Input() characterMessage: Array<string>;

  // Character output
  @Output() characterMessageEvent = new EventEmitter<Array<string>>();

  constructor() { }

  public ngOnInit(): void {
    // initialize mains with parent input
    if (this.characterMessage) {
      this.mains = this.characterMessage;
    }
  }

  public addMain(character: string): void {
    // search if main already exist
    const index = this.mains.indexOf(character, 0);

    // if not found, add it to the list
    if (index === -1) {
      this.mains.push(character);

      // send the characters to parent
      this.characterMessageEvent.emit(this.mains);
    }
  }

  public removeMain(character: string): void {
    // find the character
    const index = this.mains.indexOf(character, 0);

    // remove it if found
    if (index > -1) {
      this.mains.splice(index, 1);

      // send the characters to parent
      this.characterMessageEvent.emit(this.mains);
    }
  }

}
