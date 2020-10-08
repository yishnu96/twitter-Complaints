import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedComplaintsComponent } from './resolved-complaints.component';

describe('ResolvedComplaintsComponent', () => {
  let component: ResolvedComplaintsComponent;
  let fixture: ComponentFixture<ResolvedComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
