import { Routes, RouterModule} from '@angular/router';
import { HospitalComponent } from './Components/hospital/hospital.component';
import { HospitalListarComponent } from './Components/hospital-listar/hospital-listar.component';
import { HospitalModificarComponent } from './Components/hospital-modificar/hospital-modificar.component';

export const routes: Routes = [

    {
        path:'ingresar', component:HospitalComponent
    },
    // {
    //     path:'modificar',component:HospitalComponent
    // },
    {
        path:'eliminar',component:HospitalListarComponent
    },
    {
        path:'buscar',component:HospitalModificarComponent
    }
];
