module.exports = {
    locales: ['en', 'fr', 'ru'],
    defaultLocale: 'fr',
    "pages": {
        "*": ["common"],
        "/": ["home"],
        "/[pageSlug]": ["pageslug"]
    }
}
  