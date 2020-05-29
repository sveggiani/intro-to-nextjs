import Head from 'next/head';
import Header from '@/components/Header/Header';
import Link from 'next/link';

export default function ShowsPage(props) {
  const { data: shows } = props;

  return (
    <>
      <Head>
        <title>Introdución a Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h2>Server-side Rendering</h2>
        <p>
          This page fetches a list of{' '}
          <span role="img" aria-label="bat emoji">
            🦇
          </span>{' '}
          <em>Batman</em> TV shows from:<code>{process.env.API_URL}</code>
        </p>

        {shows && (
          <ol>
            {shows.map((showItem) => (
              <li key={showItem.show.id}>
                <Link
                  href="/contents/shows/[id]"
                  as={`/contents/shows/${showItem.show.id}`}
                >
                  <a>{showItem.show.name}</a>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  console.info(`Fetching: ${process.env.API_URL}/search/shows?q=batman`);

  const res = await fetch(`${process.env.API_URL}/search/shows?q=batman`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
