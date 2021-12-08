import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.css']
})
export class CartaoComponent implements OnInit {

  //Recebendo como propriedade de quem chamar este componente
  @Input() titulo = '';

  constructor() { }

  ngOnInit(): void {
  }

}
