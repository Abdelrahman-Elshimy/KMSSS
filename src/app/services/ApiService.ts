import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://e5z0fylv.api.sanity.io/v2022-03-07/data/query/test';
  private apimutateUrl = "https://e5z0fylv.api.sanity.io/v1/data/mutate/test";
  private token = 'skiSrdmxtyPx84y3sFeQRjj57py39R6wqvO36oj4TVVqg67vT5JQMJfGaS08E94Yt9wnx84B1suIbxmbzr9g7JXTBk4yGdidK9WZFZla7sl7RQ9zJGo1mMD6IkKh9XnLMrJYGwKKlpwM9xKdBHd9UekbtvSn6IxuVZsucf20S5QtPHqgXykl';

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  // User Management Apis

  loginByUsername(username: string, password: string): Observable<any> {
    const query = `*[_type == 'user' && username == '${username}' && password == '${password}']`;
    return this.post<any>(this.apiUrl, { query: query });
  }

  loginByEmail(username: string, password: string): Observable<any> {
    const query = `*[_type == 'user' && email == '${username}' && password == '${password}']`;
    return this.post<any>(this.apiUrl, { query: query });
  }


  Register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const requestBody = {
      mutations: [
        {
          create: {
            _type: "user",
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password
          }
        }
      ]
    };

    return this.http.post<any>(this.apimutateUrl, requestBody, { headers: headers });
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
    const query = `*[_type == 'category'] {_id,titleAr,titleEn,'imageUrl': image.asset->url, 'tools': *[_type == 'AITool' && references(^._id)]{title, titleAr, 'imageUrl':mainImage.asset->url, bodyAr, bodyEn,price,externalUrl, 'tags': tags[]->{titleAr, titleEn}}}`;
    return this.post<any>(this.apiUrl, { query: query });

  }



  fetchAllNews(){
    const query = `*[_type == 'new']{_id, title, titleAr, descriptionAr, descriptionEn, 'imageUrl':mainImage.asset->url}`;
    return this.post<any>(this.apiUrl, { query: query });

  }

}
