module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Paperbase Dashboard`,
    author: `Marc Arbesman`,
    description: `A starter dashboard demonstrating Material UI's Paperbase theme in Gatsby`,
    siteUrl: `https://gatsby-starter-paperbase-demo.netlify.com/`,
    social: {
      twitter: `willcode4food`,
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
