# reactive-jsx-dom
just use @vue/reactivity and jsx to render actual dom reactively

``` commandline
npm i reactive-jsx-dom
```

example https://codesandbox.io/s/adoring-morning-d337v

config jsxFactory and jsxFragmentFactory with tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement",
    "jsxFragmentFactory": "Fragment"
  }
}
```
jsx after compile will generate actual document element
```javascript
//import as Dom,then tsc or ts-loader will compile jsx with Dom.h and Dom.Fragment
import {createElement, Fragment} from 'reactive-jsx-dom'

document.body.appendChild(<div></div>)

const CustomTag = () => <div><h1>CustomTagElement</h1></div>

document.body.appendChild(<CustomTag/>)
//or use
document.body.appendChild(CustomTag())
```
or with vite
```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```
```javascript
//vite.config.js
/**
 * @type {import('vite').UserConfig}
 */
export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment', 
    // this will automatically inject JSX helper imports for every file transformed by ESBuild
    jsxInject: `import {createElement, Fragment} from 'reactive-jsx-dom'`
  }
}
```