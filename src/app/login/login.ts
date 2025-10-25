import { Component, signal, output, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BotonPersonalizadoComponent } from '../boton-personalizado/boton-personalizado';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BotonPersonalizadoComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Signals para el formulario
  readonly username = signal('');
  readonly password = signal('');
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  
  // Credenciales hardcodeadas
  private readonly validCredentials = {
    username: 'admin',
    password: '123456'
  };
  
  // Output signal para comunicar el login exitoso
  readonly loginSuccess = output<string>();
  
  // Computed signal para validar el formulario
  readonly isFormValid = computed(() => {
    return this.username().length > 0 && this.password().length > 0;
  });
  
  // Computed signal para el estado del botón
  readonly buttonText = computed(() => {
    return this.isLoading() ? '🔄 Iniciando sesión...' : '🔑 Iniciar Sesión';
  });

  // Método para actualizar username
  updateUsername(value: string) {
    this.username.set(value);
    this.clearError();
  }

  // Método para actualizar password
  updatePassword(value: string) {
    this.password.set(value);
    this.clearError();
  }

  // Método para limpiar errores
  private clearError() {
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  // Método para manejar el submit del formulario
  onSubmit() {
    if (!this.isFormValid() || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simular delay de autenticación
    setTimeout(() => {
      const username = this.username();
      const password = this.password();

      if (username === this.validCredentials.username && 
          password === this.validCredentials.password) {
        // Login exitoso
        this.loginSuccess.emit(username);
      } else {
        // Login fallido
        this.errorMessage.set('❌ Credenciales incorrectas. Intenta con admin/123456');
      }
      
      this.isLoading.set(false);
    }, 1500);
  }
}