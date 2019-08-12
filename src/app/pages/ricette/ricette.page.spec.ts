import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicettePage } from './ricette.page';

describe('RicettePage', () => {
  let component: RicettePage;
  let fixture: ComponentFixture<RicettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicettePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
