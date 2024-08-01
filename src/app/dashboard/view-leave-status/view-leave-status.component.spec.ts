import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveStatusComponent } from './view-leave-status.component';

describe('ViewLeaveStatusComponent', () => {
  let component: ViewLeaveStatusComponent;
  let fixture: ComponentFixture<ViewLeaveStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeaveStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
