import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaAlimentoPage } from './crea-alimento.page';

describe('CreaAlimentoPage', () => {
  let component: CreaAlimentoPage;
  let fixture: ComponentFixture<CreaAlimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaAlimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaAlimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
