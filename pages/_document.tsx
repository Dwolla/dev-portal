import Document, { Head, Html, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import React from "react";
import createEmotionCache from "../app/modules/emotion-cache";
import theme from "../app/theme";

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const originalRenderPage = context.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhancedApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(context);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/0.5.0/modern-normalize.min.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap"
            rel="stylesheet"
          />

          <meta name="emotion-insertion-point" content="" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
