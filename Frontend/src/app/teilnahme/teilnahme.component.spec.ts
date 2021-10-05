import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeilnahmeComponent } from './teilnahme.component';

describe('TeilnahmeComponent', () => {
  let component: TeilnahmeComponent;
  let fixture: ComponentFixture<TeilnahmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeilnahmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeilnahmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
