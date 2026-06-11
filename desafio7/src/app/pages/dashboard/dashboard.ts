import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  veiculosSelecionado = {
    nome: 'Ranger',
    imagem: 'img/ranger.png'
  };

  selecionarVeiculo(event: any) {

    const valor = event.target.value;

    if (valor === 'Ranger') {
      this.veiculosSelecionado = {
        nome: 'Ranger',
        imagem: 'img/ranger.png'
      };
    }

    if (valor === 'Mustang') {
      this.veiculosSelecionado = {
        nome: 'Mustang',
        imagem: 'img/mustang.png'
      };
    }

    if (valor === 'Territory') {
      this.veiculosSelecionado = {
        nome: 'Territory',
        imagem: 'img/territory.png'
      };
    }

    if (valor === 'Bronco Sport') {
      this.veiculosSelecionado = {
        nome: 'Bronco Sport',
        imagem: 'img/broncoSport.png'
      };
    }
  }
}
