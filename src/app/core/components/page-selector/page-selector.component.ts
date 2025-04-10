import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'peps-page-selector',
	imports: [
		NgClass
	],
  templateUrl: './page-selector.component.html',
})
export class PageSelectorComponent {
	@Input() page: number = 0;
	@Input() totalPages: number = 1;

	@Output() pageChange = new EventEmitter<number>();

	prev() {
		if (this.page > 0) {
			this.pageChange.emit(this.page - 1);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	next() {
		if (this.page + 1 < this.totalPages) {
			this.pageChange.emit(this.page + 1);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
	changePage(page: number) {
		if (page >= 0 && page < this.totalPages) {
			this.pageChange.emit(page);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	pageNumbers(): number[] {
		const pages: number[] = [];
		const maxPagesAround = 1; // 1 before and 1 after
		const showPages = 3; // 3 pages to show around the current page

		if (this.totalPages <= showPages + 2) {
			// if total pages are less than or equal to 5, show all pages
			for (let i = 0; i < this.totalPages; i++) {
				pages.push(i);
			}
		} else {
			const start = Math.max(1, this.page - maxPagesAround);
			const end = Math.min(this.totalPages - 2, this.page + maxPagesAround);

			pages.push(0); // always show first page

			if (start > 1) {
				pages.push(-1);
			}

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (end < this.totalPages - 2) {
				pages.push(-1);
			}

			pages.push(this.totalPages - 1); // always show last page
		}

		return pages;
	}


}
