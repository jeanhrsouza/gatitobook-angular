import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Animais } from './../animais';
import { AnimaisService } from './../animais.service';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  // O $ no final da variável é uma convenção para indicar que é um observable
  animais$!: Observable<Animais>;

  constructor(
    private usuarioService: UsuarioService,
    private animaisService: AnimaisService
  ) {}

  ngOnInit(): void {
    /*
      Em vez de fazer o subscribe, eu vou 'operar em outro fluxo', ou seja,
      utilizar o Pipe

      PipeAsyunc => tem o papel de deixar para o Angular o papel de fazer o subscribe e unsubcribe quando o componente for descarregado da tela
    */
    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      //Operadores RXJS são basicamentes funções que manipulam os fluxos de operações dentro de um observable
      // SwitchMap serve para trocar o fluxo. (Usuário para fluxo de animais)
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      })
    );
  }
}
