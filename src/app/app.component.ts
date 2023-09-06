import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

import { Paciente } from './model/paciente.model';

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
  blockedDocument: boolean = false;
  constructor(
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
        const now = new Date();
        this.loading = false;
        this.skeleton = true;
        this.form.value.date = now.toLocaleDateString();
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


  // msgShow() {
  //   this.msgService.add({ severity: 'error', summary: 'Erro', detail: 'Ainda em Desenvolvimento' });
  // }
  // generatePDF() {
  //   this.loading = true;
  //   const a4 = document.getElementById('a4');
  //   this.blockedDocument = true;
  //   if (a4) {
  //     a4.style.display = 'flex';
  //     const element = document.getElementById('result');
  //     if (element) {
  //       html2canvas(element).then((canvas) => {
  //         const imgData = canvas.toDataURL('image/png');
  //         const pdf = new jsPDF.jsPDF('landscape');

  //         const pageWidth = pdf.internal.pageSize.getWidth();
  //         const pageHeight = pdf.internal.pageSize.getHeight();
  //         const width = (pageWidth * 0.5);
  //         const height = (pageHeight * 1.0);
  //         // const width = element.offsetWidth;
  //         // const height = element.offsetHeight;

  //         console.log(width, height);
  //         pdf.addImage(imgData, 'PNG', 0, 0, width, height);


  //         // pdf.output('dataurlnewwindow');
  //         a4.style.display = 'none';
  //         // pdf.save('documento.pdf');
  //         window.open(pdf.output('bloburl'))
  //         this.blockedDocument = false;
  //         this.loading = false;


  //       });
  //     }
  //   }
  // }
  generatePDF() {
    this.loading = true;
    const a4 = document.getElementById('a4');
    this.blockedDocument = true;

    if (a4) {
      a4.style.display = 'flex';
      const element = document.getElementById('result');

      if (element) {
        const pdf = new jsPDF.jsPDF('landscape');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const width = (pageWidth * 0.5);
        const height = (pageHeight * 1.0);

        // Aumente a qualidade do DPI definindo uma resolução mais alta
        const dpi = 300; // Escolha a resolução desejada (exemplo: 300 DPI)
        const scaleBy = dpi / 96; // 96 é a resolução padrão do navegador

        // Redimensione o canvas para a resolução desejada
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(element.offsetWidth * scaleBy);
        canvas.height = Math.floor(element.offsetHeight * scaleBy);

        html2canvas(element, { scale: scaleBy }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png', 1.0); // Defina a qualidade máxima (1.0)

          pdf.addImage(imgData, 'PNG', 0, 0, width, height);

          a4.style.display = 'none';

          // Abra o PDF em uma nova janela/modal
          const pdfBlob = pdf.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, '_blank');

          this.blockedDocument = false;
          this.loading = false;
        });
      }
    }
  }

}
