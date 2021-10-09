import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// @Injectable indica que a classe pode ser injetada em algum outro serviço
// Transforma o objeto em um Singleton.
@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  //injeção de dependência
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  //Observable é como se fosse uma promise do JS
  //O observable retornará um Objeto assim que for completada a requisição que
  /*
    Toda vez que fizer uma requisição, além de pegar as requisições
    eu quero salvar o token no meu serviço utilizando o tap
  */
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post(
        'http://localhost:3000/user/login',
        {
          //mapeando os objetos
          userName: usuario,
          password: senha,
        },
        {
          observe: 'response',
        }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.usuarioService.salvaToken(authToken);
        })
      );
  }
}
