import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDetection } from './live-detection';

describe('LiveDetection', () => {
  let component: LiveDetection;
  let fixture: ComponentFixture<LiveDetection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveDetection],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveDetection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
