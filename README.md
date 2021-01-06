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
jsx after compile will generate actual document element
```
//import as Dom,then tsc or ts-loader will compile jsx with Dom.h and Dom.Fragment
import Dom from 'reactive-jsx-dom'

document.body.appendChild(<div></div>)

const CustomTag = () => <div><h1>CustomTagElement</h1></div>

document.body.appendChild(<CustomTag/>)
//or use
document.body.appendChild(CustomTag())
```
