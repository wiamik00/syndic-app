import { Component, ViewChild } from '@angular/core';
import { ResidentService } from '../services/resident';
import { Router } from '@angular/router';
import { Resident } from '../models/resident';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-residents',
  standalone: false,
  templateUrl: './residents.html',
  styleUrl: './residents.css',
})
export class Residents {

  public residents!: Resident[];
  public dataSource!: MatTableDataSource<Resident>;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'cin', 'phone', 'email', 'actions'];
  public keyword: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private residentService: ResidentService,
    private router: Router) { }

  ngOnInit(): void {    
    this.residentService.getAllResidents().subscribe({
      next: (data: Resident[]) => {
        this.residents = data;
        this.dataSource = new MatTableDataSource(this.residents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching residents:', err);
      }
    });
  }

  addResident() {
    this.router.navigateByUrl(`/admin/add-resident`);
  }

  editResident(id: number) {
    this.router.navigateByUrl(`/admin/edit-resident/${id}`);
  }

    deleteResident(residentId: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you want to delete this resident ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.residentService.deleteResident(residentId).subscribe({
          next: () => {
            Swal.fire("Deleted", 'The resident was deleted successfully', 'success');

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/residents']);
            });
          },

          error: () => {
            Swal.fire('Error', 'Error deleting resident', 'error');
          }
        });
      }
    });
  }

  searchResidents(): void {
    this.residentService.searchResidents(this.keyword).subscribe({
      next: (data: Resident[]) => {
        this.residents = data;
        this.dataSource = new MatTableDataSource(this.residents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error searching residents:', err);
      }
    });
  }
}
