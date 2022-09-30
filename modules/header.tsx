import styles from '../styles/Header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <a className={styles.homelink} href='/'>LY<br/>RE</a>
            <div>
                <a href='/tutorial'>Tutorial</a>
                <a href='/about'>About</a>
            </div>
        </header>
    )
}