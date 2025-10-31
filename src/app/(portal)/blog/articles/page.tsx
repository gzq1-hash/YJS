import Link from 'next/link'

export default async function Page() {

  return (
    <ul>
      <li>
        <Link href={`/blog/articles/1`}>1</Link>
      </li>
      <li>
        <Link href={`/blog/articles/2`}>2</Link>
      </li>
      {/*{posts.map((post) => (*/}
      {/*  <li key={post.slug}>*/}
      {/*    <Link href={`/blog/${post.slug}`}>{post.title}</Link>*/}
      {/*  </li>*/}
      {/*))}*/}
    </ul>
  )
}