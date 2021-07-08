
// libs
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// utils
import getAvailableSlug from '../../../utils/fetch/getAvailableSlug';
import cleanForSlug from '../../../utils/cleanForSlug';

const InputSlug = ({slugWithoutLocale, originalSlug, setSlug, currentLanguage}) => {


    // hooks
    const { defaultLocale} = useRouter()

    // state
    const [opened, setOpened] = useState(false);
    const [origin, setOrigin] = useState('');

    // effects
        // find app url
        useEffect(() => {
            setOrigin(window.location.origin);
        }, []);

    // methods
    const onValidateSlug = async () => {

        // with no locale
        let ouputSlug = ""

        const cleanedSlugWithoutLocale = cleanForSlug(slugWithoutLocale);
        const cleanedSlug = currentLanguage + "/" + cleanedSlugWithoutLocale

        if(originalSlug !== cleanedSlug){

            const checkedSlug = await getAvailableSlug(cleanedSlug)
            ouputSlug = checkedSlug.replace(currentLanguage + "/", "")

        } else {
            ouputSlug = cleanedSlugWithoutLocale
        }


        setSlug(ouputSlug);
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
        <div className=" flex mb-6 ">
            {/* Label */}
            <label style={permalinkLabelStyle} className="mr-5 mb-1 block font-medium" htmlFor="inputSlug">
                Permalien
            </label>

            {/* Input container */}
            <div className={`border rounded px-3 py-2 w-full flex ${opened ? 'border-blue-500' : ''}`}>
                {/* Label */}
                <label htmlFor="inputSlug" className="text-gray-500">
                    {`${slugLocale}/`}
                </label>

                {/* Input */}
                <input
                    disabled={!opened}
                    onChange={e => setSlug(e.target.value)}
                    value={slugWithoutLocale}
                    id="inputSlug"
                    className="flex-1 outline-none"
                    type="text"
                    placeholder="le-titre-de-ma-page"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center pl-5">
                {/* When closed */}
                {!opened && (
                    <button
                        onClick={() => setOpened(true)}
                        className="px-2 py-1 text-white bg-blue-500 border rounded"
                    >
                        Modifier
                    </button>
                )}

                {/* When open */}
                {opened && (
                    <>
                        <button onClick={onValidateSlug} className="w-8 h-6 text-xs text-gray-500 border border-gray-500 rounded">
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