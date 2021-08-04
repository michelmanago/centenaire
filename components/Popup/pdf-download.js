import Link from 'next/link';
import Icons from '../text-editor/Icons';

export default function PdfDownload({url, text}) {
    return (
        <div className="flex flex-wrap justify-center pb-2">
            <div className='flex flex-row p-2 border'>
                <Icons className={'mt-1'} type={'pdf'} />
                <Link href={url}>
                    <a target={'_blank'}>{text}</a>
                </Link>
            </div>
        </div>
    );
}
