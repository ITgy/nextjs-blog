import Layout from '../components/layout.js';
import Tag from '../components/tag/index.js';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date.js';
import { getTagData } from '../lib/posts.js';

export async function getStaticProps() {
    const tagData = getTagData();
    return {
        props: {
            tagData
        }
    }
}

function PostsItem({ postDatas }) {
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

export default function TagPage({ tagData }) {
    const tagLayout = tagData.map(item =>(
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} key={item.archiveTag}>
            <h2 className={utilStyles.headingLg}>{item.archiveTag}</h2>
            <ul className={utilStyles.list}>
                <PostsItem postDatas={item.postDatas}></PostsItem>
            </ul>
        </section>
    ))
    return (
        <Layout>
            <Head>
                <title>标签</title>
            </Head>
            <Tag content="你好，世界"></Tag>
            <h1>标签</h1>
            {tagLayout}
        </Layout>
    )
}