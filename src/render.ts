/**
 * Helper method to render a node to a parent container
 */

export function render(content: Node | Node[], root: Node | string): void {
    const $root = typeof root == 'string' ? document.querySelector(root) : root;

    if ($root == null) {
        throw new Error('Render root not found!');
    }

    while ($root.lastChild) {
        $root.removeChild($root.lastChild);
    }

    if (Array.isArray(content)) {
        content.forEach(c => $root.appendChild(c));
    } else {
        $root.appendChild(content);
    }
}