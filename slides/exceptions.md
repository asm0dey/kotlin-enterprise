## Исключения

Как бы сделал я? 

```kotlin 
catch (e: Exception){
    throw KRuntimeException(e)
}
```
<!-- .element class="fragment" -->

---

# Но нет

---

## Исключения
```java
public static RuntimeException sneakyThrow(Throwable t) {
    if (t == null) throw new NullPointerException("t");
    return Lombok.<RuntimeException>sneakyThrow0(t);
}

@SuppressWarnings("unchecked")
private static <T extends Throwable> T sneakyThrow0(Throwable t) throws T {
    throw (T)t;
}
```
<small class="fragment">© Lombok project</small>