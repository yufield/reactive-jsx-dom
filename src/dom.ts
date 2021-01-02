import {effect, isRef} from '@vue/reactivity';

const TAGNAME_REGEX = /([.#]?[^\s#.]+)/;
const IMPORTANT_REGEX = /(.*)\W+!important\W*$/;

export type Props<T extends object = any> = {
    children: (string | Node)[];
} & { [K in keyof T]: T[K] };

export function Fragment(props: Props) {
    return drainChildren(document.createDocumentFragment(), props.children);
}

export type Factory = (props?: Props) => Node;

function addClass(el: HTMLElement, ...classNames: string[]): void {
    const names = el.className.split(' ');
    for (const name of classNames) {
        if (names.indexOf(name) == -1) {
            names.push(name);
        }
    }

    el.className = names.join(' ');
}

function startsWith(haystack: string, needle: string): boolean {
    return haystack.substring(0, needle.length) == needle;
}

function isNode(node: any): node is Node {
    return node && node.nodeType;
}

// tagname, id, class
function createElement(tagName: string): HTMLElement {
    const matches = tagName.split(TAGNAME_REGEX);
    let el: HTMLElement;

    for (let idx = 1; idx < matches.length; idx += 2) {
        const value = matches[idx];
        const char = value[0];

        if (!el) {
            if (char == '#' || char == '.') {
                el = document.createElement('div');
            } else {
                el = document.createElement(value);
                continue;
            }
        }

        if (char == '#') {
            el.id = value.slice(1);
        } else if (char == '.') {
            addClass(el, value.slice(1));
        }
    }

    return el;
}


// TODO: only top level draining
export function drainChildren<T extends Node>(parent: T, children: any[]): T {
    effect(() => {
        let renderChildren =[...children]
        while (parent.firstChild) parent.removeChild(parent.firstChild)
        for (let i = 0; i < renderChildren.length; i++) {
            let child = renderChildren[i]
            if (child != null) {
                if (isRef(child)) {
                    child = child.value
                }
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

    return parent;
}

export function h(tagName: string, ...children: (string | Node)[]): Node;
export function h(tagName: string, props?: Props | string, ...children: (string | Node)[]): Node;
export function h(tagName: Factory, props?: Props, ...children: (string | Node)[]): Node;
export function h(tagName: typeof Fragment, props?: Props, ...children: (string | Node)[]): Node;
export function h(tagName: string | Factory | typeof Fragment, props?: Props | string | Node, ...children: (string | Node)[]): Node {
    if (typeof tagName == 'function') {
        let componentProps: Props = {children};
        if (props != null) {
            if (typeof props == 'object' && !isNode(props)) {
                componentProps = {...props};
            } else {
                children.unshift(props as any);
            }
        }

        return tagName(componentProps);
    }

    const el = createElement(tagName);

    if (props != null) {
        if (typeof props != 'object' || isNode(props)) {
            children.unshift(props);
        } else {
            Object.keys(props).forEach(key => {
                const value = props[key];
                const type = typeof value;

                // if value is a function add as event remove on prefix and hyphenate
                if (key == 'data') {
                    if (type == 'object' && value != null) {
                        for (const k of Object.keys(value)) {
                            el.setAttribute(k, value[k]);
                        }
                    }
                } else if (key == 'style') {
                    if (type == 'string') {
                        el.style.cssText = value;
                    } else if (type == 'object' && value != null) {
                        for (const k of Object.keys(value)) {
                            const match = IMPORTANT_REGEX.exec(value[k]);

                            if (match) {
                                el.style.setProperty(k, match[1], 'important');
                            } else {
                                el.style.setProperty(k, value[k]);
                            }
                        }
                    }
                } else if (type == 'function') {
                    const lower = key.toLowerCase();

                    if (startsWith(lower, 'on')) {
                        el.addEventListener(lower.substring(2), value, false);
                    }
                } else if (startsWith(key, 'data-')) {
                    el.setAttribute(key, props[key]);
                } else {
                    el[key] = props[key];
                }
            });
        }
    }

    return drainChildren(el, children);
}

export default {
    h,
    Fragment
}