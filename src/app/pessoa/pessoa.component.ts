import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CadastroPessoaDialogComponent } from './cadastro-pessoa.dialog/cadastro-pessoa.dialog.component';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements AfterViewInit {
  title = 'my-app'
  nome: string = ""
  displayedColumns: string[] = ['acoes', 'id', 'nome', 'sobrenome', 'estado', 'cidade', 'logradouro'];
  dataSource: MatTableDataSource<Pessoa>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog //usado para abrir a dialog
  ) {
    this.dataSource = new MatTableDataSource([new Pessoa('1', 'nome', 'sobrenome')]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(CadastroPessoaDialogComponent, {
      disableClose: true
    }).afterClosed().subscribe((r) => {
      if (!r) {
        return
      }
      this.dataSource.data.push(r)
      this.dataSource.filter = ''
    })
  }

  editar(pessoa: Pessoa) {
    this.dialog.open(CadastroPessoaDialogComponent, {
      disableClose: true,
      data: pessoa
    }).afterClosed().subscribe((r) => {
      if (!r) return

      for (let pessoa of this.dataSource.data) {
        if (pessoa.id == r.id) {
          Object.assign(pessoa, r)
        }
      }
    })
  }

  remover(pessoa: Pessoa) {
    this.dataSource.data = this.dataSource.data.filter(item => {
      if (item.id == pessoa.id) return false
      return true
    })
  }

}

export class Pessoa {
  constructor(
    public id: string,
    public nome: string,
    public sobrenome: string,
    public endereco?: Endereco
  ) { }
}

export class Endereco {
  constructor(
    public cep: string,
    public estado: string,
    public cidade: string,
    public logradouro: string,
  ) {
  }
}


