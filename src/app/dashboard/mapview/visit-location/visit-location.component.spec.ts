import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitLocationComponent } from './visit-location.component';

describe('VisitLocationComponent', () => {
  let component: VisitLocationComponent;
  let fixture: ComponentFixture<VisitLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
