import Dom from './dom'
import {render} from "./render";
import {computed, ref} from '@vue/reactivity';

const color = ref('blue')
const count = ref(0);
const forloop = computed(() => {
        if (count.value > 0) {
            return [...Array(count.value).keys()]
                .map(num =>
                    <>
                        <br/>
                        <b>number: {num + 1} element</b>
                    </>)
        } else {
            return 'nothing'
        }
    }
)

const CustomTag = () => <div><h1>CustomTagElement</h1></div>
const app = <div id={'asdf'} class={'asdf'}>
    <button onclick={() => {
        color.value = 'green'
        count.value += 1
        console.log('+1')
    }}>plus one
    </button>
    <button onclick={() => {
        color.value = 'red'
        count.value -= 1
        console.log('-1')
    }}>minus one
    </button>
    <div style={{color}}>
        <div>
            <h1>count:{count}</h1>
        </div>
    </div>
    <CustomTag/>
    <div>
        <h1>map element test:</h1>
        {forloop}
    </div>
</div>
render(app, document.body)