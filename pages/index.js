import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
    return (
        <Layout>
            <SEO title={globalData.name} description={globalData.blogTitle} />
            <Header name={globalData.name} />
            <main className="w-full">
                <h1 className="text-3xl lg:text-5xl text-center mb-12">{globalData.blogTitle}</h1>
                <div className="grid md:grid-cols-5">
                    {posts.map((post) => (
                        <div
                            key={post.filePath}
                            className="first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col"
                        >
                            <Link
                                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                                href={`/posts/[slug]`}
                            >
                                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                                    {post.data.date && (
                                        <p className="uppercase mb-3 font-bold opacity-60">
                                            {post.data.date}
                                        </p>
                                    )}
                                    <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                                    {post.data.description && (
                                        <p className="mt-3 text-lg opacity-60">
                                            {post.data.description}
                                        </p>
                                    )}
                                    <ArrowIcon className="mt-4" />
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
            <Footer copyrightText={globalData.footerText} />
            <GradientBackground
                variant="large"
                className="fixed top-20 opacity-40 dark:opacity-60"
            />
            <GradientBackground
                variant="small"
                className="absolute bottom-0 opacity-20 dark:opacity-10"
            />
        </Layout>
    );
}

export function getStaticProps() {
    const posts = getPosts();
    const globalData = getGlobalData();

    return { props: { posts, globalData } };
}