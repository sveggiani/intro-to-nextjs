import { useState } from 'react';
import styles from './EpisodesList.module.scss';

export default function EpisodesList(props) {
  const { showId } = props;

  const [episodes, setEpisodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getEpisodes = async (id) => {
    const res = await fetch(`http://api.tvmaze.com/shows/${id}/episodes`);
    const data = await res.json();

    return data;
  };

  const handleClick = async () => {
    setIsFetching(true);
    getEpisodes(showId)
      .then((data) => {
        setEpisodes(data);
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Episodes List</h4>
      {isFetching ? (
        <p>Fetching episodes...</p>
      ) : (
        <>
          {episodes.length ? (
            <ol className={styles.list}>
              {episodes.map((episode) => (
                <li key={episode.id}>{episode.name}</li>
              ))}
            </ol>
          ) : (
            <button
              onClick={() => handleClick()}
              className={styles.button}
              type="button"
            >
              Get episodes list
            </button>
          )}
        </>
      )}
    </div>
  );
}
