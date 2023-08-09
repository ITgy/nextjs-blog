import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import Avatar from './avatar/index';
import {useRef, useState} from 'react';

const name = 'Fire';
export const siteTitle = 'What can you find in this place';

export default function Layout({ children, home }) {
    const mainObj = useRef(null);
    const [showToTop, setShowToTop] = useState(false);

    function handleToTop(){
        mainObj.current.scrollTo(0, 0)
    }
    function handleScroll(event){
        if(event.target.scrollTop > 100){
            setShowToTop(true)
        } else {
            setShowToTop(false)
        }
    }

    return (
        <div className={`${styles.container}`}>
            <Head>
                <link rel="icon" href="/favicon.ico"></link>
                <meta name="description" content="Learn how to build a personal website using Next.js"></meta>
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle}></meta>
                <meta name="twitter:card" content="summary_large_image"></meta>
            </Head>
            <header className={styles.header}>
                {home && (
                    <>
                        <Avatar url="/images/avatar.jpg"></Avatar>
                        {/* <h1 className={utilStyles.heading2Xl}>{name}</h1> */}
                    </>
                )}
            </header>
            <main ref={mainObj} onScroll={handleScroll} className={styles.main}>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                    {showToTop && <a className={styles.GoToTop} onClick={handleToTop}>↑ Go to top</a>}
                </div>
            )}
        </div>
    )
}