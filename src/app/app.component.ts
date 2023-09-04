import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

import { Paciente } from './model/paciente.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'receituario';
  form: FormGroup;
  loading: boolean = false;
  pdf: boolean = false;
  content: boolean = false;
  skeleton: boolean = false;
  paciente: Paciente | undefined;
  name: string | undefined;
  data: string | undefined;
  img: string[] = [];
  date: Date | undefined;
  color: String = '#c5ebff';
  constructor(
    private msgService: MessageService
  ) {
    this.form = this.setForm();
  }

  ngOnInit(): void {

  }

  setForm(): FormGroup {
    return new FormGroup({
      dados: new FormControl(null),
      date: new FormControl(null),
      img: new FormControl(null),
      nome: new FormControl(null),
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      setTimeout(() => {
        this.loading = false;
        this.skeleton = true;
        this.pdf = true;
        this.loadData(this.form.value);
      }, 2000);
    }
  }

  loadData(p: Paciente) {
    if (p) {
      this.name = p.nome;
      this.data = p.dados;
      this.date = p.date;
      this.img = p.img;
      // this.pdf = p.dados;
      this.color = p.img[0] === 'happy.jpeg' ? '#c5ebff' : p.img[0] === 'scared.png' ? '#bef2ff' : '#c5ebff';
      setTimeout(() => {
        this.form.patchValue({
          dados: null,
          nome: null,
          img: null
        })
        this.skeleton = false;
        this.content = true;
      }, 1000)
    }
  }


  msgShow() {
    this.msgService.add({ severity: 'error', summary: 'Erro', detail: 'Ainda em Desenvolvimento' });
  }
  generatePDF() {
    const element = document.getElementById('result');
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF.jsPDF('landscape');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const width = (pageWidth * 0.5);
        const height = (pageHeight * 1.0);

        console.log(width, height);
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        // pdf.save('documento.pdf');
        pdf.output('dataurlnewwindow');


      });
    }
  }
}
