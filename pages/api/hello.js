// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getTests from '../../model/test';

export default async (req, res) => {
    const testData = await getTests();
    res.statusCode = 200;
    res.json({name: 'John Doe', testData: testData});
};
