import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogsService } from './blogs.service';
import { catchError, map, Observable, of } from 'rxjs';
import { MapService } from './map.service';
import { MapsComponent } from './maps/maps.component';

export enum Layout {
  BLOG,
  MAP
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BlogComponent, MapsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  layouts = Layout
  layout = Layout.BLOG

  constructor(private blogsService: BlogsService, private mapService: MapService) {
 
  }

  ChangeLayout() {
    this.layout = this.layout == Layout.BLOG ? Layout.MAP : Layout.BLOG;
  }

}
