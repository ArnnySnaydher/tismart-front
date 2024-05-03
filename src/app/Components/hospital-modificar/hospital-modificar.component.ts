import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf,} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hospital-modificar',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './hospital-modificar.component.html',
  styleUrl: './hospital-modificar.component.css'
})
export class HospitalModificarComponent {

  hospital = {
    idHospital:'',
    idDistrito: '',
    nombre: '',
    antiguedad: '',
    area: '',
    idSede: '',
    idGerente: '',
    idCondicion: ''
  }
  constructor(private http: HttpClient){}

  grabar() {
    const idHospital = (document.getElementById('idHospital') as HTMLInputElement).value;
    const idDistrito = (document.getElementById('idDistrito') as HTMLInputElement).value;
    const idGerente = (document.getElementById('IdGerente') as HTMLInputElement).value;
    const idSede = (document.getElementById('IdSede') as HTMLInputElement).value;
    const idCondicion = (document.getElementById('idCondicion') as HTMLInputElement).value;

    const url = `http://localhost:8090/api/hospital/sp/actualizar/${idHospital}`;

    const data = {
      idSede: +idSede, 
      idDistrito: +idDistrito,
      idGerente: +idGerente, 
      idCondicion: +idCondicion
    };

    console.log(data)

    this.http.put(url, data)
      .subscribe(response => {
        console.log('Éxito:', response);
        
      }, error => {
        console.error('Error:', error);
   
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


}