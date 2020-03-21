import React from "react"
import { Link, graphql } from "gatsby"
import { remarkForm } from "gatsby-tinacms-remark";

import { inlineRemarkForm } from "gatsby-tinacms-remark"
import { Wysiwyg } from "@tinacms/fields"
import { TinaField } from "tinacms"
import { Button as TinaButton } from "@tinacms/styles"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  // const { isEditing, setIsEditing } = this.props;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </TinaField>
    </Layout>
  );
}

const BlogPostForm = {
  fields: [
    {
      label: "Title",
      name: "frontmatter.title",
      description: "Enter the title of the post here",
      component: "text",
    },
    {
      label: "Description",
      name: "frontmatter.description",
      description: "Enter the post description",
      component: "textarea",
    },
  ],
}

// export default BlogPostTemplate
// export default remarkForm(BlogPostTemplate, BlogPostForm);
export default inlineRemarkForm(BlogPostTemplate, BlogPostForm);

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
            ...TinaRemark
        }
    }
`
