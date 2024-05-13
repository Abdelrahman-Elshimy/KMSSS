import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://e5z0fylv.api.sanity.io/v2022-03-07/data/query/test';

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  // User Management Apis

  login(username: string, password: string): Observable<any> {
    const query = `*[_type == 'user' && username == '${username}' && password == '${password}']`;
    return this.post<any>(this.apiUrl, { query: query });
  }


  searchInAITools(searchText: string) :Observable<any> {
    const query = `*[_type == 'AITool' && title match '*${searchText}*']`;
    return this.post<any>(this.apiUrl, { query: query });
  }

  fetchImageUrl(assetId: string) : Observable<any> {
    const query = `*[_id == '${assetId}']`;
    return this.post<any>(this.apiUrl, { query: query });
  }



  fetchAllCategories(){
    const query = `*[_type == 'category'] {_id,titleAr,titleEn,'imageUrl': image._upload.previewImage, 'tools': *[_type == 'AITool' && references(^._id)]{title, titleAr, 'imageUrl':mainImage.asset->url, bodyAr, bodyEn,price,externalUrl}}`;
    return this.post<any>(this.apiUrl, { query: query });

  }



  fetchAllNews(){
    const query = `*[_type == 'new']{_id, title, titleAr, descriptionAr, descriptionEn, 'imageUrl':mainImage.asset->url}`;
    return this.post<any>(this.apiUrl, { query: query });

  }

}
