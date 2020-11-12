# vue-setup-generator
 Use generator instead of setup in vue

## Usage
`npm i vue-setup-generator` 

`yarn add vue-setup-generator`


```ts
import { defineComponent, ref } from "vue"
import { useGenerator } from "vue-setup-generator"

export default defineComponent({
  setup: () => useGenerator(function* () {
    const foo = ref(8)

    yield { foo }
    yield { bar: ref('hello') }

    function addFoo() {
      foo.value++
    }

    const name = 'vue-setup-generator'

    yield { addFoo, name }
  })
})
```
### 

## FAQ
### type check?
`Work well`
### pitfall?
Only `object` will merge in yield
Not allow duplicate key
```ts
export default defineComponent({
  setup: () => useGenerator(function* () {
    yield "world"   // Will be discarded
    const foo = 123
    yield { foo }
    yield { foo: 'foo' }  // error: duplicate key ["foo"]
  })
})

```