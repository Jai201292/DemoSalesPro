import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackVisitComponent } from './track-visit.component';

describe('TrackVisitComponent', () => {
  let component: TrackVisitComponent;
  let fixture: ComponentFixture<TrackVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
