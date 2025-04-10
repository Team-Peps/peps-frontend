import {ArticleType} from './articleType';

export interface ArticleTiny {
	id:string;
	title:string;
	thumbnailImageKey:string;
	shortContent:string;
}

export interface Article {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	thumbnailImageKey: string;
	imageKey: string;
	articleType: ArticleType;
}
