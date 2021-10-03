import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBannerComponent } from './score-banner.component';

describe('ScoreBannerComponent', () => {
  let component: ScoreBannerComponent;
  let fixture: ComponentFixture<ScoreBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
