import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentsPage } from './aliments.page';

describe('AlimentsPage', () => {
  let component: AlimentsPage;
  let fixture: ComponentFixture<AlimentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
