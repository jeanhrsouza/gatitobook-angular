import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo.validator';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';
import { usuarioSenhaIguaisValidator } from './usuario-senhas-iguais.validator';

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
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator]],
      password: [''],
    },
    {
      validators: [usuarioSenhaIguaisValidator],
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
