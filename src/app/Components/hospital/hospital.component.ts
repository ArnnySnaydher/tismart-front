import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-hospital',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.css'
})
export class HospitalComponent {

  modoModificar: boolean = false;
  
  // hospitales: any[] = [];

  hospital = {
    idHospital:'',
    idDistrito: '',
    nombre: '',
    antiguedad: '',
    area: '',
    idSede: '',
    idGerente: '',
    idCondicion: '',
    // fecha: ''
  };
  constructor(private http: HttpClient , private route:ActivatedRoute){ 
    this.route.url.subscribe(url =>{
      this.modoModificar= url[0].path ==='modificar'
    })
  }
  grabar() {

      this.http.post('http://localhost:8090/api/hospital/sp/registrar', this.hospital).subscribe({
        next: (response) => {console.log('Hospital registrado con éxito', response)
        this.limpiar();
        },
        error: (error) => console.error('Error al registrar el hospital', error)
      });

    }


  limpiar() {
    this.hospital = {
      idHospital:'',
      idDistrito: '',
      nombre: '',
      antiguedad: '',
      area: '',
      idSede: '',
      idGerente: '',
      idCondicion: ''
    };
  }

  Buscar(){
    console.log("buenas")
  }
}
