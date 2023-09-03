import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Paciente } from './model/paciente.model';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'receituario';
  form: FormGroup;
  form2: FormGroup;
  loading: boolean = false;
  pdf: boolean = false;
  skeleton: boolean = false;
  paciente: Paciente | undefined;
  name: string | undefined;
  data: string | undefined;
  constructor() {
    this.form = this.setForm();
    this.form2 = this.setForm();
  }

  ngOnInit(): void {

  }

  setForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl(null),
      dados: new FormControl(null)
    });
  }
  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      setTimeout(() => {
        console.log(this.form.value);
        this.loading = false;
        this.skeleton = true;
        this.pdf =true;
        this.loadData(this.form.value);
      }, 2000);
    }
  }

  loadData(p: Paciente) {
    console.table(p); // Exibir os valores do form no console

    if (p) {
      this.name = p.nome;
      this.data = p.dados;
      this.skeleton = false;
      // this.pdf = p.dados;
    }
  }
  generatePDF() {
    const element = document.getElementById('result'); // Substitua 'result' pelo ID da sua div

    if (element) {
      const pdfOptions = {
        filename: 'documento.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };

      // Personalize o CSS da div para preencher a página com a cor de fundo
      element.style.backgroundColor = '#c5ebff'; // Substitua pela cor desejada

      html2canvas(element, pdfOptions.html2canvas).then(canvas => {
        const pdf = new jsPDF.jsPDF('landscape');
        const imgData = canvas.toDataURL('image/jpeg', pdfOptions.image.quality);

        const pdfWidth: number = (canvas.height * 0.5); // Utilize 50% da altura da página
        const pdfHeight: number = canvas.height; // Utilize 100% da altura da página

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Carregue a imagem dentro do PDF
        const img = new Image();
        img.src = 'assets/img/happy.jpeg'; // Substitua pelo caminho correto da imagem
        img.onload = () => {
          pdf.addImage(img, 'JPEG', 10, 10, 50, 50); // Ajuste a posição e o tamanho conforme necessário

          const blob = pdf.output('blob');
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');

          // Restaure o CSS da div após a geração do PDF
          element.style.backgroundColor = 'transparent';
        };
      });
    }
  }




}
