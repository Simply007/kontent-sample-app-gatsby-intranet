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
        deliveryClientConfig: {
          projectId: '65dafdc3-095a-00f6-76bb-3195d433e992',
          typeResolvers: [],
        },
        languageCodenames: ['default', 'cs'],
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
