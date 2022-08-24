import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastroPessoaDialogComponent } from './cadastro-pessoa.dialog/cadastro-pessoa.dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'my-app'
  nome: string = ""
  displayedColumns: string[] = ['acoes', 'id', 'nome', 'sobrenome'];
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

class Endereco {
  cep: string
  estado: string
  cidade: string
  bairro: string
  logradouro: string
  numero: string
}

