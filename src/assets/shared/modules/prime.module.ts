import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';

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
    EditorModule,
    InputTextModule,
    InputTextareaModule,
    SkeletonModule,
    ToastModule

  ],
  providers: [
    MessageService

  ]
})
export class PrimeModule { }
