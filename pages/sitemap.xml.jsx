import * as fs from 'fs';
import {getAllPages} from '../model/page';
const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ctx => {
    const {req, res, locale, resolvedUrl} = ctx;
    console.log({headers: resolvedUrl});
    const BASE_URL = `${req.headers.host.startsWith('localhost') ? 'http' : 'https'}://${req.headers.host}`;

    const staticPaths = fs
        .readdirSync('pages')
        .filter(staticPage => {
            return ![
                'api',
                'admin',
                'editor',
                '[pageSlug].js',
                '_app.js',
                '_document.js',
                '404.js',
                'sitemap.xml.jsx',
                'newpassword',
                'video.js',
            ].includes(staticPage);
        })
        .map(staticPagePath => {
            return `${BASE_URL}/${locale}/${staticPagePath.split('.')[0]}`;
        });

    const pages = await getAllPages(locale);
    const dynamicPaths = pages.map(singlePage => {
        return `${BASE_URL}/${singlePage.pageSlug}`;
    });

    const allPaths = [...staticPaths, ...dynamicPaths];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${allPaths
              .map(url => {
                  return `
                <url>
                  <loc>${url}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `;
              })
              .join('')}
        </urlset>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
