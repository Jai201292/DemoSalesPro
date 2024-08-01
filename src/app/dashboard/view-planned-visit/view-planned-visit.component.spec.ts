import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlannedVisitComponent } from './view-planned-visit.component';

describe('ViewPlannedVisitComponent', () => {
  let component: ViewPlannedVisitComponent;
  let fixture: ComponentFixture<ViewPlannedVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlannedVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlannedVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
