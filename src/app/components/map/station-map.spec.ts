import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationMap } from './station-map';

describe('StationMap', () => {
  let component: StationMap;
  let fixture: ComponentFixture<StationMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Map]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Map);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
