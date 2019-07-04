## Тесты

---

## Kotlin + JUnit. Тестирование. Part 1.

Что нужно знать:
* `@BeforeAll` и `@AfterAll` нужно объявлять в компаньоне
* Для `Parametrized` тестов
  * `ClassRule`, `MethodRule` и `@Parameter` должен быть `@JvmField`

-v-

## Kotlin + JUnit. Тестирование. Part 1.

```kotlin
companion object {
  @JvmStatic @BeforeAll
  fun setup() {}
  @ClassRule @JvmField
  val SPRING_CLASS_RULE = SpringClassRule()
}
@Rule @JvmField
var springMethodRule = SpringMethodRule()
```

---

## Kotlin + JUnit. Тестирование. Part 2. Mockito.

* `anyObject()` возвращает null
* это плохо потому что на обращении к объекту Kotlin проверяет что объект — не `null` 
* `anyString()` тоже!
* `when` — ключевое слово

-v-

## Kotlin + JUnit. Тестирование. Part 2. Mockito.

<pre><code class="hljs" data-line-numbers="1">import org.mockito.Mockito.`when` as on
inline fun &lt;reified T&gt; kAnyObject(): T =
      kAnyObject(T::class.java)
inline fun kAnyObject(t: KClass&lt;T&gt;): T = Mockito.any(t)
</pre></code>

-v-

## Kotlin + JUnit. Тестирование. Part 2. Mockito.

<pre><code class="hljs" data-line-numbers="2-4">import org.mockito.Mockito.`when` as on
inline fun &lt;reified T&gt; kAnyObject(): T =
      kAnyObject(T::class.java)
inline fun kAnyObject(t: KClass&lt;T&gt;): T = Mockito.any(t)
</pre></code>

---

### Kotlin. Тестирование. Part 3. Плюшки. Красивый mockito

<pre><code class="hljs" data-line-numbers="3-5">@Test
fun doAction_doesSomething(){
    val mock = mock&lt;MyClass&gt; {
        on { getText() } doReturn "text"
    }
    val classUnderTest = ClassUnderTest(mock)
    classUnderTest.doAction()
    verify(mock).doSomething(any())
}
</pre></code>

-v-

### Kotlin. Тестирование. Part 3. Плюшки. Красивый mockito

<pre><code class="hljs" data-line-numbers="6">@Test
fun doAction_doesSomething(){
    val mock = mock&lt;MyClass&gt; {
        on { getText() } doReturn "text"
    }
    val classUnderTest = ClassUnderTest(mock)
    classUnderTest.doAction()
    verify(mock).doSomething(any())
}
</pre></code>

-v-

### Kotlin. Тестирование. Part 3. Плюшки. Красивый mockito

<pre><code class="hljs" data-line-numbers="7-8">@Test
fun doAction_doesSomething(){
    val mock = mock&lt;MyClass&gt; {
        on { getText() } doReturn "text"
    }
    val classUnderTest = ClassUnderTest(mock)
    classUnderTest.doAction()
    verify(mock).doSomething(any())
}
</pre></code>

-v-

### Kotlin. Тестирование. Part 3. Плюшки. Красивый mockito

<pre><code class="hljs" data-line-numbers>@Test
fun doAction_doesSomething(){
    val mock = mock&lt;MyClass&gt; {
        on { getText() } doReturn "text"
    }
    val classUnderTest = ClassUnderTest(mock)
    classUnderTest.doAction()
    verify(mock).doSomething(any())
}
</pre></code>

<small>В библиотеке `mockito-kotlin`</small>

---

### Kotlin. Тестирование. Part 3. Плюшки. Понятный нейминг

```kotlin
fun `I am readable unit test name which describes what is tested`(){
  assertTrue(true)
}
```

---

### Kotlin. Тестирование. Part 3. Плюшки. BDD

<pre><code class="hljs kotlin" data-line-numbers>object CalculatorSpec: Spek({
    describe("A calculator") {
        val calculator by memoized { Calculator() }
        describe("addition") {
            it("returns the sum of its arguments") {
                assertThat(3, calculator.add(1, 2))
            }}}})
</pre></code>

-v-

### Kotlin. Тестирование. Part 3. Плюшки. BDD

<pre><code class="hljs kotlin" data-line-numbers="2">object CalculatorSpec: Spek({
    describe("A calculator") {
        val calculator by memoized { Calculator() }
        describe("addition") {
            it("returns the sum of its arguments") {
                assertThat(3, calculator.add(1, 2))
            }}}})
</pre></code>

-v-

### Kotlin. Тестирование. Part 3. Плюшки. BDD

<pre><code class="hljs kotlin" data-line-numbers="3">object CalculatorSpec: Spek({
    describe("A calculator") {
        val calculator by memoized { Calculator() }
        describe("addition") {
            it("returns the sum of its arguments") {
                assertThat(3, calculator.add(1, 2))
            }}}})
</pre></code>

-v-

### Kotlin. Тестирование. Part 3. Плюшки. BDD

<pre><code class="hljs kotlin" data-line-numbers="5-7">object CalculatorSpec: Spek({
    describe("A calculator") {
        val calculator by memoized { Calculator() }
        describe("addition") {
            it("returns the sum of its arguments") {
                assertThat(3, calculator.add(1, 2))
            }}}})
</pre></code>

-v-

### Kotlin. Тестирование. Part 3. Плюшки. BDD

<pre><code class="hljs kotlin" data-line-numbers>object CalculatorSpec: Spek({
    describe("A calculator") {
        val calculator by memoized { Calculator() }
        describe("addition") {
            it("returns the sum of its arguments") {
                assertThat(3, calculator.add(1, 2))
            }}}})
</pre></code>

<small>Библиотека `Spek`</small>

---

### Kotlin. Тестирование. Part 3. Плюшки. Matchers

```kotlin
23.should.equal(23)
"Kotlin".should.not.contain("Scala")
listOf(1,2,3).should.have.size.above(1)
```

<small>`Expekt`</small>
