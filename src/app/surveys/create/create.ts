import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SurveyCreatorModel } from 'survey-creator-core';
import { SurveyCreatorModule } from 'survey-creator-angular';
import "survey-core/survey-core.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import "survey-creator-core/survey-creator-core.i18n";
import 'survey-core/i18n/spanish';
import { editorLocalization } from "survey-creator-core";
import { Restclient } from '../../service/restclient';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
editorLocalization.currentLocale = "es";

@Component({
  selector: 'app-create',
  imports: [SurveyCreatorModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create  implements OnInit, AfterViewInit {

  @ViewChild('surveyIdInput') surveyIdInput!: ElementRef;

  surveyCreatorModel!: SurveyCreatorModel;

  constructor(private restClient: Restclient, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      const surveyId = params['surveyid'];
      if (surveyId && this.surveyIdInput) {
        this.surveyIdInput.nativeElement.value = surveyId;
        this.getSurvey(surveyId);
      }
    });
  }
  
  ngOnInit() {
    const creator = new SurveyCreatorModel({
      autoSaveEnabled: false,
      collapseOnDrag: true,      
    });
    this.surveyCreatorModel = creator;
    this.surveyCreatorModel.saveSurveyFunc = (saveNo: number, callback: Function) => {
      window.localStorage.setItem("survey-json", creator.text);
      callback(saveNo, true);
      this.saveSurvey(creator.JSON);
    }    
  }

  saveSurvey(survey: String) {
      const actualId = this.surveyIdInput.nativeElement.value;
      this.restClient.post({id: actualId, survey: JSON.stringify(survey)}, '/survey/save').subscribe({
        next: (res) => {
          const id = res.data?.body?.data?.id;
          if (id && this.surveyIdInput && actualId == '') {
            this.surveyIdInput.nativeElement.value = id;
          }
          this.messageService.add({
            severity: 'success', // 'info' | 'warn' | 'error'
            summary: 'Yep!',
            detail: 'Encuesta guardada correctamente',
            life: 4000,
          });
        },
        error: (err) => {
        }
      });
  }

  getSurvey(survey: String) {
    this.restClient.get(`/survey/get/${survey}`).subscribe({
      next: (res) => {
        const surveyData = res.data.body.data.survey;
        this.surveyCreatorModel.JSON = JSON.parse(surveyData);        
      },
      error: (err) => {
      }
    });
  }

}

