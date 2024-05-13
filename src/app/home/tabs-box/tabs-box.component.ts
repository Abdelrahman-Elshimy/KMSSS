import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/ApiService';
import { UserSessionService } from '../../services/UserSessionService';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, concatMap, from, map, reduce } from 'rxjs';
import { CategoryTabDTO } from '../../models/CategoriesDTO';

@Component({
  selector: 'app-tabs-box',
  templateUrl: './tabs-box.component.html',
  styleUrl: './tabs-box.component.css'
})
export class TabsBoxComponent implements OnInit {
  listOfCategoriesAiTools: CategoryTabDTO[] = [];
  categories = null;
  constructor(
    private apiService: ApiService,
    private userSessionService: UserSessionService,
    private router: Router,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.apiService.fetchAllCategories().subscribe((response: any) => {
      if (response.result && Array.isArray(response.result) && response.result.length > 0) {
        console.log(response.result)
        response.result.forEach((element:any) => {
          var item: CategoryTabDTO = {
            id: element._id,
            titleAr: element.titleAr,
            titleEn: element.titleEn,
            image: element.imageUrl,
            AiTools : element.tools
          };
          this.listOfCategoriesAiTools.push(item);

        });
        this.cdr.detectChanges();

        console.log(this.listOfCategoriesAiTools)
      }
    }, error => {
      console.error('An error occurred during search:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again later.' });
    });
  }





}
