import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Story } from './story';
import { StoryService } from './story.service';

const API_KEY = 'rxNgvQI6FFXNAGKZI64DqzgPkvZgtVGN';
const API_URL = 'https://api.nytimes.com/svc/topstories/v2';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})

export class StoryComponent implements OnInit {
  loader = true;
  stories  : Story[] = []
  sorted : Story[] = []
  sections = [
    'arts',
    'automobiles',
    'books',
    'business',
    'fashion',
    'food',
    'health',
    'home',
    'insider',
    'magazine',
    'movies',
    'nyregion',
    'obituaries',
    'opinion',
    'politics',
    'realestate',
    'science',
    'sports',
    'sundayreview',
    'technology',
    'theater',
    't-magazine',
    'travel',
    'upshot',
    'us',
    'world',
  ];
  selected = '----';

  constructor(private storyService: StoryService,
              private http: HttpClient) { }
  
  getTopStories(section: string) {
    return this.http.get(`${API_URL}/${this.selected}.json?api-key=${API_KEY}`);
  }

  ngOnInit(): void {
    this.loader = true;
    this.selected = 'home';
    this.loadTopStories(true);
  }

  update(e : any) {
    this.loader = true;
    this.selected = e.target.value;
    this.loadTopStories(false);
  }
  
 loadTopStories(onFirstLoad : boolean) {
    this.getTopStories('').subscribe((story: any) => {
      var { results } = story;
      if(onFirstLoad){
        this.stories = results.sort((a : any, b : any) => b-a).slice(0,5);
      }
      else{
        this.stories = results;
       }
       this.loader = false;
    });
  }
}
