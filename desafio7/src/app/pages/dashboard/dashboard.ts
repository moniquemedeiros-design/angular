import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  totalvendas = 145760;
  conectados = 70000;
  atualizados = 27550;

  odometro = 23344;
  combustivel = 76;
  status = 'ON';
  latitude = -12.2322;
  longitude = -35.2314;

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

      this.totalvendas = 145760;
      this.conectados = 70000;
      this.atualizados = 27550;
    }

    if (valor === 'Mustang') {
      this.veiculosSelecionado = {
        nome: 'Mustang',
        imagem: 'img/mustang.png'
      };

      this.totalvendas = 1500;
      this.conectados = 500;
      this.atualizados = 750;
    }

    if (valor === 'Territory') {
      this.veiculosSelecionado = {
        nome: 'Territory',
        imagem: 'img/territory.png'
      };

      this.totalvendas = 4560;
      this.conectados = 4000;
      this.atualizados = 3050;
    }

    if (valor === 'Bronco Sport') {
      this.veiculosSelecionado = {
        nome: 'Bronco Sport',
        imagem: 'img/broncoSport.png'
      };

      this.totalvendas = 7560;
      this.conectados = 4060;
      this.atualizados = 2050;
    }
  }
}