import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdarCardComponent } from './ordar-card.component';

describe('OrdarCardComponent', () => {
  let component: OrdarCardComponent;
  let fixture: ComponentFixture<OrdarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdarCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
