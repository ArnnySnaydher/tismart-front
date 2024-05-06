import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder,FormGroup,Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  standalone: true,
  imports: [FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.css'
})
export class HospitalComponent implements OnInit {

  hospitalForm!: FormGroup;

  constructor(
    private http: HttpClient , 
    private route:ActivatedRoute , 
    private formBuilder: FormBuilder){ }


  ngOnInit(): void {
    this.initForm();
  }

  

  initForm(): void {
    this.hospitalForm = this.formBuilder.group({
      idDistrito: ['',Validators.required],
      nombre: ['', Validators.required],
      antiguedad: ['',Validators.required],
      area: ['',Validators.required],
      idSede: ['',Validators.required],
      idGerente: ['',Validators.required],
      idCondicion: ['',Validators.required]
    });
  }

  grabar() {

    // this.hospitalForm.markAllAsTouched();
    if (this.hospitalForm.valid) {
    this.http.post('http://localhost:8090/tismart/registered/oracle/hospital', this.hospitalForm.value)
    .subscribe({
      next: (response) => {
        console.log('Hospital registrado con éxito ... !', response);

        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Hospital registrado',
          text: 'El hospital se ha registrado correctamente.'
        });
        this.limpiar();
      },
      error: (error) => {
        console.error('Error al registrar el hospital ... !', error);
      }
    });

    }else {
      console.log('El formulario no es válido. No se puede enviar.');
      console.log(this.hospitalForm.value)
    }
  }
  limpiar() {
    this.hospitalForm.reset();
  }

  Buscar(){

  }

}
