import { environment } from "../../environment/environment";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ArticleTiny} from '../models/article';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(
		private http: HttpClient
	) {}

	getThreeRecentArticles(): Observable<ArticleTiny[]> {
		return this.http.get<ArticleTiny[]>(`${environment.backendUrl}/article/recent`);
	}
}
