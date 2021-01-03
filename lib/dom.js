"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.h = exports.appendChildren = exports.Fragment = void 0;
var reactivity_1 = require("@vue/reactivity");
var IMPORTANT_REGEX = /(.*)\W+!important\W*$/;
exports.Fragment = 'Fragment';
function appendChildren(parent, children) {
    reactivity_1.effect(function () {
        var renderChildren = __spread(children);
        while (parent.firstChild)
            parent.removeChild(parent.firstChild);
        for (var i = 0; i < renderChildren.length; i++) {
            var child = reactivity_1.unref(renderChildren[i]);
            if (child != null) {
                if (typeof child != 'object') {
                    child = document.createTextNode(child);
                }
                else if (Array.isArray(child)) {
                    renderChildren.splice.apply(renderChildren, __spread([i, 1], child));
                    i--;
                    continue;
                }
                parent.appendChild(child);
            }
        }
    });
}
exports.appendChildren = appendChildren;
function h(tagName, jsxProps) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (typeof tagName == 'function') {
        return tagName.apply(void 0, __spread([jsxProps], children));
    }
    else if (typeof tagName == 'string') {
        var htmlElement = createElement(tagName, reactivity_1.unref(jsxProps));
        appendChildren(htmlElement, children);
        return htmlElement;
    }
    else {
        throw "invalid tagName " + tagName;
    }
}
exports.h = h;
function createElement(tagName, jsxProps) {
    if (tagName == exports.Fragment) {
        return document.createDocumentFragment();
    }
    else {
        var htmlElement_1 = document.createElement(tagName);
        reactivity_1.effect(function () {
            if (jsxProps != null) {
                Object.keys(jsxProps).forEach(function (jsxPropsKey) {
                    var e_1, _a, e_2, _b;
                    var jsxPropsValue = reactivity_1.unref(jsxProps[jsxPropsKey]);
                    if (jsxPropsKey == 'data' && typeof jsxPropsValue == 'object' && jsxPropsValue != null) {
                        try {
                            for (var _c = __values(Object.keys(jsxPropsValue)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var k = _d.value;
                                htmlElement_1.setAttribute(k, reactivity_1.unref(jsxPropsValue[k]));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else if (jsxPropsKey == 'style' && jsxPropsValue != null) {
                        if (typeof jsxPropsValue == 'string') {
                            htmlElement_1.style.cssText = jsxPropsValue;
                        }
                        else if (typeof jsxPropsValue == 'object') {
                            try {
                                for (var _e = __values(Object.keys(jsxPropsValue)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var k = _f.value;
                                    var property = reactivity_1.unref(jsxPropsValue[k]);
                                    var match = IMPORTANT_REGEX.exec(property);
                                    if (match) {
                                        htmlElement_1.style.setProperty(k, match[1], 'important');
                                    }
                                    else {
                                        htmlElement_1.style.setProperty(k, property);
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                    else if (jsxPropsKey.startsWith('data-')) {
                        htmlElement_1.setAttribute(jsxPropsKey, jsxProps[jsxPropsKey]);
                    }
                    else if (jsxPropsKey == 'class') {
                        htmlElement_1.className = jsxPropsValue;
                    }
                    else {
                        htmlElement_1[jsxPropsKey] = jsxPropsValue;
                    }
                });
            }
        });
        return htmlElement_1;
    }
}
exports.default = {
    h: h,
    Fragment: exports.Fragment
};
