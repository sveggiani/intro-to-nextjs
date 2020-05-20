import Head from 'next/head';
import Header from '@/components/Header/Header';
import EpisodesList from '@/components/EpisodesList/EpisodesList';
import Link from 'next/link';

export default function ShowDetailPage(props) {
  const { data } = props;

  const date = new Date(data.premiered);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return (
    <>
      <Head>
        <title>Introdución a Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <p>
          <small>
            <Link href="/contents/shows">
              <a>⬅ Back to shows list</a>
            </Link>
          </small>
        </p>

        <div className="row">
          <div className="col-50">
            <h2>{data.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.summary }} />

            <div className="row">
              <div className="col-50">
                <h3>Genres</h3>
                <ul>
                  {data.genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>

                <h3>Premiered On</h3>
                <p>
                  {month} {day}, {year}
                </p>
              </div>

              <div className="col-50">
                <EpisodesList showId={data.id} />
              </div>
            </div>
          </div>
          <div className="col-50">
            <img src={data.image.original} alt="{data.name} frame" />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  console.info(`Fetching: ${process.env.API_URL}/shows/${params.id}`);

  const res = await fetch(`${process.env.API_URL}/shows/${params.id}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
