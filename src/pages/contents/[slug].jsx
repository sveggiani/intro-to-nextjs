import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';

export default function Contents(props) {
  const { title, tags, contentHtml } = props;
  return (
    <main>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}

const pagesDirectory = path.join(
  process.cwd(),
  'src',
  'pages',
  'contents',
  'src'
);

const contentFilenames = fs.readdirSync(pagesDirectory);

const contentPaths = contentFilenames.map((filename) => {
  const filePath = path.join(pagesDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const frontmatter = matter(fileContents);

  return {
    filePath,
    fileContents,
    frontmatter,
  };
});

export async function getStaticPaths() {
  const paths = contentPaths.map((filename) => {
    return { params: { slug: filename.frontmatter.data.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const currentFile = contentPaths.find(
    (file) => file?.frontmatter?.data?.slug === params.slug
  );
  const processedContent = await remark()
    .use(html)
    .process(currentFile.frontmatter.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      ...currentFile.frontmatter.data,
      contentHtml,
    },
  };
}
