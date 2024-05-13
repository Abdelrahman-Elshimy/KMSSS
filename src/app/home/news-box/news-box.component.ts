import { MessageService } from 'primeng/api';
import { NewsDTO } from '../../models/NewsModelDTO';
import { ApiService } from './../../services/ApiService';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-box',
  templateUrl: './news-box.component.html',
  styleUrl: './news-box.component.css'
})
export class NewsBoxComponent implements OnInit{
  listOfAiNews: NewsDTO[]= [];
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private messageService: MessageService,){
    this.listOfAiNews = [];
  }
  ngOnInit(): void {
    this.apiService.fetchAllNews().subscribe((response: any) => {
      if (response.result && Array.isArray(response.result) && response.result.length > 0) {
        console.log(response.result)
        response.result.forEach((element:any) => {
          var item: NewsDTO = {
            id: element._id,
            titleAr: element.titleAr,
            title: element.title,
            descriptionAr: element.descriptionAr,
            descriptionEn: element.descriptionEn,
            imageUrl: element.imageUrl,
          };
          this.listOfAiNews.push(item);

        });
        this.cdr.detectChanges();

        console.log(this.listOfAiNews)
      }
    }, error => {
      console.error('An error occurred during search:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again later.' });
    });
  }


}
