import styles from '../styles/Grid.module.css'

export const formatResults = (p: any) => {
    if(p == null) {
        return (<div className={styles.outer}>
            <p>No Results. Try widening your search criteria.</p>
        </div>)
    }
    const results = []
    for (var i = 0; i < p.length; i++) {
        if(p[i].result.artist_names.length >= 25) {
            p[i].result.artist_names = p[i].result.artist_names.substring(0,24) + '...'
        }
        if(p[i].result.title.length >= 25) {
            p[i].result.title = p[i].result.title.substring(0,24) + '...'
        }
        if(p[i].result.release_date_with_abbreviated_month_for_display === null) {
            p[i].result.release_date_with_abbreviated_month_for_display = '(N/A)'
        }

        results.push(
        <a href={p[i].result.url} className={styles.inner}>
            <img className={styles.thumbnail} src={p[i].result.song_art_image_thumbnail_url}/>
            <div>
                <p>{p[i].result.title}</p>
                <p>{p[i].result.artist_names}</p>
                <p>Released {p[i].result.release_date_with_abbreviated_month_for_display}</p>
            </div>
        </a>)
    }    

    return (
        <div className={styles.outer}>
            {results}
        </div>
    )
}