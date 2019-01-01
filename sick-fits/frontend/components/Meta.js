import Head from 'next/head';

const Meta = () => (
<Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    {/*external css -- cute little red thing on links*/}
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Sick Fits!</title>
</Head>
);

export default Meta;