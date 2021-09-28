import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  // a ! indica que pode ser nulo ou não
  novoUsuarioForm!: FormGroup;

  //injetando o servico
  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService
  ) {}

  //O ngOnInit é executado após a classe injetar todo o servico;
  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: [''],
      fullName: [''],
      userName: [''],
      password: [''],
    });
  }

  //executado quando for submetido
  cadastrar() {
    /*
      Utilizando o getRawValue
      É retornado um objeto somente com o estado das variáveis carregadas
      da view que o usuário carregou
    */
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log('Cadastrou');
  }
}
