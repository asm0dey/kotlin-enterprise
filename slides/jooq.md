## JOOQ: плюсы

* Получение работает даже красивее чем в Java:
`record[FIELD]` vs `record.get(FIELD)`
* Маппинг в `data` классы из коробки
* Лямбды!

---

## JOOQ: минусы

Алиасы надо писать так:

```kotlin
val b = Book("b")
// or…
val b = Book.`as`("b")
```

Вместо привычного 

```java
Book b = Book.as("b")
```
