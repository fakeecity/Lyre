import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import SearchBar from '../modules/searchbar'
import {Header} from '../modules/header'
import {formatResults} from '../modules/resultsgrid'

/*async function getQuery (query: any, pageNum: any) {
  try {
    const response = await (await fetch(`https://api.genius.com/search?per_page=20&q=${encodeURIComponent(query.search)}`,
    { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.GENIUS_AUTH}`,
        'Content-Type': 'application/json'
      }
    })).json()
  }
  catch {
    return 'error'
  }
}

async function parseParams (query: any) {

}*/

export async function getServerSideProps(context: any) {
  const query = context.query;
  if(!query.search) {
    if(query.title) {
      query.search = query.title;
    }
    else if(query.artist) {
      query.search = query.artist;
    }
    else if(query.feat) {
      query.search = query.feat
    }
  }
  const response = await (await fetch(`https://api.genius.com/search?per_page=20&q=${encodeURIComponent(query.search)}`,
  { 
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.GENIUS_AUTH}`,
      'Content-Type': 'application/json'
    }
  })).json()

  console.log(response)

  const results = response.response.hits;

  if(results.length == 0) {
    return {
      props: {results}
    }
  }

  if(query.artist) {
    for (var index in results) {
      if(results[index] === null) {
        continue;
      }
      if(results[index].result.artist_names.toLowerCase().indexOf(query.artist.toLowerCase()) === -1) {
        results[index] = null;
      }
    }
  }

  if(query.title) {
    for (var index in results) {
      if(results[index] === null) {
        continue;
      }
      if(results[index].result.full_title.toLowerCase().indexOf(query.title.toLowerCase()) === -1) {
        results[index] = null;
      }
    }
  }

  if(query.before) {
    for (var index in results) {
      if(results[index] === null) {
        continue;
      }
      const released = new Date(results[index].result.release_date_components.year, results[index].result.release_date_components.month, results[index].result.release_date_components.day)
      const parsedInput = new Date(query.before)
      if(released >= parsedInput) {
        results[index] = null;
      }
    }
  }

  if(query.after) {
    for (var index in results) {
      if(results[index] === null) {
        continue;
      }
      const released = new Date(results[index].result.release_date_components.year, results[index].result.release_date_components.month, results[index].result.release_date_components.day)
      const parsedInput = new Date(query.after)
      if(released < parsedInput) {
        results[index] = null;
      }
    }
  }

  if(query.feat) {
    for (var index in results) {
      if(results[index] === null) {
        continue;
      }
      if (results[index].result.featured_artists.length == 0) {
        results[index] = null;
      }
      else {
        for (var feats in results[index].featured_artists) {
          if(results[index].result.featured_artists[feats].toLowerCase().indexOf(query.feat.toLowerCase()) === -1) {
            results[index] = null;
            break;
          }
        }
      }
    }
  }

  const parsedResults = results.filter((result: any) => result )

  return {
    props: {parsedResults}
  }
}
const Search: NextPage = ( {parsedResults}: any ) => {

  const final = formatResults(parsedResults)

  return (
    <div className={styles.container}>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <p>Lyre!</p>
        </h1>

        <p className={styles.description}>
          A better client for Genius.com searches. Start by making your first <a href='/tutorial'>Query</a>.
        </p>

        <SearchBar />

        {final}

      </main>
    </div>
  )
}

export default Search