
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

The quoted text assigned to ngFor means “take each hero in the heroes array, store it in the local hero variable, and make it available to the corresponding template instance”.

The let keyword before "hero" identifies hero as a template input variable. We can reference this variable within the template to access a hero’s properties.

Learn more about ngFor and template input variables in the [Displaying Data](https://angular.io/docs/ts/latest/guide/displaying-data.html#ngFor) and [Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngFor) chapters.












************************************************************
************************************************************

__app.component.ts (hero array)__
<pre class="highlight"><code class="ts">
</code></pre>
