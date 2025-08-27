import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface TimeSlot {
  value: string;
  label: string;
  booked: boolean;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  timeSlots: TimeSlot[] = [];
  selectedSlot: TimeSlot | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeTimeSlots();
    this.setMinDate();
  }

  private initializeTimeSlots(): void {
    const slots = [
      { value: '06:00', label: '6:00 AM - 7:00 AM', booked: false },
      { value: '07:00', label: '7:00 AM - 8:00 AM', booked: false },
      { value: '08:00', label: '8:00 AM - 9:00 AM', booked: true },
      { value: '09:00', label: '9:00 AM - 10:00 AM', booked: false },
      { value: '10:00', label: '10:00 AM - 11:00 AM', booked: false },
      { value: '11:00', label: '11:00 AM - 12:00 PM', booked: false },
      { value: '12:00', label: '12:00 PM - 1:00 PM', booked: true },
      { value: '13:00', label: '1:00 PM - 2:00 PM', booked: false },
      { value: '14:00', label: '2:00 PM - 3:00 PM', booked: false },
      { value: '15:00', label: '3:00 PM - 4:00 PM', booked: false },
      { value: '16:00', label: '4:00 PM - 5:00 PM', booked: false },
      { value: '17:00', label: '5:00 PM - 6:00 PM', booked: true },
      { value: '18:00', label: '6:00 PM - 7:00 PM', booked: false },
      { value: '19:00', label: '7:00 PM - 8:00 PM', booked: false },
      { value: '20:00', label: '8:00 PM - 9:00 PM', booked: false },
      { value: '21:00', label: '9:00 PM - 10:00 PM', booked: false }
    ];
    this.timeSlots = slots;
  }

  private setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    // You can set this in the HTML template or programmatically
    // For now, we'll handle it in the template
  }

  selectSlot(slot: TimeSlot): void {
    if (!slot.booked) {
      this.selectedSlot = slot;
      this.bookingForm.patchValue({ time: slot.value });
    }
  }

  isSlotSelected(slot: TimeSlot): boolean {
    return this.selectedSlot?.value === slot.value;
  }

  getFieldError(fieldName: string): string | null {
    const field = this.bookingForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${this.capitalize(fieldName)} is required`;
      }
      if (field.errors?.['minlength']) {
        return `${this.capitalize(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors?.['pattern']) {
        return `Please enter a valid ${fieldName}`;
      }
    }
    return null;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  submit(): void {
    if (this.bookingForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      console.log('Booking submitted:', this.bookingForm.value);
      
      // In a real application, you would make an HTTP request here
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Booking confirmed successfully!');
        this.resetForm();
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.bookingForm.controls).forEach(key => {
        this.bookingForm.get(key)?.markAsTouched();
      });
    }
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  trackBySlotValue(index: number, slot: TimeSlot): string {
    return slot.value;
  }

  private resetForm(): void {
    this.bookingForm.reset();
    this.selectedSlot = null;
    // Update booked slots (in real app, this would come from the server)
    if (this.selectedSlot) {
      const slot = this.timeSlots.find(s => s.value === this.selectedSlot!.value);
      if (slot) {
        slot.booked = true;
      }
    }
  }
}