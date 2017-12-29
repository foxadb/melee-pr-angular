import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMatchComponent } from './manager-match.component';

describe('UserMatchPanelComponent', () => {
  let component: ManagerMatchComponent;
  let fixture: ComponentFixture<ManagerMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
