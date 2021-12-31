import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {
  //O Interceptor é um serviço que implementa a interface HttpInterceptor
  //Objetivo: interceptar todas as requisições que saem da aplicação e manipular a requisição
  // antes de ir ao servidor;

  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornaToken();
      const headers = new HttpHeaders().append('x-access-token', token);

      request = request.clone({ headers });
    }

    //next.handle serve para passar para próxima 'parte' ou enviar para o servidor.
    return next.handle(request);
  }
}
