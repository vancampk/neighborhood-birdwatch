import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDetails } from './station-details';

describe('StationDetails', () => {
  let component: StationDetails;
  let fixture: ComponentFixture<StationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
