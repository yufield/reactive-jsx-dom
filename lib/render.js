"use strict";
/**
 * Helper method to render a node to a parent container
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
function render(content, root) {
    var $root = typeof root == 'string' ? document.querySelector(root) : root;
    if ($root == null) {
        throw new Error('Render root not found!');
    }
    while ($root.lastChild) {
        $root.removeChild($root.lastChild);
    }
    if (Array.isArray(content)) {
        content.forEach(function (c) { return $root.appendChild(c); });
    }
    else {
        $root.appendChild(content);
    }
}
exports.render = render;
