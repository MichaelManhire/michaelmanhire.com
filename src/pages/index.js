import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <h1 className="sr-only">Blog</h1>
      <ol>
        {posts.map((post, index) => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug} className={index !== 0 ? 'mt-8' : ''}>
              <article itemScope itemType="http://schema.org/Article">
                <Link to={post.fields.slug} itemProp="url">
                  <header>
                    <p className="text-sm text-gray-500">
                      <time>{post.frontmatter.date}</time>
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900" itemProp="headline">{title}</h2>
                  </header>
                  <section>
                    <p
                      className="mt-3 text-base text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </Link>
                <footer className="mt-3">
                  <Link className="text-base font-semibold text-blue-600 hover:text-blue-500" to={post.fields.slug} itemProp="url">
                    Read full post
                  </Link>
                </footer>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
