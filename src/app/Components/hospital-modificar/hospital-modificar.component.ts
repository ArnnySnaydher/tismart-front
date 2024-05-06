import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NgIf,} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-modificar',
  standalone: true,
  imports: [NgIf,FormsModule,ReactiveFormsModule],
  templateUrl: './hospital-modificar.component.html',
  styleUrl: './hospital-modificar.component.css'
})
export class HospitalModificarComponent implements OnInit{

  hospitalEncontrado: boolean = false;

  hospitalForm!: FormGroup;
  hospitales: any[] = [];


  constructor(private http: HttpClient,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
  }

  
  initForm(): void {
    this.hospitalForm = this.formBuilder.group({
      idHospital: ['', [Validators.required, Validators.min(1)]],
      idDistrito: [{ value: '', disabled: true },Validators.required],
      nombre: [{ value: '', disabled: true },Validators.required],
      idSede: [{ value: '', disabled: true },Validators.required ],
      idGerente: [{ value: '', disabled: true },Validators.required],
      idCondicion: [ { value: '', disabled: true },Validators.required]
    });
  }

  buscar() {

    
    // Obtiene el valor del campo idHospital del formulario
    const idHospital = this.hospitalForm.get('idHospital')?.value;
  
    // Realiza la solicitud HTTP para obtener los datos de los hospitales
    this.http.get<any[]>('http://localhost:8090/tismart/obtained/oracle/obtener')
      .subscribe(data => {
        // Almacena los datos de los hospitales obtenidos en la variable this.hospitales
        this.hospitales = data;
    
        // Busca si el idHospital está presente en el array de objetos this.hospitales
        const hospitalEncontrado = this.hospitales.find(hospital => hospital.idHospital === idHospital);

        // Verifica si se encontró el hospital
        if (hospitalEncontrado) {
          this.hospitalEncontrado = true;
          this.habilitarCampos();
          // Asigna los datos del hospital encontrado a los campos del formulario utilizando el método patchValue()
          this.hospitalForm.patchValue({
            idDistrito: hospitalEncontrado.idDistrito,
            nombre: hospitalEncontrado.nombre,
            idSede: hospitalEncontrado.idSede,
            idGerente: hospitalEncontrado.idGerente,
            idCondicion: hospitalEncontrado.idCondicion
          });
          

        } else {
          this.hospitalEncontrado = false;
          this.desactivarCampos();
          // Limpia los campos del formulario
          // this.hospitalForm.disable();
          this.limpiar();
        }
        


      });

      
  }

  habilitarCampos() {
    this.hospitalForm.get('idDistrito')?.enable();
    this.hospitalForm.get('idSede')?.enable();
    this.hospitalForm.get('idGerente')?.enable();
    this.hospitalForm.get('idCondicion')?.enable();
  }

  desactivarCampos() {
    this.hospitalForm.get('idDistrito')?.disable();
    this.hospitalForm.get('nombre')?.disable();
    this.hospitalForm.get('idSede')?.disable();
    this.hospitalForm.get('idGerente')?.disable();
    this.hospitalForm.get('idCondicion')?.disable();
  }
  

  modificar() {
    if (this.hospitalForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres modificar este hospital?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const { idHospital, ...data } = this.hospitalForm.value;
          this.actualizarHospital(idHospital, data);
        }
      });
    } else {
      console.log('Formulario inválido. Revise los campos.');
    }
  }
  
  actualizarHospital(idHospital: number, data: any) {
    const url = `http://localhost:8090/tismart/updated/oracle/${idHospital}`;
  
    this.http.put(url, data).subscribe(
      response => {
        console.log('Éxito:', response);
        Swal.fire('Éxito', 'Hospital actualizado correctamente', 'success');
      },
      error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al actualizar el hospital', 'error');
      }
    );
  }
  

  limpiar() {
    this.hospitalForm.reset();
  }


}