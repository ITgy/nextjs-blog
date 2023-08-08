import Layout from '../components/layout.js';
import Tag from '../components/tag/index.js';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import tagStyles from '../styles/tag.module.css';
import Date from '../components/date.js';
import { getTagData } from '../lib/posts.js';
import {useState} from 'react';

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
    const [tagList, setTagList] = useState(tagData.map(item => {
        return {
            tagName: item.archiveTag,
            indicte: true
        }
    }));
    const [postsData, setPostsData] = useState(tagData);

    function handleSelect(tagInfo){
        setTagList(tagList.map(item => {
            if(item.tagName === tagInfo.tagName){
                tagInfo.indicte = !tagInfo.indicte;
            }
            return item;
        }))
        getTagListByTagName(tagList.filter(item => item.indicte).map(item=>item.tagName));
    }

    function getTagListByTagName(tagNames){
        setPostsData(tagData.filter(item => tagNames.includes(item.archiveTag)));
    }

    const tagLayout = postsData.map(item => (
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
            <h1 className={utilStyles.textCenter}>标签</h1>
            <div className={tagStyles.tagArea}>
                {tagList.map(item => (
                    <Tag className={tagStyles.tagMargin} onSelect={handleSelect} tagInfo={item} key={item.tagName}></Tag>
                ))}
            </div>
            {tagLayout}
        </Layout>
    )
}