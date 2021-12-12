import { Animais } from './../animais';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grade-fotos-animais',
  templateUrl: './grade-fotos-animais.component.html',
  styleUrls: ['./grade-fotos-animais.component.css']
})
export class GradeFotosAnimaisComponent implements OnInit {

  // Ao usar !: eu não preciso instanciar de imediato;
  @Input() animais!: Animais;

  constructor() { }

  ngOnInit(): void {
  }

}
