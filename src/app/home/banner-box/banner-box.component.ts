import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserSessionService } from '../../services/UserSessionService';
import { ApiService } from '../../services/ApiService';
import { concatMap, map, reduce } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { AIToolSearchResponse } from '../../models/AIToolSearchResponse';


@Component({
  selector: 'app-banner-box',
  templateUrl: './banner-box.component.html',
  styleUrl: './banner-box.component.css'
})
export class BannerBoxComponent {
  keyword: string = '';
  listOfAiTools: AIToolSearchResponse[] = [];

constructor(
  private apiService: ApiService,
  private userSessionService: UserSessionService,
  private router: Router,
  private messageService: MessageService) {
}



onSearch() {

  this.listOfAiTools = [];
  if(this.keyword == null || this.keyword == "" || this.keyword == " ") {
    this.listOfAiTools = [];
  }
  else {
    this.apiService.searchInAITools(this.keyword).subscribe((response: any) => {
      if (response.result && Array.isArray(response.result) && response.result.length > 0) {
        console.log(response.result);

        // Chain HTTP requests using concatMap
        from(response.result).pipe(
          concatMap((element: any) => {
            return this.fetchImage(element.mainImage.asset._ref).pipe(
              map((imageUrl: string) => {
                var item: AIToolSearchResponse = {
                  _id: element._id,
                  titleAr: element.titleAr,
                  titleEn: element.title,
                  image: imageUrl
                };
                this.listOfAiTools.push(item);
              })
            );
          }),
          reduce(() => {})
        ).subscribe(() => {
          console.log(this.listOfAiTools); // Contains list of AIToolSearchResponse objects
        });
      }
    }, error => {
      console.error('An error occurred during search:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again later.' });
    });
  }
}

fetchImage(imageUrl: string): Observable<string> {
  return this.apiService.fetchImageUrl(imageUrl).pipe(
    map((res: any) => {
      const asset = res.result[0];
      console.log(asset);
      return asset.url;
    })
  );
}


}
