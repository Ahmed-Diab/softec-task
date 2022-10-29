import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdarTableComponent } from './ordar-table.component';

describe('OrdarTableComponent', () => {
  let component: OrdarTableComponent;
  let fixture: ComponentFixture<OrdarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdarTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
