import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimaisComponent,
    resolve: {
      //Vai fazer a busca no backend, trazer um Observable -> retirar a informação do Observable e preencher a variável animais.
      // Assim, tendo acesso dos valores antes de carregar a página.
      animais: ListaAnimaisResolver,
    },
  },
  {
    path: ':animalId', //passando parametro pela barra
    component: DetalheAnimalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimaisRoutingModule {}
