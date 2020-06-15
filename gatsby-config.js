require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Dashboard`,
    author: `Ondřej Chrastina`,
    description: `Showcase of Kentico Kontent Intranet admin UI using Material design and Gatsby.`,
    siteUrl: `https://kontent-sample-app-gatsby-intranet.netlify.com/`,
    social: {
      twitter: `ChrastinaOndrej`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    {
      resolve: '@kentico/gatsby-source-kontent',
      options: {
        projectId: process.env.KONTENT_PROJECT_ID, // Fill in your Project ID
        // if false used authorization key for secured API
        usePreviewUrl:
          process.env.KONTENT_PREVIEW_ENABLED && process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true',
        authorizationKey:
          process.env.KONTENT_PREVIEW_ENABLED && process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true'
            ? process.env.KONTENT_PREVIEW_KEY
            : undefined,
        languageCodenames: process.env.KONTENT_LANGUAGE_CODENAMES.split(',').map(lang => lang.trim()),
      },
    },
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: 'en',
        langKeyForNull: 'en',
        prefixDefault: false,
        useLangKeyLayout: false,
      },
    },
  ],
};
