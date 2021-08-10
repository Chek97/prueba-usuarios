import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  loading: boolean = true;

  displayedColumns: string[] = ['#', 'nombres', 'apellidos', 'edad', 'No_identificacion', 'correo', 'opciones'];
  dataSource: any;

  constructor(private _userService: UserService, private _router: Router, public dialog: MatDialog) { 
    this._userService.getUsers()
      .subscribe((resp: any) => {
        this.users = resp.personList;
        this.dataSource = this.users;    
        this.loading = false;
      });  
  }

  ngOnInit(): void {
  }

  redirect(info: string, id?: string){
    if(info === 'new'){
      this._router.navigate(['user']);
    }else if(info === 'edit'){
      this._router.navigate(['user', id]);
    }else{
      this._router.navigate(['dashboard'])
    }
  }

  delete(id: string){
    this._userService.deleteUser({identification_number: id})
      .subscribe(data => {
        console.log(data);
      });
  }

  openDialog(id: string){
    this.dialog.open(DialogComponent, {
      data: { id, title: 'Borrar Usuario', content: 'Esta seguro que desea borrar este usuario?', action: 'Borrar' }
    });  
  }

  openSuccess(info: any){
    this.dialog.open(DialogComponent, {
      data: { id: '', title: 'Borrar Usuario', content: 'Esta seguro que desea borrar este usuario?', action: 'Borrar' }
    });
  }

}
