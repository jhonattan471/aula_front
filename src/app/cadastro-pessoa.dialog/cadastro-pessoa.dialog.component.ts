import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pessoa } from '../app.component';

@Component({
  selector: 'app-cadastro-pessoa.dialog',
  templateUrl: './cadastro-pessoa.dialog.component.html',
  styleUrls: ['./cadastro-pessoa.dialog.component.scss']
})
export class CadastroPessoaDialogComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(new Date().toISOString()),
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    sobrenome: new FormControl('')
  })

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CadastroPessoaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pessoa
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data)
    }
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.snackBar.open('Formulário inválido.', 'ok')
      return
    }

    this.dialogRef.close(this.form.getRawValue())
  }
}
