import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  //decorator padrão do angular @Input
  // Ao utilizar o componente, será criado um input chamado msg
  // e esse atributo será passado a mensagem do componente
  @Input()
  mensagem = "";

  constructor() { }

  ngOnInit(): void {
  }

}
