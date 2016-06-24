

# [Angular2] Basic tutorial : 2. The Hero Editor
이 문서는 [angular 공식페이지 튜토리얼](https://angular.io/docs/ts/latest/tutorial/toh-pt1.html)을 학습차원에서 정리한 글이다.

_ _ _
## app transpiling을 유지하고 실행하기

TypeScript의 변화를 감지하여 작동하는 컴파일러, 그리고 서버를 동작시킨다.
<pre class="highlight"><code>
npm start
</code></pre>

이 명령은 __watch__모드에서 서버를 시작한다. 우리가 (이번 예제의 목표인) __Tour of Heros__를 만들 때 까지 이것은 작동하고 있을 것이다.

_ _ _
## Show our Hero

__우리는 Hero의 데이터를 우리의 애플리케이션에서 표시하고 싶다.__
우리의 `AppComponent`에 두 가지 속성을 추가한다. 하나는 `title`속성이고, 하나는 `hero`속성이다.

__app.component.ts (AppComponent class)__
<pre class="highlight"><code class="ts">
export class AppComponent{
    title = 'Tour of Heroes';
    hero = 'Windstorm';
}
</code></pre>

우리는 이제 템플린을 업데이트한다. 이러한 새로운 속성에 데이터 바인딩 한으로 decoration 된 `@Component`
<pre class="highlight"><code class="ts">
template : '&lt;h1&gt;{{title}}&lt;/h1&gt;&lt;h2&gt; {{hero}} details!&lt;/h2&gt;'
</code></pre>

이제 브라우저는 새로고침하여 title과 hero에 대한 정보를 표시한다.

![angular2 tutorial2](http://yumm.co.kr/blogs/asset/img/angualr2/ng2_tutorial2.png "angular2 tutorial2")

이미 코드를 수정하고 확인해보면 수정한 내용으로 화면이 변경되어있음을 알 수 있다.

### 이중 중괄호(Double Curly Braces)

이중 중괄호는 우리 app이 컴포넌트로부터 `title`과  `hero`의 속성에 대해 알 수 있도록 하며, 그것을 렌더링 할 수 있도록 해준다. 이것은 "보간(interpolation)"형태의 단방향 데이터 바인딩이다.


_ _ _
## Hero object

지금 우리의 hero는 단지 'name'에 불과하다. 우리의 hero는 더 많은 속성들을 필요로 한다. 그러면 `hero`를 __리터럴 문자열__에서 하나의 __class__로 변환하자.


`Hero` 클래스를 `id`와 `name`이라는 속성(properties)들과 함께 생성한다. 지금 `app.component.ts`의 상단에 이것을 넣자. 이것은 `import`구문 아래이다.

__app.component.ts(Hero class)__
<pre class="highlight"><code class="ts">
export class Hero{
    id:number;
    name:string;
}
</code></pre>

이제 우리는 `Hero`클래스를 가지게 되었다. 이어서 우리의 컴포넌트의 `hero` 속성(properties)들을 적합한 `Hero`의 타입을 찾기위해 리팩터링한다. 그런 다음에 `id`는 __1__로, `name`은 __'windstorm'으로 초기화한다.

__app.component.ts(hero property)__
<pre class="highlight"><code class="ts">
hero: Hero ={
    id: 1,
    name:'Windstorm'
}
</code></pre>


>Because we changed the hero from a string to an object, we update the binding in the template to refer to the hero’s `name` property.


왜냐하면 우리는 __hero__를 문자열에서 하나의 객체로 변경하기 때문이다. 우리는 __hero__의 `name`속성을 템플릿 안에 바인딩하는 업데이트를 한다.

<pre class="highlight"><code class="ts">
template:'&lt;h1&gt;{{title}}&lt;h1&gt; &lt;h2&gt;{{hero.name}} details! &lt;h2&gt;'
</code></pre>

이 결과로, 브라우저가 새로고침되면서 hero의 name을 표시하게 된다.


## Adding more HTML
__name__을 표시하는 것은 좋지만, 우리는 __hero__의 모든 속성을 보고 싶다. 따라서, 우리는 __hero__의 `id`속성을 위해 `<div>`를 추가한다. 그리고 또 다른 `<div>`는 __hero__의 `name`속성을 위해 추가한다.

__app.component.ts(hero property)__
<pre class="highlight"><code class="ts">
template:'&lt;h1&gt;{{title}}&lt;/h1&gt; &lt;h2&gt;{{hero.name}} details! &lt;/h2&gt; &lt;div&gt; &lt;label&gt; id: &lt;/label&gt; {{hero:id}} &lt;/div&gt; &lt;div&gt; &lt;label&gt; name: &lt;/label&gt; {{hero:name}} &lt;/div&gt;'
</code></pre>

점점 우리의 template가 길어지고 있다. 오타가 나지 않도록 주의하자.

_ _ _
## Multi-line template strings

우리의 아름다운 삶을 유지하기 위해, 우리는 __ES2015__의 기능과 __TypeScript__사용에 대해 적극 고민해봐야한다.

그 방법으로서, 우리는 위에서 넣었던 따옴표(')를 키보드의 숫자 1키 옆에 있는 역 따옴표(`)로 변경하고, 각각의 `<h1>`, `<h2>`, `<div>`등을 하나의 줄에 위치시킨다. 아래 코드를 보는 것이 이해가 더 빠를 것이다.

__app.component.ts(AppComponent's template)__
<pre class="highlight"><code class="ts">
@Component({
  selector: 'my-app',
  template: `
    &lt;h1&gt;{{title}}&lt;/h1&gt;
    &lt;h2&gt;{{hero.name}} details!&lt;/h2&gt;
    &lt;div&gt;&lt;label&gt;id: &lt;/label&gt;{{hero.id}}&lt;/div&gt;
    &lt;div&gt;
      &lt;label&gt;name: &lt;/label&gt;
      
    &lt;/div&gt;
    `
})
</code></pre>

<div class="tem"><p>
이 부분에서 직접 손으로 타이핑해서는 실행이 안되어 어려움이 있었다. 예제코드를 그대로 가져와 넣었을 때는 동작하는 것으로보아, 뭔가 __역따옴표__라던가, 기타 등등에 대한 기술부분에서 문제가 발생했던 것으로 보인다. 앞으로 이에대해서 알게되면, 이 문서에도 함께 추가했으면 좋겠다.
</p></div>

_ _ _
## Editing our Hero
여기서부터는 우리가 텍스트박스(textbox)에서 __hero__의 이름을 수정하는 기능을 넣고 싶을 때 어떤 방법으로 풀어나가야하는지에 대한 설명을 정리했다.

먼저 __hero name__을 리팩토링 해보자. `<label>`과 `<label>`과 `<input>`과 `<input`요소를 다음 코드와 같이 리팩토링 해본다.

__app.component.ts(input element)__
<pre class="highlight"><code class="ts">
@Component({
  selector: 'my-app',
  template: `
    &lt;h1&gt;{{title}}&lt;/h1&gt;
    &lt;h2&gt;{{hero.name}} details!&lt;/h2&gt;
    &lt;div&gt;&lt;label&gt;id: &lt;/label&gt;{{hero.id}}&lt;/div&gt;
    &lt;div&gt;
      &lt;label&gt;name: &lt;/label&gt;
      &lt;input value="{{hero.name}}" placeholder="name"&gt;
    &lt; /div &gt;
`
})
</code></pre>

우리는 브라우저에서 __hero__의 이름이 `<input>`textbox 안에서 나타나는 것을 확인할 수 있다. 하지만, 뭔가 느낌이 구리다. 자세히 보면, 우리가 __name__을 변경했을 때, 우리가 만든 변화가 `<h2>`에서 반영되지 않고 있다는 것을 알 수 있다.

__우리가 `<input>`기능에 원하는 것은 (이제까지 다른 기술로도 했던) 일방향(one-way)적인 바인딩이 아니다.__


_ _ _
## 양방향 바인딩(Two-Way Binding)

사실, 우리의 의도는 `<input>`이라는 요소 안에서 __hero__의 __name__을 표현하는 것이며, __hero name__이 변경되면 이것이 바인딩된 모든 영역에서 함께 변경되는 것을 원한다. 

> 간단하게 말해서 우리는 '양방향 바인딩(Two-way Binding)'을 원한다.

양방향 데이터 바인딩을 위해 `ngModel` 내장 지시문(Built-in Directive)을 사용할 수 있는 템플릿으로 업데이트.

> `ngModel`에 대한 더 많은 정보는 [Forms](https://angular.io/docs/ts/latest/guide/forms.html#ngModel)와 [Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngModel)챕터에서 볼 수 있다.

`<input>`요소를 다음과 같이 바꿔준다.

__app.component.ts(input element)__
<pre class="highlight"><code>
&lt;input [(ngmodel)]="hero.name" placeholder="name"&gt;
<!--&lt;input value="{{hero.name}}" placeholder="name"&gt;-->
</code></pre>
브라우저가 새로고침되면, __hero__에 대한 내용을 다시 볼 수 있다. 더하여, 이제 __hero__의 __name__도 변경할 수 있으며 변경 결과를 확인할 수 있다. *(변경 된 결과는 바로 새로고침 되어 `<h2>`요소에 반영된다.)*

<div class="tem"><p>
`ngModel`을 할 때에는 `hero.name`에 중첩 중괄호를 쓰지 않는다. (왜 안나오나 했네;) 
</p></div>


_ _ _
## 우리가 살펴왔던 것들

우리가 구축한 내용들을 정리해보자.

- 우리의 __Tour of Heroes__는, 제목 및 `Hero`객체의 속성을 표시하는 방법으로, __단방향 데이터 바인딩__(a form of one-way data binding)을 하는데에 중첩 중괄호 표시를 사용했다. 
- 우리는 템플릿을 여러 줄의 string으로 작성했는데, 이러한 템플릿을 읽어낼 수 있도록 ES2015의 `Template strings` 기능을 사용했다.
- 우리는 양방항(Two-way) 데이터 바인딩을 `<input>`태그에 적용하는 방법으로 `ngModel`directive를 사용했다.
- `ngModel`의 지시어(Directive)는 콘텐츠 내 `hero.name`에 대한 또다른(모든) 바인딩에 대한 변경사항을 전파한다. 

이번 예제에 대한 [Live sample](https://angular.io/resources/live-examples/toh-1/ts/plnkr.html)을 통해, 관련 설치가 안되어있는 사람들도 직접 Angular2에 대한 기능을 살펴 볼 수 있다.

### app.component.ts의 전체 코드 공유
<pre class="highlight"><code class="ts">
import { Component } from '@angular/core';
export class Hero {
  id: number;
  name: string;
}
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>
    `
})
export class AppComponent {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
</code></pre>

_ _ _
## The Road Ahead

우리가 여기서 작성한 것은 한명의 hero에 대한 내용이다. 우리는 더 많은 hero에 대한 내용을 표현하고 싶다. 또한, 사용자들이 hero를 선택하고, 각 hero의 세부항목들을 선택해서 확인할 수 있도록 하고싶다. 앞으로의 튜토리얼에서 우리는 __'어떻게 리스트의 정보를 가져오는지'__와 __'어떻게 가져온 데이터를 템플릿에 바인딩 하는지'__, 그리고 __'어떻게 사용자에게 선택을 허용할지'__에 대한 내용을 학습하게 된다.

> __Next Step__ : [Master/Detail](https://angular.io/docs/ts/latest/tutorial/toh-pt2.html "Master/Detail")

