import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubDealerComponent } from './view-sub-dealer.component';

describe('ViewSubDealerComponent', () => {
  let component: ViewSubDealerComponent;
  let fixture: ComponentFixture<ViewSubDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
