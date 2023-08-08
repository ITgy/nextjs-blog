import Layout from '../components/layout.js';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date.js';
import { parseISO, format } from 'date-fns';
import { getArchiveData } from '../lib/posts.js';

export async function getStaticProps() {
    const archiveData = getArchiveData();
    return {
        props: {
            archiveData
        }
    }
}

function ArchiveItem({ postDatas }) {
    return postDatas.map(item => (
        <li className={utilStyles.listItem} key={item.id}>
            <Link href={`/posts/${item.id}`}>{item.title}</Link>
            <br></br>
            <small className={utilStyles.lightText}>
                <Date dateString={item.date}></Date>
            </small>
        </li>
    ))
}

export default function Archive({ archiveData }) {
    const archiveLayout = archiveData.map(item =>(
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} key={item.archiveDate}>
            <h2 className={utilStyles.headingLg}>{format(parseISO(item.archiveDate), 'yyyy-MM月')}</h2>
            <ul className={utilStyles.list}>
                <ArchiveItem postDatas={item.postDatas}></ArchiveItem>
            </ul>
        </section>
    ))
    return (
        <Layout>
            <Head>
                <title>归档</title>
            </Head>
            <h1 className={utilStyles.textCenter}>归档</h1>
            {archiveLayout}
        </Layout>
    )
}