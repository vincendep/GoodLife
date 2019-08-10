import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistichePage } from './statistiche.page';

describe('StatistichePage', () => {
  let component: StatistichePage;
  let fixture: ComponentFixture<StatistichePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistichePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistichePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
