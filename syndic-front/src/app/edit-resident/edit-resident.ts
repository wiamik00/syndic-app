import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResidentService } from '../services/resident';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-resident',
  standalone: false,
  templateUrl: './edit-resident.html',
  styleUrl: './edit-resident.css',
})
export class EditResident {
  residentFormGroup!: FormGroup;
  residentId!: number;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private residentService: ResidentService) {

  }
  ngOnInit() {
    this.residentFormGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      cin: [''],
      phone: [''],
      email: ['']
    });

    this.residentId = this.activatedRoute.snapshot.params['id'];
    this.residentService.getResidentById(this.residentId).subscribe({
      next: (data) => {
        this.residentFormGroup = this.fb.group({
          firstName: this.fb.control(data.firstName, [Validators.required]),
          lastName: this.fb.control(data.lastName, [Validators.required]),
          cin: this.fb.control(data.cin, [Validators.required]),
          phone: this.fb.control(data.phone, [Validators.required]),
          email: this.fb.control(data.email),
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  updateResident() {
    let resident = this.residentFormGroup.value;
    this.residentService.updateResident(resident, this.residentId).subscribe({
      next: data => {
        Swal.fire({
          title: "Resident updated successfully",
          icon: "success",
          timerProgressBar: true,
        });
        this.goBack();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
