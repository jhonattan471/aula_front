import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPessoaDialogComponent } from './cadastro-pessoa.dialog.component';

describe('CadastroPessoaDialogComponent', () => {
  let component: CadastroPessoaDialogComponent;
  let fixture: ComponentFixture<CadastroPessoaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPessoaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPessoaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
