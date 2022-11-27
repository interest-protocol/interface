import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ReactNode } from 'react';

const MyDocument = (): ReactNode => (
  <Html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body id="body">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export const getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => App,
      enhanceComponent: (Component) => Component,
    });

  const initialProps = await Document.getInitialProps(ctx);

  return initialProps;
};

export default MyDocument;
