import { Component } from '@angular/core';
import { Restclient } from '../../service/restclient';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface SurveyRecord {
  id: number;
  userId: number;
  survey: string;
}

interface TableSurvey {
  id: number;
  userId: number;
  title: String;
  questions: number;
  status: 'Cerrado' | 'Público';
}

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  surveys: TableSurvey[] = [];

  constructor(private restClient: Restclient, private router: Router) {
    this.getSurveys();
  }

  getSurveys() {
    this.restClient.get('/survey/get-all').subscribe({
      next: (res) => {
        const rawData: SurveyRecord[] = res.data.body.data;
        this.surveys = rawData.map((item) => {
          const parsedSurvey = JSON.parse(item.survey);
          const questions = parsedSurvey.pages?.[0]?.elements?.length ?? 0;
          const title = parsedSurvey.title ?? 'Sin título';

          return {
            id: item.id,
            userId: item.userId,
            title,
            questions,
            status: 'Cerrado' // Puedes cambiarlo luego según lógica real
          };
        });
      },
      error: (err) => {
      }
    });
  }

  delete(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) {
      return;
    }
  
    this.restClient.delete(`/survey/delete/${id}`).subscribe({
      next: () => {
        this.surveys = this.surveys.filter(s => s.id !== id);
      },
      error: (err) => {
        console.error('Error eliminando encuesta', err);
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/home/create-survey'], {
      queryParams: { surveyid: id }
    });
  }

  addSurvey(): void {
    this.router.navigate(['/home/create-survey']);
  }

}
