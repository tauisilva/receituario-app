import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    AvatarModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    SkeletonModule

  ]
})
export class PrimeModule { }
