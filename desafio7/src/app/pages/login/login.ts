import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  senha = '';
  logarAutomaticamente = false;

  constructor(private router: Router) {}

  entrar() {
      
    console.log('E-mail:', this.email);
    console.log('Senha:', this.senha);

    if (
      this.email === 'admin' &&
      this.senha === '123456'
    ) {

      alert('Login realizado com sucesso!');
      this.router.navigate(['home']);

    } else {

      alert('E-mail ou senha inválidos!');

    }

  }

}