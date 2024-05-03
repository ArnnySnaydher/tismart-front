import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-hospital-listar',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './hospital-listar.component.html',
  styleUrl: './hospital-listar.component.css'
})
export class HospitalListarComponent implements OnInit {
  hospitales: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerHospitales();
  }

  obtenerHospitales(): void {
    this.http.get<any[]>('http://localhost:8090/api/hospital/sp/listar')
      .subscribe(data => {
        this.hospitales = data;
      });
  }

  eliminarHospital(idHospital: number): void {
    this.http.delete(`http://localhost:8090/api/hospital/sp/${idHospital}`)
      .subscribe(() => {
        console.log('Hospital eliminado:', idHospital);
         // Actualizar la lista después de eliminar
         this.hospitales = this.hospitales.filter(hospital => hospital.idHospital !== idHospital);
      }, error => {
         // Actualizar la lista después de eliminar
         this.hospitales = this.hospitales.filter(hospital => hospital.idHospital !== idHospital);
        console.error('Error al eliminar hospital:', error);

      });
  }

  editarHospital(idHospital:any){
    console.log("editar",idHospital);
  }

}
