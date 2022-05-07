import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AnimaisService } from './../animais.service';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css'],
})
export class NovoAnimalComponent implements OnInit {
  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(
    private animaisService: AnimaisService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioAnimal = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const allowComments =
      this.formularioAnimal.get('allowComments')?.value ?? false;

    const description = this.formularioAnimal.get('description')?.value ?? '';

    this.animaisService
      .upload(description, allowComments, this.file)
      .pipe(
        //quando finalizar a requisição, redireciona para animais
        finalize(() => this.router.navigate(['animais']))
      )
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type == HttpEventType.UploadProgress) {
            const total = event.total ?? 1;
            this.percentualConcluido = Math.round(100 * (event.loaded / total));
          }
        },
        (error) => console.log(error)
      );
  }

  //receber o arquivo e fazer o preview
  gravaArquivo(arquivo: any): void {
    //utilizando destruction para capturar o file
    const [file] = arquivo?.files;
    this.file = file;
    //ler arquivo para realizar preview
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
