import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getArchiveData(){
  const data = getSortedPostsData().filter(item => item.date);
  const categorizedResult = {};
  data.forEach(item => {
    const parts = item.date.split('-'); // 拆分日期字符串
    const yearMonth = `${parts[0]}-${parts[1]}`;

    if(!categorizedResult[yearMonth]){
      categorizedResult[yearMonth] = {archiveDate: yearMonth, postDatas: []};
    }
    categorizedResult[yearMonth].postDatas.push(item)
  })

  const result = Object.values(categorizedResult)
  result.num = data.length;

  return result;
}

export function getTagData(){
  const data = getSortedPostsData().filter(item => item.tag);
  const categorizedResult = {};
  data.forEach(item => {
    if(!categorizedResult[item.tag]){
      categorizedResult[item.tag] = {archiveTag: item.tag, postDatas: []};
    }
    categorizedResult[item.tag].postDatas.push(item)
  })

  const result = Object.values(categorizedResult)
  result.num = data.length;

  return result;
}

export function getAllPostIds(){
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id){
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}