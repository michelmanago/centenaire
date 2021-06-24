export function blockFormat(page_id, lang, type, position) {
    return {
        page_id: page_id,
        lang: lang,
        content: '',
        position: position,
        type: type,
    }
}

export function pageFormat(locale){
    return ({

        // in case we need to find by id
        temp_id: "page-" + locale,
        // allow to modify the slug without modifying the read-only prefix locale (fr/, en/, /ru)
        slugWithNoLocale: "",

        language: locale,
        page: "",
        pageSlug: "",
        pageName: "",
        author: "",
        created_at: null,
        last_modified: null,
        blocks: []
    })
}