import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Animais, Animal } from './animais';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    //Realizando chama da API passando um header
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorID(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    // O 3ª parametro é para receber o status
    return this.http
      .post(`${API}/photos/${id}/like`, {}, { observe: 'response' })
      .pipe(
        //mapTo: retornará true para o componente
        mapTo(true),
        catchError((error) => {
          //of: observable que retorna valor
          return error.status === NOT_MODIFIED ? of(false) : throwError(error);
        })
      );
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) {
    //p/ enviar o arquivo, é necessário empacotar o objeto em tipo formData
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.http.post(`${API}/photos/upload`, formData, {
      //A cada passo da requisição, o angular fará um next reportando a etapa da requisição.
      observe: 'events',
      reportProgress: true,
    });
  }
}
