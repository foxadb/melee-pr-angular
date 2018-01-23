import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRosterComponent } from './character-roster.component';

describe('CharacterRosterComponent', () => {
  let component: CharacterRosterComponent;
  let fixture: ComponentFixture<CharacterRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
