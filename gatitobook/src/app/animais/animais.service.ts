import { TokenService } from './../autenticacao/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animais } from './animais';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    const token = this.tokenService.retornaToken();

    //Criando um header do tipo x-access-token
    const headers = new HttpHeaders().append('x-access-token', token);

    //Realizando chama da API passando um header
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`, {
      headers,
    });
  }
}
