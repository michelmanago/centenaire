import escapeHtml from 'escape-html';
import {jsx} from 'slate-hyperscript';
import {Node, Text} from 'slate';

function getClassForEffect(effect) {
    switch (effect) {
        case 'align-left':
            return ' text-left';
        case 'align-center':
            return ' text-center';
        case 'align-right':
            return ' text-right';
        default:
            break;
    }
}

function parseClassNameForEffect(eltClassName) {
    var eltClasses = eltClassName.split(' ');
    for (const eltClass of eltClasses) {
        if (eltClass === 'text-left') {
            return 'align-left';
        } else if (eltClass === 'text-center') {
            return 'align-center';
        } else if (eltClass === 'text-right') {
            return 'align-right';
        }
    }
    return null;
}

function removeClassEffect(eltClassName) {
    var eltClasses = eltClassName.split(' ');
    var index = 0;
    for (index = 0; index < eltClasses.length; index++) {
        const eltClass = eltClasses[index];
        if (eltClass === 'text-left' || eltClass === 'text-center' || eltClass === 'text-right') {
            break;
        }
    }
    eltClasses.splice(index, 1);
    var newEltClassName = '';
    for (let index2 = 0; index2 < eltClasses.length; index2++) {
        const eltClass = eltClasses[index2];
        if (index2 === 0) {
            newEltClassName = eltClass;
        } else {
            newEltClassName += ` ${eltClass}`;
        }
    }
    return newEltClassName;
}

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
    var blockElt = {};
    var effect = parseClassNameForEffect(el.className);
    var newClassName = el.className;
    if (effect) {
        blockElt.effect = effect;
        newClassName = removeClassEffect(el.className);
    }
    if (newClassName) {
        blockElt.className = newClassName;
    }
    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'BLOCKQUOTE':
            blockElt.type = 'quote';
            return jsx('element', blockElt, children);
        case 'CODE':
            blockElt.type = 'code';
            return jsx('element', blockElt, children);
        case 'P':
            blockElt.type = 'paragraph';
            return jsx('element', blockElt, children);
        case 'H1':
            blockElt.type = 'h1';
            return jsx('element', blockElt, children);
        case 'H2':
            blockElt.type = 'h2';
            return jsx('element', blockElt, children);
        case 'H3':
            blockElt.type = 'h3';
            return jsx('element', blockElt, children);
        case 'DIV':
            blockElt.type = 'div';
            return jsx('element', blockElt, children);
        case 'UL':
            blockElt.type = 'bulleted-list';
            return jsx('element', blockElt, children);
        case 'OL':
            blockElt.type = 'numbered-list';
            return jsx('element', blockElt, children);
        case 'LI':
            blockElt.type = 'list-item';
            return jsx('element', blockElt, children);
        case 'A':
            blockElt.type = 'link';
            return jsx(
                'element',
                {type: 'link', url: el.getAttribute('href'), className: `${el.className} link`},
                children,
            );
        case 'IMG':
            blockElt.type = 'image';
            blockElt.url = el.getAttribute('src');
            return jsx('element', blockElt, children);
        case 'IFRAME':
            blockElt.type = 'video';
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

    const classEffect = getClassForEffect(node.effect);
    //node.className += classEffect;

    switch (node.type) {
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`;
        case 'paragraph':
            return `<p class="${node.className ?? ''} ${classEffect ?? ''}">${children}</p>`;
        case 'h1':
            return `<h1 class="${node.className ?? ''} ${classEffect ?? ''}">${children}</h1>`;
        case 'h2':
            return `<h2 class="${node.className ?? ''} ${classEffect ?? ''}">${children}</h2>`;
        case 'h3':
            return `<h3 class="${node.className ?? ''} ${classEffect ?? ''}">${children}</h3>`;
        case 'div':
            return `<div class="${node.className ?? ''} ${classEffect ?? ''}">${children}</div>`;
        case 'bulleted-list':
            return `<ul class="${node.className ?? ''} ${classEffect ?? ''}">${children}</ul>`;
        case 'numbered-list':
            return `<ol class="${node.className ?? ''} ${classEffect ?? ''}">${children}</ol>`;
        case 'list-item':
            return `<li class="${node.className ?? ''} ${classEffect ?? ''}">${children}</li>`;
        case 'link':
            return `<a href="${escapeHtml(node.url)}" class="${node.className ?? ''} link ${
                classEffect ?? ''
            }">${children}</a>`;
        case 'image':
            return `<img src="${escapeHtml(node.url)}" alt="${escapeHtml(node.url)}" class="${node.className ?? ''} ${
                classEffect ?? ''
            }" />`;
        case 'video':
            return `<iframe src="${escapeHtml(node.url)}"></iframe>`;
        default:
            return children;
    }
};
