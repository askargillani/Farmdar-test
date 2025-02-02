import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../blogs.service';
import { catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  dataFromServer$!: Observable<any>;
  error = false;
  private destroy$ = new Subject<void>();

  constructor(private blogsService: BlogsService) {
    this.getBlogs();
  }

  getBlogs() {
    this.dataFromServer$ = this.blogsService.getBlogs().pipe(
      takeUntil(this.destroy$),
      map(response => {
        this.error = false;
        return {
          ...response,
          posts: response.posts
            .filter((data: any) => (data.reactions.likes + data.reactions.dislikes) > 2)
            .sort((a: any, b: any) => 
              (b.reactions.likes + b.reactions.dislikes) - (a.reactions.likes + a.reactions.dislikes)
            )
        };
      }),
      catchError(err => {
        this.error = true;
        return of(null);
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
