## Особенности языка

---

## Spring + Kotlin. #Security

```java
public interface UserDetails extends Serializable {
    String getPassword();
    String getUsername();
```

* В интерфейсе объявлен геттер
* В Kotlin их нет
* И оверрайдить геттеры нельзя

-v-

## Spring + Kotlin. #Security

```kotlin
data class User(
    private val username: String,
    private val pass: String
): UserDetails {
    override fun getUsername() = username
    override fun getPassword() = pass
}
```

---

## To `run{}` 
## or not to `run{}`

```kotlin
class Controller {
  fun apiCall(arg: String): ComplexBusinessDTO {
    val interim = myService.call(arg)
    return postProcess(interim)
  }
}
```

<p class="fragment">Но ведь есть <code>run</code>?</p>
<p class="fragment">Улучшаем!</p>

-v-

## To `run{}` 
## or not to `run{}`

```kotlin
class Controller {
  fun apiCall(arg: String) = run {
    val interim = myService.call(arg)
    postProcess(interim)
  }
}
```
<p class="fragment">Не надо так!</p>
<p class="">&nbsp;</p>

---

## Интероп

* Всё очень хорошо <!-- .element class="fragment" -->
* Java 2 Kotlin работает достаточно плохо <!-- .element class="fragment" -->
  * Вообще, наверное, не используйте
* Котлин не умеет raw-types <!-- .element class="fragment" -->

-v-

## `Raw types`?

Test containers:

```java
public class BrowserWebDriverContainer<SELF extends 
      BrowserWebDriverContainer<SELF>>  { /**/ }
```

<div class="fragment">
И инстанциируется это так:

```java
new BrowserWebDriverContainer()
```
</div>

-v-


## Но в котлине так сделать нельзя!

-v-

## Варианты

<div class="fragment">

```kotlin
BrowserWebDriverContainer<Nothing>()
```

Не работают красивые билдеры 😭
</div>
<div class="fragment">

```kotlin
class KBrowserWebDriverContainer():
      BrowserWebDriverContainer<KBrowserWebDriverContainer>()
```

Лапшекод 😞
</div>

---

## Работа с коллекциями

* Всё работает
* Стримы тоже — нужна библиотека <!-- .element class="fragment" --> `kotlinx-support-jdk8`
  * Работают даже лучше за счёт методов `toList()` и тд
* Стримы не нужны — есть <!-- .element class="fragment" --> `asSequence()`
  * Который работает даже на массивах
* Больше функциональных методов <!-- .element class="fragment" -->
  * Например, `zip`

---

### Mein kampf с аннотациями

```kotlin
data class Person (
  @NotNull
  val name: String,
  @Min(18)
  val age: Int,
  @CustomAnno
  val parents: List<Person>?
)
```

<small class="fragment">Что может пойти не так?</small>

-v-

### Mein kampf с аннотациями

```kotlin
data class Person (
  @NotNull
  val name: String,
  @Min(18)
  val age: Double,
  @CustomAnno
  val parents: List<Person>?
)
```

<small class="fragment">Что может пойти не так?</small>

-v-

### Mein kampf с аннотациями

<div class="row">
<div class="col-45">

```kotlin
data class Person (
  @NotNull
  val name: String,
  @Min(18)
  val age: Double,
  @CustomAnno
  val parents: List<Person>?
)
```

</div>
<div class="col-55" style="font-size: 0.8em">

* Сразу непонятно, но аннотации садятся на аргументы конструктора
  * О которых hibernate-validator не знает
* Нас спасает ключевое слово field
* И jackson-module-kotlin
* Иногда из-за логики сигнатура типа и аннотация конфликтуют

</div>
</div>
