import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable indica que a classe pode ser injetada em algum outro serviço
// Transforma o objeto em um Singleton.
@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  //injeção de dependência
  constructor(private httpClient: HttpClient) {}

  //Observable é como se fosse uma promise do JS
  //O observable retornará um Objeto assim que for completada a requisição que
  autenticar(usuario: string, senha: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/user/login', {
      //mapeando os objetos
      userName: usuario,
      password: senha,
    });
  }
}
