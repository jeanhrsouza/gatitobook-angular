import { AnimaisService } from './../animais.service';
import { Animal } from './../animais';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  //  !: indica que não está sendo instanciado
  //  $ no final da variável indica que é um Observable
  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,

    //ActivatedRoute é o serviço padrão utilizado para tratar das informações da rota.
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //pegando exatamente o nome da variável definida na rota
    this.animalId = this.activatedRoute.snapshot.params.animalId;

    this.animal$ = this.animaisService.buscaPorID(this.animalId);
  }
}
