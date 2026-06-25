import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  // URL da API validada do seu backend local na porta 3000
  private apiVehicles = 'http://localhost:3000/vehicle';

  listaModelos: any[] = [];
  dadosTabelaFiltrados: any[] = [];

  // Modelos de controle vinculados ao select e input por ngModel
  modeloSelecionado: string = 'Ranger';
  termoBuscaTabela: string = '';

  // Indicadores dos três blocos superiores
  totalVendas: number = 0;
  conectados: number = 0;
  updateSoftware: number = 0;
  imagemVeiculoUrl: string = 'img/ranger.png';

  // Base mockada local de telemetria baseada no PDF/Gabarito
  private telemetriaMock: any[] = [
    { vin: '2FRHDUYS2Y63NHD22454', model: 'Ranger', odometer: '50000', fuelLevel: 90, status: 'Ativo', lat: '-12.2322', lng: '-38.2314' },
    { vin: '1FA6P8CF0H51XXXXX', model: 'Mustang', odometer: '12000', fuelLevel: 45, status: 'Ativo', lat: '-23.5590', lng: '-46.6350' },
    { vin: '3FTTW8F90H21XXXXX', model: 'Ranger', odometer: '89400', fuelLevel: 12, status: 'Manutenção', lat: '-22.9068', lng: '-43.1729' },
    { vin: '8APBU123456XXXXXX', model: 'Territory', odometer: '23100', fuelLevel: 95, status: 'Ativo', lat: '-19.9167', lng: '-43.9345' },
    { vin: '9BFCS789012XXXXXX', model: 'Bronco Sport', odometer: '5600', fuelLevel: 60, status: 'Ativo', lat: '-12.9714', lng: '-38.5014' }
  ];

  private buscaSubject = new Subject<string>();
  private buscaSubscription!: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Requisição HTTP para a API rodando no Node.js
    this.http.get<any>(this.apiVehicles).subscribe({
      next: (resposta) => {
        this.listaModelos = resposta.vehicles || [];
        this.atualizarDashboard();
      },
      error: (err) => console.error('Erro ao conectar com o servidor da API:', err)
    });

    // Filtro RxJS reativo solicitado nos critérios do projeto
    this.buscaSubscription = this.buscaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(termo => {
      this.termoBuscaTabela = termo;
      this.filtrarDadosTabela();
    });
  }

  onModelChange(): void {
    this.atualizarDashboard();
  }

  onInputChange(valor: string): void {
    this.buscaSubject.next(valor);
  }

  atualizarDashboard(): void {
    // RESOLUÇÃO DO CASO BRONCO SPORT: Tratamento de Case Sensitivity da API (S maiúsculo)
    if (this.modeloSelecionado === 'Bronco Sport') {
      this.imagemVeiculoUrl = 'img/broncoSport.png';
    } else {
      const nomeFormatado = this.modeloSelecionado.toLowerCase().replace(/\s+/g, '');
      this.imagemVeiculoUrl = `img/${nomeFormatado}.png`;
    }

    // Busca o veículo correspondente no retorno da API
    const carroDados = this.listaModelos.find(
      item => item.vehicle.toLowerCase().trim() === this.modeloSelecionado.toLowerCase().trim()
    );

    if (carroDados) {
      this.totalVendas = carroDados.volumetotal || 0;
      this.conectados = carroDados.connected || 0;
      this.updateSoftware = carroDados.softwareUpdates || 0;
    } else {
      this.totalVendas = 0;
      this.conectados = 0;
      this.updateSoftware = 0;
    }

    this.filtrarDadosTabela();
  }

  filtrarDadosTabela(): void {
    let resultado = this.telemetriaMock.filter(
      item => item.model.toLowerCase().trim() === this.modeloSelecionado.toLowerCase().trim()
    );

    if (this.termoBuscaTabela.trim() !== '') {
      resultado = resultado.filter(item =>
        item.vin.toLowerCase().includes(this.termoBuscaTabela.toLowerCase())
      );
    }

    this.dadosTabelaFiltrados = resultado;
  }

  ngOnDestroy(): void {
    if (this.buscaSubscription) {
      this.buscaSubscription.unsubscribe();
    }
  }
}
