
// libs
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// utils
import checkSlugExistance from '../../../utils/checkSlugExistance';
import cleanForSlug from '../../../utils/cleanForSlug';
const getProperSlug = (slugWithNoLocale, langue) => langue + "/" + slugWithNoLocale

const InputSlug = ({slug, setSlug, currentLanguage}) => {

    // hooks
    const { defaultLocale} = useRouter()

    // state
    const [opened, setOpened] = useState(false);
    const [origin, setOrigin] = useState('');

    // effects
        // find app url
        useEffect(() => {
            setOrigin(window.location.origin);
        }, [slug]);

    // methods
    const onSubmit = async () => {


        const cleanedSlug = cleanForSlug(slug);
        // const properAndCleanedSlug = getProperSlug(cleanedSlug, currentLanguage)
        const checkedSlug = await checkSlugExistance(cleanedSlug);

        setSlug(checkedSlug);
        setOpened(false);
    };

    // utils
    // escape default language
    // const slugLocale = currentLanguage !== defaultLocale ? (currentLanguage) : ""
    const slugLocale = currentLanguage

    // styles
    const permalinkLabelStyle = {
        width: 140
    }

    return (
        <div className="flex items-center mb-6 ">
            {/* Label */}
            <label style={permalinkLabelStyle} className="mr-5 font-semibold" htmlFor="inputSlug">
                Permalien :{' '}
            </label>

            {/* Input container */}
            <div className={`border rounded px-3 py-2 w-full ${opened ? 'border-blue-500' : ''}`}>
                {/* Label */}
                <label htmlFor="inputSlug" className="text-gray-500">
                    {`${origin}/${slugLocale}`}
                </label>

                {/* Input */}
                <input
                    disabled={!opened}
                    onChange={e => setSlug(e.target.value)}
                    value={slug}
                    id="inputSlug"
                    className="w-1/2 outline-none"
                    type="text"
                    placeholder="le-titre-de-ma-page"
                />
            </div>

            {/* Actions */}
            <div className="w-1/4 ml-3">
                {/* When closed */}
                {!opened && (
                    <button
                        onClick={() => setOpened(true)}
                        className="w-full px-2 py-1 text-white bg-blue-500 border rounded"
                    >
                        Modifier
                    </button>
                )}

                {/* When open */}
                {opened && (
                    <>
                        <button onClick={onSubmit} className="px-2 py-1 text-gray-500 border border-gray-500 rounded">
                            OK
                        </button>
                        <button onClick={() => setOpened(false)} className="px-2 py-1 underline">
                            Annuler
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default InputSlug