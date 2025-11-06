import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidentService } from '../services/resident';
import { ActivatedRoute } from '@angular/router';
import { Resident } from '../models/resident';
import Swal from 'sweetalert2';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-resident',
  standalone: false,
  templateUrl: './add-resident.html',
  styleUrl: './add-resident.css',
})
export class AddResident {
  residentFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,
              private residentService: ResidentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.residentFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['']
    });
  }

  saveResident() {
    const resident: Resident = {
      id:this.residentFormGroup.value.id,
      firstName: this.residentFormGroup.value.firstName,
      lastName: this.residentFormGroup.value.lastName,
      cin: this.residentFormGroup.value.cin,
      phone: this.residentFormGroup.value.phone,
      email: this.residentFormGroup.value.email
    };

    this.residentService.saveResident(resident).subscribe({
      next: data => {
        Swal.fire({
          title: "Resident added successfully",
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
