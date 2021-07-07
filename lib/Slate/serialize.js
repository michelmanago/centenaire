import escapeHtml from 'escape-html';
import {jsx} from 'slate-hyperscript';
import {Node, Text} from 'slate';

const formatAttrs = classList => {
    let attrs = {};
    classList.forEach(element => {
        if (element === 'font-bold') attrs['bold'] = true;
        else if (element === 'underline' || element === 'italic') attrs[element] = true;
    });
    return attrs;
};

export const deserialize = el => {
    if (el.nodeType === 3) {
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
    }

    var children = Array.from(el.childNodes).map(deserialize);

    if (children.length == 0) children.push('');

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'BLOCKQUOTE':
            return jsx('element', {type: 'quote', className: el.className}, children);
        case 'CODE':
            return jsx('element', {type: 'code', className: el.className}, children);
        case 'P':
            return jsx('element', {type: 'paragraph', className: el.className}, children);
        case 'H1':
            return jsx('element', {type: 'h1', className: el.className}, children);
        case 'H2':
            return jsx('element', {type: 'h2', className: el.className}, children);
        case 'H3':
            return jsx('element', {type: 'h3', className: el.className}, children);
        case 'DIV':
            return jsx('element', {type: 'div', className: el.className}, children);
        case 'UL':
            return jsx('element', {type: 'bulleted-list', className: el.className}, children);
        case 'OL':
            return jsx('element', {type: 'numbered-list', className: el.className}, children);
        case 'LI':
            return jsx('element', {type: 'list-item', className: `${el.className} link`}, children);
        case 'A':
            return jsx('element', {type: 'link', url: el.getAttribute('href'), className: el.className}, children);
        case 'IMG':
            return jsx('element', {type: 'image', url: el.getAttribute('src'), className: el.className}, children);
        case 'IFRAME':
            return jsx('element', {type: 'video', url: el.getAttribute('src'), className: el.className}, children);
        case 'SPAN':
            var attrs = formatAttrs(el.classList);
            if (el.attributes['data-note']) {
                attrs.tooltip = el.attributes['data-note'].value;
            }
            return jsx('text', attrs, children);
        //return jsx('element', { type: 'list-item' }, children)
        default:
            return el.textContent;
    }
};

export const serializer = value => {
    return value.map(v => serialize(v)).join('');
};

const serialize = node => {
    /*if (Text.isText(node)) {
        let string = escapeHtml(node.text);
        if (node.bold) {
            string = `<strong>${string}</strong>`;
        }
        if (node.underline) {
            string = `<u>${string}</u>`
        }
        if (node.italic) {
            string = `<em>${string}</em>`
        }
        return string;
    }*/
    if (Text.isText(node)) {
        let customCssClass = '';
        if (node.bold) customCssClass = `${customCssClass} font-bold`;
        if (node.underline) customCssClass = `${customCssClass} underline`;
        //if (node.strikethrough) customCssClass = `${customCssClass} line-through`;
        if (node.italic) customCssClass = `${customCssClass} italic`;

        if (customCssClass !== '' || node.tooltip)
            return `<span class="${customCssClass}" ${
                node.tooltip ? `data-js-tooltip data-note="${node.tooltip}"` : ''
            }>${escapeHtml(node.text)}</span>`;
        else return escapeHtml(node.text);
    }

    const children = node.children.map(n => serialize(n)).join('');

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`;
        case 'paragraph':
            return `<p class="${node.className ?? ''}">${children}</p>`;
        case 'h1':
            return `<h1 class="${node.className ?? ''}">${children}</h1>`;
        case 'h2':
            return `<h2 class="${node.className ?? ''}">${children}</h2>`;
        case 'h3':
            return `<h3 class="${node.className ?? ''}">${children}</h3>`;
        case 'div':
            return `<div class="${node.className ?? ''}">${children}</div>`;
        case 'bulleted-list':
            return `<ul class="${node.className ?? ''}">${children}</ul>`;
        case 'numbered-list':
            return `<ol class="${node.className ?? ''}">${children}</ol>`;
        case 'list-item':
            return `<li class="${node.className ?? ''}">${children}</li>`;
        case 'link':
            return `<a href="${escapeHtml(node.url)}" class="${node.className ?? ''} link">${children}</a>`;
        case 'image':
            return `<img src="${escapeHtml(node.url)}" alt="${escapeHtml(node.url)}" class="${
                node.className ?? ''
            }" />`;
        case 'video':
            return `<iframe src="${escapeHtml(node.url)}"></iframe>`;
        default:
            return children;
    }
};
