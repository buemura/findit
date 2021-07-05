import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="icons/logo.png" type="image/png"/>

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body style={{margin:0, padding:0, boxSizing:'border-box'}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}