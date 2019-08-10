import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliPastoPage } from './dettagli-pasto.page';

describe('DettagliPastoPage', () => {
  let component: DettagliPastoPage;
  let fixture: ComponentFixture<DettagliPastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettagliPastoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliPastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
