import { switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Injectable({
  providedIn: 'root',
})
export class ListaAnimaisResolver implements Resolve<Animais> {
  /**
   * O Objetivo do resolver é realizar alguma operação, carregamento ou carregar alguma informação
   * antes da rota ser resolvida.
   * A busca da API será realizada enquanto a página for clicada.
   */

  constructor(
    private animaisService: AnimaisService,
    private usuarioService: UsuarioService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Animais> {
    /*
      Em vez de fazer o subscribe, eu vou 'operar em outro fluxo', ou seja,
      utilizar o Pipe

      PipeAsync => tem o papel de deixar para o Angular o papel de fazer o subscribe e unsubcribe quando o componente for descarregado da tela
    */
    return this.usuarioService.retornaUsuario().pipe(
      //Operadores RXJS são basicamentes funções que manipulam os fluxos de operações dentro de um observable
      // SwitchMap serve para trocar o fluxo. (Usuário para fluxo de animais)
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      }),
      //take significa que o fluxo só irá fazer uma única vez. É necessário utilizar para que o Observable Subject de #retornaUsuario() seja finalizado
      take(1)
    );
  }
}
