import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    SkeletonModule

  ]
})
export class PrimeModule { }
