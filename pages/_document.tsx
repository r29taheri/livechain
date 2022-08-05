import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body
          style={{
            background:
              'background-image: linear-gradient(to right top, #030634, #000f3f, #00154a, #011a56, #012062, #00236f, #00257c, #002789, #002499, #001fa9, #0d16b8, #2200c6);',
          }}
        >
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
