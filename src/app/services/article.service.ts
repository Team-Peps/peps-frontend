import { environment } from "../../environment/environment";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ArticleTiny} from '../models/article';
import {Page} from '../models/page';

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

	getArticles(page: number, filter: string[]): Observable<Page<ArticleTiny>> {
		return this.http.get<Page<ArticleTiny>>(`${environment.backendUrl}/article?page=${page}&filter=${filter}`);
	}
}
