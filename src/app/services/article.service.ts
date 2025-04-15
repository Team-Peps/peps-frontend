import { environment } from "../../environment/environment";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Article, ArticleTiny} from '../models/article';
import {Page} from '../models/page';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(
		private http: HttpClient
	) {}

	@Cacheable({
		maxAge: 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'threeRecentArticles',
	})
	getThreeRecentArticles(): Observable<ArticleTiny[]> {
		return this.http.get<ArticleTiny[]>(`${environment.backendUrl}/article/recent`);
	}

	@Cacheable({
		maxAge: 24 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'allArticles',
		maxCacheCount: 20
	})
	getArticles(page: number, filter: string[]): Observable<Page<ArticleTiny>> {
		return this.http.get<Page<ArticleTiny>>(`${environment.backendUrl}/article?page=${page}&filter=${filter}`);
	}

	@Cacheable({
		maxAge: 24 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'article',
		maxCacheCount: 20
	})
	getArticle(articleId: string): Observable<Article> {
		return this.http.get<Article>(`${environment.backendUrl}/article/${articleId}`);
	}
}
