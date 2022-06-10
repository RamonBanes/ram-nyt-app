import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from './movie';

const API_KEY = 'rxNgvQI6FFXNAGKZI64DqzgPkvZgtVGN';
const API_URL = 'https://api.nytimes.com/svc/movies/v2/';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  loader = true;
  movies  : Movie[] = []

  constructor(private movieService: MovieService,
    private http: HttpClient) { }

  getCriticPicks(pick: string) {
    return this.http.get(`${API_URL}reviews/picks.json?api-key=${API_KEY}`);
  }

  searchReviews(){
    return this.http.get(`${API_URL}critics/all.json?api-key=${API_KEY}`);
  }

  ngOnInit(): void {
    this.loader = true;
    this.loadCriticPicks(true);
  }

  loadCriticPicks(onFirstLoad : boolean) {
  
    this.getCriticPicks('').subscribe((movie: any) => {
      var { results } = movie;
      if(onFirstLoad){
        this.movies = results.sort((a : any, b : any) => b-a).slice(0,5);
      }
      else{
        this.movies = results;
       }
       this.loader = false;
    });
  }
}
