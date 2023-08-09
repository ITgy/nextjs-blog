import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Tabbar from '../components/tabbar/index';

export async function getStaticProps(){
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {

  const list = [{
    id: 1,
    label: "归档",
    num: allPostsData.filter(item => item.date).length,
    url: '/archive'
  }, {
    id: 2,
    label: "标签",
    num: allPostsData.filter(item => item.tag).length,
    url: '/tag'
  }, {
    id: 3,
    label: "关于",
    num: 0,
    url: '/aboutMe'
  }];
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Tabbar list={list}></Tabbar>

      <section className={utilStyles.headingMd}>
        <p>近期愿望：简单生活，早睡早起。</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br></br>
              <small className={utilStyles.lightText}>
                <Date dateString={date}></Date>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
