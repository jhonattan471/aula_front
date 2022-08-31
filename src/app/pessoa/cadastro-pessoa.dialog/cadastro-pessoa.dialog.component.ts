import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppService } from '../../app.service';
import { ValidateCEP } from '../../utils';
import { Endereco, Pessoa } from '../pessoa.component';

@Component({
  selector: 'app-cadastro-pessoa.dialog',
  templateUrl: './cadastro-pessoa.dialog.component.html',
  styleUrls: ['./cadastro-pessoa.dialog.component.scss']
})
export class CadastroPessoaDialogComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(new Date().toISOString()),
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    sobrenome: new FormControl(''),
    cep: new FormControl('', [ValidateCEP]),
    estado: new FormControl(''),
    cidade: new FormControl(''),
    logradouro: new FormControl(''),
  })

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CadastroPessoaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa,
    private service: AppService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        ...this.data,
        ...this.data.endereco
      })
    }

    this.form.get('cep').valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(r => {
      if (this.form.get('cep').valid) {
        this.buscarCep()
      }
    })
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.snackBar.open('Formulário inválido.', 'ok')
      return
    }

    this.dialogRef.close(this.gerarObjeto())
  }

  gerarObjeto() {
    let pessoa = new Pessoa(
      this.form.get('id').value,
      this.form.get('nome').value,
      this.form.get('sobrenome').value,
      new Endereco(
        this.form.get('cep').value,
        this.form.get('estado').value,
        this.form.get('cidade').value,
        this.form.get('logradouro').value
      )
    )

    return pessoa
  }

  buscarCep() {
    let cep = this.form.get('cep').value
    this.service.procurarCep(cep).subscribe(
      {
        next: (r) => {
          this.form.get('estado').setValue(r.uf)
          this.form.get('cidade').setValue(r.localidade)
          this.form.get('logradouro').setValue(r.logradouro)
        },
        error: (e) => {
          alert('erro')
        }
      }
    )
  }
}
