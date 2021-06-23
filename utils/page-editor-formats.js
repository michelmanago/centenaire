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
        temp_id: "page-" + locale,
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