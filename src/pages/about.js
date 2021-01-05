import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
      <h1 className="sr-only">About Me</h1>
      <div className="text-lg max-w-prose mx-auto">
        <div className="mt-8 prose prose-blue about-me">
          <p className="greeting">Hi, I’m Michael <span role="img" aria-label="Waving Hand Sign">👋</span></p>
          <p>I’m a web developer currently living in <span className="orange">Orange, <abbr title="California">CA</abbr></span>. I have several years’ experience in creating and maintaining the front end of Magento eCommerce websites.</p>
          <p>I also enjoy working with other web technologies, such as Laravel, React, and Tailwind. Magento is great for making websites that sell stuff, but I find that these frameworks work well in other circumstances.</p>
          <p>I like to spend my spare time gaming, reading, hanging out with my fiancée and with family, watching <span className="eagles">Philadelphia Eagles</span> football, and searching for the best <a href="https://en.wikipedia.org/wiki/Burrito#San_Diego" target="_blank" rel="noopener noreferrer">California burrito</a>.</p>
          <p>If you have any questions or comments, please don't hesitate to send me an email. Thanks!</p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
