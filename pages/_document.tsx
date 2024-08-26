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

          <script
            async
            src="https://widget.kapa.ai/kapa-widget.bundle.js"
            data-website-id="2e65478c-ab3c-4bf2-b997-db8a398de4a5"
            data-project-name="Dwolla"
            data-search-mode-enabled
            data-project-color="#2d2d48"
            data-button-border-radius="10px"
            data-button-image-width="34"
            data-button-image-height="39"
            data-button-text-font-family="Poppins, sans-serif"
            data-button-text-font-weight="400"
            data-modal-image-width="34"
            data-modal-image-height="39"
            data-modal-title-font-family="Poppins, sans-serif"
            data-modal-title-font-weight="500"
            data--font-family="Roboto, sans-serif"
            data-project-logo="/assets/images/dwolla-logo-color.png"
            data-user-analytics-fingerprint-enabled="true"
            data-modal-disclaimer="Meet Dwolla Koala, Dwolla's friendly AI assistant! While Koala
            studies hard to answer your questions based on the latest information, remember, machines
            are still learning, and Dwolla does not guarantee the responses Koala provides are
             accurate, up-to-date or complete. It's always a good idea to double-check answers
             with our docs for ultimate accuracy. To help Koala grow smarter, conversations may
             be logged for training purposes. Keep things professional – don’t share sensitive
             information or PII with Koala please! If this disclaimer doesn't sit right, we
             recommend you don’t use Koala.  All conversations with Koala are subject to
             [Dwolla's Privacy Policy](https://www.dwolla.com/legal/privacy)."
          ></script>

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
