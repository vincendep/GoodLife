import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliAttivitaFisicaPage } from './dettagli-attivita-fisica.page';

describe('DettagliAttivitaFisicaPage', () => {
  let component: DettagliAttivitaFisicaPage;
  let fixture: ComponentFixture<DettagliAttivitaFisicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettagliAttivitaFisicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliAttivitaFisicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
