import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirPollutionComponent } from './air-pollution.component';

describe('AirPollution', () => {
  let component: AirPollutionComponent;
  let fixture: ComponentFixture<AirPollutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirPollutionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirPollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
