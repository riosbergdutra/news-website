import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  formgroup: FormGroup;
  name: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) {
    this.formgroup = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formgroup.valid) {
      const formData = this.formgroup.value;

      // Envia os dados para o serviço usando o método enviarDadosFormulario
      this.cadastroService.enviarDadosFormulario(formData).subscribe(
        (response) => {
          console.log('Dados do formulário enviados com sucesso:', response);

          // Após o envio bem-sucedido, navegue para a rota
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erro ao enviar os dados do formulário:', error);
        }
      );
    } else {
      alert('Formulário inválido. Verifique os campos.');
    }
  }
}
