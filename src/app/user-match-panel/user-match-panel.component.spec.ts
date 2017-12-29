import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchPanelComponent } from './user-match-panel.component';

describe('UserMatchPanelComponent', () => {
  let component: UserMatchPanelComponent;
  let fixture: ComponentFixture<UserMatchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
