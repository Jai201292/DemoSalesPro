import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerMasterComponent } from './dealer-master.component';

describe('DealerMasterComponent', () => {
  let component: DealerMasterComponent;
  let fixture: ComponentFixture<DealerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
