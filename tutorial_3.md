
# [Angular2] Basic tutorial : 3. Master/Detail
이 문서는 [angular 공식페이지 튜토리얼](https://angular.io/docs/ts/latest/tutorial/toh-pt1.html)을 학습차원에서 정리한 글이다.

_ _ _
## It Takes Many Heroes
우리는 이전 튜토리얼에서 한 명의 __hero__에 대해 표현하는 방법을 학습했다. 이 글에서는 조금 더 확장하여, 우리가 만들 app에서 __hero__의 목록을 표현하도록 한다. 또한 사용자가 여러 __hero__중에서 선택을 할 수 있도록하고, 각 __hero__들의 세부사항을 확인할 수 있도록 한다.


> 관련 설치 또는 디렉터리를 만지는게 귀찮다면, 앵귤러에서 제공하는 [live example](https://angular.io/resources/live-examples/toh-2/ts/plnkr.html)을 활용해도 좋다.

가장 먼저 뭐 부터 해야할까? 일단 기본적인 것들 부터 마련해보기로하자. __첫째, 우리는 일단 hero의 리스트가 필요하다.__ 우리는 __hero__들의 정보를 __view's template__에서 표현하고자 한다. 이에대해서 살펴보도록하자.

_ _ _
## Where We Left Off
본격적인 시작에 앞서, 우리가 오로지 angular2의 기술예제에 집중할 수 있도록, 부차적인 것들을 점검할 필요가 있다. 일단 우리가 튜토리얼을 진행할 폴더의 구조가 제대로 구성되었는지 확인하자. 아래 형태가 아니라면, 다시 이전 튜토리얼로 돌아가 뭘 빠뜨렸는지 확인해보자.
<pre><code>
angular2-tour-of-heroes
-/app
----/app.component.ts
----/main.ts
-/node_modules ...
-/typings ...
-/index.html
-/package.json
-/styles.css
-/systemjs.config.js
-/tsconfig.json
-/typings.json
</code></pre>

<div class="tem"><p>나중에 대혼란에 빠지는 것보다, 체크할 수 있는 수준일 때 체크하는 편이 낫다.</p></div>

## Keep the app transpiling and running
이전 튜토리얼에서의 방법과 마찬가지로, __Typescript Compiler__를 실행 상태로 두자. 
<pre class="highlight"><code>
npm start
</code></pre>
이것으로 우리가 애플리케이션을 구축하는 동안 __Typescript Compiler__가 동작하도록 할 수 있다.

_ _ _
## Displaying Our Heroes

### Creating heroes
10명의 __hero__를 포함하는 하나의 배열을 생성한다.
> 세상을 구하는 느낌인가.

__app.component.ts (hero array)__
<pre class="highlight"><code class="ts">
const HEROES: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Jenny Holzer' },
    { id: 13, name: 'Mike Bostock' },
    { id: 14, name: 'Daniel Shiffman' },
    { id: 15, name: 'Miyazaki Hayao' },
    { id: 16, name: 'Ben Fry' },
    { id: 17, name: 'Yumi Jeoung' },
    { id: 18, name: 'Taegyoung Kim' },
    { id: 19, name: 'Stuckyi Studio' },
    { id: 20, name: 'Friedrich Wilhelm Nietzsche' }
];
</code></pre>

`Heroes` 배열은 `hero`타입이다.  부분적으로 정의된 클래스로 __hero__의 배열을 만들 수 있다. 물론, 그럴듯하게 웹서비스에서 __hero__에 대한 정보를 가져와서 표현해야 멋져보이고(?) 좋겠지만, 여기서는 시작을 가볍게 나가고있다.
<div class="tem"><p> '그럴듯'한 것을 '제대로'하려면 어려운데, 그런건 앞으로 무궁무진하다.</p></div>


_ _ _
## Exposing heroes
여기서는 `AppComponent`안에다가 __public property__를 만든다. 이것은 바인딩을 위해 __heroes__에 대한 정보를 드러내는 역할을 한다.


__app.component.ts (hero array property)__
<pre class="highlight"><code class="ts">
public heroes = HEROES;
</code></pre>

우리는 `heroes`의 타입을 정하지 않았었다. 위와같이 작성함으로써 __TypeScript__는 `HEROES`배열에서 추론(infer)할 수 있게된다.

>*우리는 이 Component class에 `heroes`리스트를 정의할 수 있다. 그러나 궁극적으로 우리는 데이터 서비스에서 얻을 것이라는 것을 알고 있다. 왜냐하면 우리는 우리가 향하는 방향을 알고 있기 때문이다.따라서 처음 클래스를 구현하면서부터 __hero__ 데이터를 분리하는 것이다.*


>~~*We could have defined the heroes list here in this component class. But we know that ultimately we’ll get the heroes from a data service. Because we know where we are heading, it makes sense to separate the hero data from the class implementation from the start.*~~

_ _ _
## Displaying heroes in a template
이제 우리가 만든 컴포넌트는 `heroes`를 가지고 있다. 이 내용을 우리의 template에 바로 표현해보자. 다음 코드와 같이 HTML덩어리를 __title의 아래, 그리고 hero 정보보다는 위에 삽입__한다.


__app.component.ts (heroes template)__
<pre class="highlight"><code class="ts">
&lt;h2&gt;My Heroes&lt;/h2&gt;
&lt;ul class="heroes"&gt;
    &lt;li&gt;
        <!-- each hero geos here -->
    &lt;/li&gt;
&lt;/ul&gt;
</code></pre>
위와 같은 방법으로 우리는 __heroes__에 대한 정보를 채울 수 있는 템플릿을 간단하게 만들 수 있다.


_ _ _
## Listing heroes with ngFor
이제 컴포넌트에 있는 `heroes`배열을 미리 만들어놓은 Template에 바인딩 할 차례다. 배열 안에있는 요소를 각각 바인딩하기위해서 각 __hero__요소를 반복하고, 각 __hero__들을 독립적으로 표현한다. 우리는 이러한 작업을 진행하기위해 __Angular__의 기능을 활용한다. 하나씩 천천히 뜯어보자.

<div class="tem"><p> 드디어 angualr가 뭔가를 하는구나! </p></div>

### ngFor 활용예제 - 1. `<li>`를 지시자로 수정하기
__app.component.ts (ngFor)__
<pre class="highlight"><code class="ts">
&lt;li *ngFor="let hero of heroes"&gt;
</code></pre>

__ngFor 앞에 있는 별표(asterisk)는 이 문법에서 중요한 부분이다.__

`ngFor`에 붙은 접두어(*)는 `<li>`요소와 `<li>`요소의 children이 __'master template'__을 구성하고 있음을 나타낸다.

`ngFor` 지시자는 `heroes` 배열에서 반복되고 `AppComponent.heroes`의 property와 템플릿의 인스턴스로 리턴된다.
>The (*) prefix to ngFor indicates that the `<li>` element and its children constitute a master template.


The ngFor directive iterates over the heroes array returned by the AppComponent.heroes property and stamps out instances of this template.

`ngFor()`에 할당된 인용텍스트는 "Heroes배열의 각 hero를 로컬 hero변수(local hero variable)에 저장하고, 해당 template 인스턴스에 사용할 수 있도록"을 의미한다.


The `let` keyword before "hero" identifies hero as a template input variable.
"hero"이전의 `let`키워드는 template의 input 변수로 hero를 식별한다. 우리는 hero의 속성값에 접근하기 위해 template안에서 이 변수를 참조할 수 있다.

- `ngFor`변수에 대해 더 알고 싶다면 [Displaying Data](https://angular.io/docs/ts/latest/guide/displaying-data.html#ngFor)을 참고하자.
- `template input`변수에 대해 더 알고 싶ㄷ면  [Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngFor)을 참고하자.

### ngFor Template
이제, __hero__의 속성을 표시하는 `<li>`태그 사이에 컨텐츠 내용을 삽입한다.

__app.component.ts (hero array)__
<pre class="highlight"><code class="ts">
&lt;li *ngFor="let hero of heroes"&gt;
  &lt;span class="badge"&gt;{{hero.id}}&lt;/span&gt;{{hero.name}}
&lt;/li&gt;
</code></pre>

여기까지 잘 마치고 브라우저를 확인하면, __heroes'__의 리스트를 볼 수 있을 것이다.




## Style our heroes
_ _ _

여기까지 만들어본 __heroes__의 리스트의 형태 역시 못볼 정도는 아니다. 그러나 스타일요소를 조금더 손보면 보다 명확한 형태로 표현할 수 있다.


다음과 같이 `@Component` `Decorator` 속성을 설정함으로써 표현 결과의 스타일요소를 챙겨볼 수 있다.  
__app.component.ts (styles)__
<pre class="highlight"><code class="ts">
styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
</code></pre>
*(앞에서 언급했지만) 다시 한번 multi-line string을 위한 __back-tick__의 사용을 체크해 두자.*

굉장히 많은 스타일 요소들이 있다. 우리는 여전히 __in-line__형태의 스타일 요소를 삽입가능하다.

>우리는 이후 살펴볼 Chapter에서 이에대한 내용을 학습 할 예정이다. 여기서는 일단 계속 진행하도록하자.

우리가 컴포넌트에 스타일을 할당할 때, 그 스타일의 scope는 해당 컴포넌트까지다. 우리의 Style은 오로지 우리의 `AppComponent`에 적용되며, 외부 HTML에 새어나가지 않는다.

__app.component.ts (style heroes)__
<pre class="highlight"><code>
&lt;h2&gt;My Heroes&lt;/h2&gt;
&lt;ul class="heroes"&gt;
  &lt;li *ngFor="let hero of heroes"&gt;
    &lt;span class="badge"&gt;{{hero.id}}&lt;/span&gt; {{hero.name}}
  &lt;/li&gt;
&lt;/ul&gt;
</code></pre>



## Selecting Hero
_ _ _


- 우리는 hero 목록을 가지고 있으며, 우리의 애플리케이션에는 한 명의 hero만 표현하고 있다.
- 목록과 single ehro는 어떤 식으로든 연결되어있지 않았다.
- 우리는 사용자가 우리의 hero 리스트에서 hero를 선택하고, 세부사항영역에 선택한 영웅의 세부사항을 표현하고 싶다.
- 이러한 UI pattern은 "master-detail"로 널리 알려져 있다. 우리의 경우, __'master'__는 hero 리스트이고 __'detail'__은 선택 된  __'hero'__일 것이다.


__이제 `click` 이벤트에 바인딩 된 `selectHero`컴포넌트 속성을 통해, `Master`와 `Detail`간의 세부 사항을 연결할 수 있다.__


### Click event
 클릭이벤트를 위해 `<li>`요소안에서 __Angular__이벤트 바인딩 코드를 작성한다. 

__app.component.ts (template except)__
<pre class="highlight"><code>
&lt;li *ngFor="let hero of heroes" (click)="onSelect(hero)"&gt;
  &lt;span class="badge"&gt;{{hero.id}}&lt;/span&gt; {{hero.name}}
&lt;/li&gt;
</code></pre>


#### Focus on the event binding
<pre class="highlight"><code>
(click)="onSelect(hero)"
</code></pre>
- 괄호(parenthesis)는 `<li>`를 target으로 event를 식별한다.
- 등호(=)의 오른쪽에 있는 표현식은 `AppComponent`의 메서드인 `onSelect()`를 호출하고,

>The parenthesis identify the `<li>` element’s click event as the target. The expression to the right of the equal sign calls the `AppComponent` method, `onSelect()`, passing the template input variable `hero` as an argument. That’s the same `hero` variable we defined previously in the `ngFor`.

>Learn more about Event Binding in the [User Input](https://angular.io/docs/ts/latest/guide/user-input.html) and [Templating Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#event-binding) chapters.


### Add the click handler

우리의 바인딩 이벤트가 아직 존재하지 않는 메서드 `onSelect`를 의미한다. 따라서, 컴포넌트에 이 메서드를 추가해준다.

#### method로 뭘 해야하는 걸까?
여기서 method는 컴포넌트에서 선택된 __hero__에서 사용자가 클릭한(선택한) __hero__로 설정해야한다. 그렇다. 우리의 컴포넌트는 아직 '선택된 hero'를 포함하고 있지않다. 우리가 시작할 부분이 바로 여기다.


#### Expose the selected hero
우리는 더이상 `AppComponent`의 static `hero`가 필요하지 않다. 이것을 아주 간단한 `selectedHero`property로 __Replace__해준다.

 __Focus on the event binding__
<pre class="highlight"><code>
selectedHero : Hero;
</code></pre>
사용자가 hero를 선택하기 전까지 선택된 hero가 없도록 결정했다.

이제 사용자 클릭에 의해 `selectedHero`의 property를 설정하는 __`onSelect` method를 추가해준다.__

 __app.component.ts(onSelect)__
<pre class="highlight"><code>
onSelect(hero:Hero){ this.selectHero = hero; }
</code></pre>


우리의 스크립트 파일을 살펴보면, 여전히 변경하기 이전의 방법인 `hero`의 property를 참조하는 형태로 이루어져 있다. 이것을 변경한 방법인 `selectedHero`의 property로 변경한다.
__app.component.ts(template except)__
<pre class="highlight"><code>
&lt;h2&gt;{{selectedHero.name}} details!&lt;/h2&gt;
&lt;div&gt;&lt;label&gt;id: &lt;/label&gt;{{selectedHero.id}}&lt;/div&gt;
&lt;div&gt;
    &lt;label&gt;name: &lt;/label&gt;
    &lt;input [(ngModel)]="selectedHero.name" placeholder="name"/&gt;
&lt;/div&gt;
</code></pre>


_ _ _
## Hide the empty detail with ngIf

여기까지 작성한 코드를 바탕으로 브라우저를 로드했을 때, __hero__는 선택되어있지 않았다. `selectedHero`는 `undefined`상태였다. 이것이 브라우저의 콘솔에서 나타는 오류메시지의 원인이다.

> *EXCEPTION: TypeError: Cannot read property 'name' of undefined in [null]*

우리는 Template에 `selectedHero.name`을 표시하는 것을 기억해야한다.`selectedHero`자체가 정의되어있지 않았다.
__hero__가 선택될 때 까지, 우리는 DOM에서 hero에 대한 세부사항을 유지함으로써 이 문제를 해결할 수 있다.

먼저, `<div>`요소로 HTML __hero__ 디테일 콘텐츠를 래핑한다.그 다음 우리는 `ngIf`라는 내장 지시문(built-in directive)을 추가하고, 컴포넌트의 `selectedHero` 속성으로 설정한다.
<pre class="highlight"><code>
&lt;div *ngIf="selectedHero"&gt;
  &lt;h2&gt;{{selectedHero.name}} details!&lt;/h2&gt;
  &lt;div&gt;&lt;label&gt;id: &lt;/label&gt;{{selectedHero.id}}&lt;/div&gt;
  &lt;div&gt;
    &lt;label&gt;name: &lt;/label&gt;
    &lt;input [(ngModel)]="selectedHero.name" placeholder="name"/&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

>다시한번 `ngIf`앞에 접두어로 붙는 별표(asterisk)가 문법상 굉장히 중요한 부분임을 강조한다.

다음은 방금 구현했던 `ngif`형태의 구현과 그 바로 이전의 구현방법이었던 `excerpt`간의 구조 차이를 비교한 이미지이다.

![template excerpt와 ngIf 구현 코드의 차이](http://whiteleo.azurewebsites.net/img/ng2_ngif.png);

사진을 살펴보면 `ngif`형태의 구현에서는 전체를 `<div>`로 한번 더 감싸고, 그 `<div>`태그 안에서 `*ngIf="selectedHero"`의 방법으로 코드를 포함하고 있는 모습을 볼 수 있다.

만약, `selectedHero`가 존재하지 않는다면, `ngIf`지시어는 DOM에서부터 __hero detail HTML__을 지운다. (여기서 지우는 부분에는) __hero detail__ element가 있는 것이 아니니 걱정하지 않아도 된다.


사용자가 __hero__를 선택했을 때, `selectedHero`는 "참"이되며, `ngIf`는 __hero detail__콘텐츠를 DOM으로 가져오고, 중첩된 바인딩을 평가한다.

>`ngIf`와 `ngFor`는 "구조 지시어(structural directives)"라 불린다. 왜냐하면 이들은 __DOM__의 구조를 변경할 수 있기 때문이다. 다시말해, 이 지시어들은 __Angular__가 __DOM__안에서 콘텐츠를 표현하는 방법으로 구조를 지시한다.

브라우저가 새로고침되면 우리는 `heroes`의 리스트를 볼 수 있다. ~~그러나 선택된 hero의 세부사항(detail)은 선택되지 않았다.~~
The browser refreshes and we see the list of heroes but not the selected hero detail.

`ngIf`는 `seletedHero`가 정의되지 않았다면(undefined), 가능한한 __DOM__의 밖에 유지한다. 그러다 우리가 __hero__중 하나를 리스트에서 클릭할 경우, 선택된 __hero__ 세부사항에서 __hero__가 표시된다. 모든 것이 우리가 예상한대로 동작하고있다.

_ _ _
## Styling the selection
~~여기까지의 코드를 실행하고, 선택해보면 선택된 __hero__의 세부사항을 보여주는 영역은 아래에서 볼 수 있지만, 우리는 위에 있는 __hero__리스트에서 찾는것은 빠르지않다.~~
*We see the selected hero in the details area below but we can’t quickly locate that hero in the list above.* 

우리는 (역시나) 수정가능하다. selected CSS class를 master리스트 안에 있는 적절한 `<li>`에 적용해줌으로써 수정할 수 있다. 예를들어, 우리가 `Magneta`를 __heroes list__에서 선택할 때 선택한 대상 element에 미묘하게 다른 배경 색상을 적용시킴으로써, 시각적으로 튀어나오는 듯 한 효과를 줄 수 있다.

![Styling the selection 예시화면](http://whiteleo.azurewebsites.net/img/ng2_ngif_2.png);

~~또한, 우리는 template에 적용할 `selected` `class`에 대한 __class 바인딩 속성__을 추가한다.~~*We’ll add a property binding on class for the selected class to the* template. 

또한, 이 작업을 현재의 `selectedHero`와 이전의 `hero`을 놓고 비교하는 식으로 설정한다.

~~key가 CSS class(`selected`)의 이름이다.  만약 두 __heroes__가 일치하면 값은 `true`이고, 다른경우는 `false`이다.~~  
*The value is true if the two heroes match and false otherwise.*

우리는 만약 `heroes`가 일치하는 경우 `selected class`를 적용하고, 그렇지 않은 경우라면 이것을 제거하도록 말하고 있다.

 We’re saying “apply the selected class if the heroes match, remove it if they don’t”.

__app.component.ts(setting the CSS class)__
<pre class="highlight"><code>
[class.selected]="hero === selectedHero"
</code></pre>

#### Notice
`class.selected`는 대괄호(square brackets, `[]`)에 둘러쌓여야 한다. 이러한 문법은 __property를 바인딩__하는데 사용된다. 각 data floaws를 바인딩하는 것은 일방향, 즉 data source에서(표현식 hero === selectedHero) class의 property이다.

__app.component.ts(styling each hero)__
<pre class="highlight"><code>
&lt;li *ngFor="let hero of heroes"
  [class.selected]="hero === selectedHero"
  (click)="onSelect(hero)"&gt;
  &lt;span class="badge"&gt;{{hero.id}}&lt;/span&gt; {{hero.name}}
&lt;/li&gt;
</code></pre>

>Learn more about [property bindings](https://angular.io/docs/ts/latest/guide/template-syntax.html#property-binding) in the Template Syntax chapter.

지금까지의 작업내용을 포함한 app을 브라우저가 reload하면, __hero Magneta__와 __selection__은 배경색상으로 분명하게 구별되고있는 모습을 볼 수 있다.

![selected heroes list](http://whiteleo.azurewebsites.net/img/heroes-list-1.png "사진 : angular.io");

우리는 각각 다른 __hero__를 선택해볼 수 있으며, tell-table 색상은 그에따라 바뀐다.


## Complete `app.component.ts`
이제까지 부분적으로 작성하고, 정리했던 `app.component.ts`를 전체적으로 확인해보자. 만약 이제까지의 코드가 중간중간 막혔다면 이 코드를 띄워놓고 어떤 부분이 잘못된 것인지 확인해보자.

<pre class="highlight"><code class="js">
import { Component } from '@angular/core';
export class Hero {
  id: number;
  name: string;
}
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
@Component({
  selector: 'my-app',
  template: `
    &lt;h1&gt;{{title}}&lt;/h1&gt;
    &lt;h2&gt;My Heroes&lt;/h2&gt;
    &lt;ul class="heroes"&gt;
      &lt;li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)"&gt;
        &lt;span class="badge"&gt;{{hero.id}}&lt;/span&gt; {{hero.name}}
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div *ngIf="selectedHero"&gt;
      &lt;h2&gt;{{selectedHero.name}} details!&lt;/h2&gt;
      &lt;div&gt;&lt;label&gt;id: &lt;/label&gt;{{selectedHero.id}}&lt;/div&gt;
      &lt;div&gt;
        &lt;label&gt;name: &lt;/label&gt;
        &lt;input [(ngModel)]="selectedHero.name" placeholder="name"/&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero) { this.selectedHero = hero; }
}
</code></pre>

_ _ _







************************************************************
************************************************************

__app.component.ts (hero array)__
<pre class="highlight"><code class="ts">
</code></pre>
