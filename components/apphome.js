import parse from 'html-react-parser'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'


export default function AppHome ({currentLanguage}) {

    const {t} = useTranslation()
    return (
        <div className="bg-pyellow">
            <div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
                <main className="bg-white pt-4 px-5 sm:px-48">
                   <h2 className="">{t("home:title")}</h2>
                    <p className="pb-2">{t("home:paragraph_1")}</p>
                    <p className="pb-2">{t("home:paragraph_2")}</p>
                    <p className="pb-2">{t("home:paragraph_3")}</p>
                    <p className="pb-2">{t("home:paragraph_4")}</p>
                    <img className="mx-auto" src="static/img/logo-INA.jpg"></img>
                </main>
            </div>
        </div>
	)
}
