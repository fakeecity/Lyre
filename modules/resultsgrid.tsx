import styles from '../styles/Grid.module.css'

export const formatResults = (p: any) => {

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
        <div className={styles.inner}>
            <a href={p[i].result.url} className={styles.thumbnail}><img className={styles.thumbnail} src={p[i].result.song_art_image_thumbnail_url}/></a>
            <div className={styles.mainData}>
                <a href={p[i].result.url}>{p[i].result.title}</a>
                <p>{p[i].result.artist_names}</p>
                <p>Released {p[i].result.release_date_with_abbreviated_month_for_display}</p>
            </div>
        </div>)
    }    

    return (
        <div className={styles.outer}>
            {results}
        </div>
    )
}