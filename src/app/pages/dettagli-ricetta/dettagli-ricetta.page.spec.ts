import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliRicettaPage } from './dettagli-ricetta.page';

describe('DettagliRicettaPage', () => {
  let component: DettagliRicettaPage;
  let fixture: ComponentFixture<DettagliRicettaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettagliRicettaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliRicettaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
