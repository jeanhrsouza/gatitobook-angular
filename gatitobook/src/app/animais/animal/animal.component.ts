import { Component, OnInit, Input } from '@angular/core';

const API = 'http://localhost:3000';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
})
export class AnimalComponent implements OnInit {
  private urlOriginal = '';

  //Utilizando decorato Input para receber os dados
  @Input() descricao = '';

  //URL será feito um tratamento. É utilizado o método set para ficar mais dinâmico.
  //Ou seja, ao adicionar um valor, será chamado o método da classe
  @Input() set url(url: string) {
    if (url.startsWith('data')) {
      this.urlOriginal = url;
    } else {
      this.urlOriginal = `${API}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urlOriginal;
  }

  constructor() {}

  ngOnInit(): void {}
}
