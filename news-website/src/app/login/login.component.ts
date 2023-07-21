import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formgroup: FormGroup;
  name: string = ''

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.formgroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.formgroup.valid) {
      const formData = this.formgroup.value;

      // Envia os dados para o json-server usando o HttpClient
      this.http.post('http://localhost:3000/formData', formData).subscribe(
        (response) => {
          console.log;('Dados do formulário enviados com sucesso:');

          // Após o envio bem-sucedido, navegue para a rota 'resultado' (ou qualquer outra rota desejada)
          this.router.navigate(['/página']);
        },
        (error) => {
          console.error('Erro ao enviar os dados do formulário:', error);
        }
      );
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
}
