# reactive-jsx-dom
just use @vue/reactivity and jsx to render actual dom reactively

``` 
npm i reactive-jsx-dom
```
example https://codesandbox.io/s/adoring-morning-d337v

config jsxFactory and jsxFragmentFactory with tsconfig.json
```
{
  "compilerOptions": {
    ...
    "jsx": "react",
    "jsxFactory": "Dom.h",
    "jsxFragmentFactory": "Dom.Fragment",
    ...
  },
}
```
and import as Dom
```
import Dom from 'reactive-jsx-dom'
```
