import { switchMap, tap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comentarios$ = this.comentariosService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength(300)],
    });
  }

  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentariosService
      .incluiComentario(this.id, comentario)
      .pipe(
        //ao utilizar switchMap, será convertido o fluxo de buscar os comentarios
        switchMap(() => this.comentariosService.buscaComentario(this.id)),
        // para fazer efeitos colaterais, ou seja, coisas que não vão alterar o fluxo e precisam acontecer durante o processamento do fluxo,
        // é possível utilizar o tap
        tap(() => {
          this.comentarioForm.reset();
          alert('Salvo o comentário');
        })
      );
  }
}
