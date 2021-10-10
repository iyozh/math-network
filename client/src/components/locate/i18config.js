import i18n from 'i18next'
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import languageRU from './ru/translate.json'
import languageEN from './en/translate.json'
i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ru: languageRU,
            en: languageEN
        },
        fallbackLng: "en",
        detection: {
            order: ["localStorage"],
            caches: ["localStorage"],
        },
        debug: false,
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
            wait: true,
            bindI18n: 'languageChanged loaded',
            bindStore: 'added removed',
            nsMode: 'default',
            useSuspense: false,
        },
    })

export default i18n;