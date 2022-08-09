import { environment } from 'src/environments/environment';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})

export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService, private loadingController: LoadingController) {

  }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });

    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(res => {
      loading.dismiss();
      // this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

}
