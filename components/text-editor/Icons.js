import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Link,
    ListBulleted,
    ListNumbered,
    AlignLeft,
    AlignRight,
    AlignCenter,
    AlignJustify,
    Image,
    Video,
    Music,
} from './icon';

export default function Icons({type}) {
    switch (type) {
        case 'bold':
            return <Bold isActive={true} />;
        case 'underline':
            return <Underline isActive={true} />;
        case 'italic':
            return <Italic isActive={true} />;
        case 'align-left':
            return <AlignLeft isActive={true} />;
        case 'align-center':
            return <AlignCenter isActive={true} />;
        case 'align-right':
            return <AlignRight isActive={true} />;
        case 'bulleted-list':
            return <ListBulleted isActive={true} />;
        case 'numbered-list':
            return <ListNumbered isActive={true} />;
        case 'link':
            return <Link />;
        case 'image':
            return <Image />;
        case 'video':
            return <Video />;
        default:
            return <>{type}</>;
    }
}
