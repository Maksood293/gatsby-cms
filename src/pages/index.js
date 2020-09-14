import React from "react"
// import { Link } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"
// import get from "lodash/get"
import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import ArticlePreview from "./artical"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const IndexPage = ({ data }) => {
  const firstRichContent = data.allContentfulRichContent.nodes[0]
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="heading1">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="heading2">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="heading3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="heading4">{children}</h4>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
        <img src={`https:${node.data.target.fields.file["en-US"].url}`} />
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="copy">{children}</p>
      ),
    },
    renderMark: {},
  }

  // const title = get(this, "data.allContentfulBlogPost.edges.node.title")
  // const title1 = data.map(node => (
  //   <h1>
  //     <ArticlePreview article={node} />
  //   </h1>
  // ))
  return (
    <>
      <Layout>
        {data.allContentfulRichContent.nodes.map(lesson => (
          <div>
            <h2>{lesson.title}</h2>
          </div>
        ))}
        <h1>hello gatsby</h1>
        {documentToReactComponents(firstRichContent.content.json, options)}
        <p>Welcome to your new Gatsby site.</p>
      </Layout>
    </>
  )
}
export const query = graphql`
  {
    allContentfulRichContent {
      nodes {
        title
        content {
          json
        }
      }
    }
  }
`
export default IndexPage
