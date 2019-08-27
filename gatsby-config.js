module.exports = {
  siteMetadata: {
    title: `Intranet Portal Dashboard`,
    author: `Ondřej Chrastina`,
    description: `Showcase of Kentico Cloud Intranet admin UI using Material design and Gatsby.`,
    siteUrl: `https://cloud-sample-app-intranet-gatsby.netlify.com/`,
    social: {
      twitter: `ChrastinaOndrej`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    {
      resolve: 'gatsby-source-kentico-cloud',
      options: {
        deliveryClientConfig: {
          projectId: '65dafdc3-095a-00f6-76bb-3195d433e992',
          typeResolvers: [],
        },
        languageCodenames: ['default'],
      },
    },
  ],
}
