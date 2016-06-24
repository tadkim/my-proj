import {Component} from '@angular/core';

export class Hero{
    id: number;
    name: string;
}

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{hero.name}} 님 반갑습니다.</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>
    `
})



// <input value="{{hero.name}}" placeholder="name">

export class AppComponent {
    title: 'Tour of Heros';
    hero: Hero = {
        id: 1,
        name: 'Windstorm'
    };
}
