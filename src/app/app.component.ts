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
  // generatePDF() {
  //   const element = document.getElementById('result'); // Substitua 'result' pelo ID da sua div

  //   if (element) {
  //     const pdfOptions = {
  //       filename: 'documento.pdf',
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  //     };

  //     html2canvas(element, pdfOptions.html2canvas).then(canvas => {
  //       const pdf = new jsPDF.jsPDF();
  //       const imgData = canvas.toDataURL('image/jpeg', pdfOptions.image.quality);

  //       const pdfWidth: number = canvas.width
  //       const pdfHeight: number = canvas.height;
  //       const xPosition = pdf.internal.pageSize.getWidth() - pdfWidth - 10; // 10 pontos de margem à direita
  //       const yPosition = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2; // Centraliza verticalmente
  //       pdf.addImage(imgData, 'JPEG', xPosition, yPosition, pdfWidth, pdfHeight);


  //       // Carregue a imagem dentro do PDF
  //       const img = new Image();
  //       img.src = 'assets/img/happy.jpeg'; // Substitua pelo caminho correto da imagem
  //       img.onload = () => {
  //         const imageWidth = pdfWidth * 0.5; // Ajuste a largura da imagem como necessário
  //         const imageHeight = (imageWidth * img.height) / img.width; // Mantém a proporção da imagem
  //         pdf.addImage(img, 'JPEG', 10, 10, imageWidth, imageHeight); // Ajuste a posição e o tamanho conforme necessário

  //         const blob = pdf.output('blob');
  //         const url = URL.createObjectURL(blob);
  //         window.open(url, '_blank');
  //       };
  //     });
  //   }
  // }
  msgShow() {
    this.msgService.add({ severity: 'error', summary: 'Erro', detail: 'Ainda em Desenvolvimento' });
  }
}
