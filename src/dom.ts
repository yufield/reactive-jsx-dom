import {effect, unref} from '@vue/reactivity';

const IMPORTANT_REGEX = /(.*)\W+!important\W*$/;

export type Props = { [K in string]: any };

export const FRAGMENT_TAG = 'Fragment'

export type Factory<P> = (props?: P, ...children) => Node;

export function appendChildren<T extends Node>(parent: T, children: any[]) {
    effect(() => {
        let renderChildren = [...children]
        while (parent.firstChild) parent.removeChild(parent.firstChild)
        for (let i = 0; i < renderChildren.length; i++) {
            let child = unref(renderChildren[i])
            if (child != null) {
                if (typeof child != 'object') {
                    child = document.createTextNode(child);
                } else if (Array.isArray(child)) {
                    renderChildren.splice(i, 1, ...child)
                    i--
                    continue;
                }
                parent.appendChild(child)
            }
        }
    })
}

export function h<K extends keyof HTMLElementTagNameMap>(tagName: K, jsxProps?: Props, ...children: (string | Node)[]): HTMLElementTagNameMap[K];
export function h(tagName: string, jsxProps?: Props, ...children: (string | Node)[]): HTMLElement;
export function h(tagName: typeof FRAGMENT_TAG, jsxProps?: Props, ...children: (string | Node)[]): DocumentFragment;
export function h<F extends Factory<P>, P>(tagName: F, jsxProps?: P, ...children: (string | Node)[]): ReturnType<F>;
export function h<F extends Factory<P>, P>(tagName: string | F, jsxProps?: Props | P, ...children: (string | Node)[]): Node {
    if (typeof tagName == 'function') {
        return tagName(jsxProps as P, ...children);
    } else if (typeof tagName == 'string') {
        const htmlElement = createElement(tagName, unref(jsxProps))
        appendChildren(htmlElement, children);
        return htmlElement
    } else {
        throw `invalid tagName ${tagName}`
    }
}

function createElement(tagName: string, jsxProps?: Props) {
    if (tagName == FRAGMENT_TAG) {
        return document.createDocumentFragment()
    } else {
        const htmlElement = document.createElement(tagName);
        effect(() => {
            if (jsxProps != null) {
                Object.keys(jsxProps).forEach(jsxPropsKey => {
                    let jsxPropsValue = unref(jsxProps[jsxPropsKey]);
                    if (jsxPropsKey == 'data' && typeof jsxPropsValue == 'object' && jsxPropsValue != null) {
                        for (const k of Object.keys(jsxPropsValue)) {
                            htmlElement.setAttribute(k, unref(jsxPropsValue[k]));
                        }
                    } else if (jsxPropsKey == 'style' && jsxPropsValue != null) {
                        if (typeof jsxPropsValue == 'string') {
                            htmlElement.style.cssText = jsxPropsValue;
                        } else if (typeof jsxPropsValue == 'object') {
                            for (const k of Object.keys(jsxPropsValue)) {
                                const property = unref(jsxPropsValue[k])
                                const match = IMPORTANT_REGEX.exec(property);
                                if (match) {
                                    htmlElement.style.setProperty(k, match[1], 'important');
                                } else {
                                    htmlElement.style.setProperty(k, property);
                                }
                            }
                        }
                    } else if (jsxPropsKey.startsWith('data-')) {
                        htmlElement.setAttribute(jsxPropsKey, jsxProps[jsxPropsKey]);
                    } else if (jsxPropsKey == 'class') {
                        htmlElement.className = jsxPropsValue
                    } else {
                        htmlElement[jsxPropsKey] = jsxPropsValue;
                    }
                });
            }
        })
        return htmlElement
    }
}

export default {
    h,
    Fragment: FRAGMENT_TAG
}