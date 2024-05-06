import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import Swal from 'sweetalert2';

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
    this.http.get<any[]>('http://localhost:8090/tismart/obtained/oracle/obtener')
      .subscribe(data => {
        this.hospitales = data;
      });
  }

  eliminarHospital(idHospital: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este hospital?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8090/tismart/removed/oracle/${idHospital}`)
          .subscribe(() => {
            console.log('Hospital eliminado:', idHospital);
            this.actualizarListaHospitales(idHospital);
            Swal.fire('¡Eliminado!', 'El hospital ha sido eliminado.', 'success');
          }, error => {
            console.error('Error al eliminar hospital:', error);
            Swal.fire('¡Error!', 'Hubo un problema al eliminar el hospital.', 'error');
          });
      }
    });
  }
  
  actualizarListaHospitales(idHospital: number): void {
    this.hospitales = this.hospitales.filter(hospital => hospital.idHospital !== idHospital);
  }

  editarHospital(idHospital:any){
    console.log("editar",idHospital);
  }

}
