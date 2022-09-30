import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchBar from '../modules/searchbar'
import {Header} from '../modules/header'
import Router from 'next/router'

const Home: NextPage = () => {

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

      </main>
    </div>
  )
}

export default Home
