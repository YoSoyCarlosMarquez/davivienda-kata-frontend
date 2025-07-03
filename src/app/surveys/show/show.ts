import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SurveyModule } from "survey-angular-ui";
import { Model } from "survey-core";
import "survey-creator-core/survey-creator-core.i18n";
import 'survey-core/i18n/spanish';
import { ActivatedRoute } from '@angular/router';
import { Restclient } from '../../service/restclient';

@Component({
  selector: 'app-show',
  imports: [ SurveyModule ],
  templateUrl: './show.html',
  styleUrl: './show.scss'
})
export class Show implements OnInit, AfterViewInit {
  surveyModel!: Model;

  @ViewChild('surveyIdInput') surveyIdInput!: ElementRef;

  constructor(private restClient: Restclient, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      const surveyId = params['surveyid'];
      if (surveyId && this.surveyIdInput) {
        this.surveyIdInput.nativeElement.value = surveyId;
        this.getSurvey(surveyId);
      }
    });
  }

  surveyComplete (survey: any) {
    const actualId = this.surveyIdInput.nativeElement.value;
      this.restClient.post({id: actualId, survey: JSON.stringify(survey)}, '/survey/answer').subscribe({
        next: (res) => {
          const id = res.data?.body?.data?.id;
          if (id && this.surveyIdInput && actualId == '') {
            this.surveyIdInput.nativeElement.value = id;
          }
        },
        error: (err) => {
        }
      });
  }

  ngOnInit() {
    const survey = new Model(window.localStorage.getItem("survey-json"));
    survey.onComplete.add(this.surveyComplete);
    survey.locale = 'es';
  }

  getSurvey(survey: String) {
    this.restClient.get(`/survey/get/${survey}`).subscribe({
      next: (res) => {
        const surveyData = res.data.body.data.survey;
        const surveyJson = new Model(surveyData);
        surveyJson.locale = 'es';
        this.surveyModel = surveyJson;
      },
      error: (err) => {
      }
    });
  }

}
