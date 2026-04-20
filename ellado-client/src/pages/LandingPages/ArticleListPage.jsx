import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from '../../assets/article-content.js';

const ArticleListPage = () => {
    return (
        <div className="flex w-full flex-col bg-white">
            <section className="bg-[#B0C4DE]/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                        Explore
                    </p>
                    <h1 className="max-w-xl text-4xl font-black leading-tight text-zinc-900 sm:text-5xl">
                        Featured Travel Stories
                    </h1>
                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600">
                        Dive into detailed guides, personal experiences, and essential 
                        travel tips from my latest adventures around the globe.
                    </p>
                    <div className="mt-10">
                        <Button to="/" className="bg-[#fcbc2b] text-zinc-900 hover:shadow-lg transition-all rounded-full px-8 font-bold">
                            Back Home
                        </Button>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12">
                        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B0C4DE] brightness-75">
                            Recent Posts
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-zinc-900">
                            Our Latest Article Grid
                        </h2>
                    </div>

                    <div className="relative">
                        <ArticleList articles={articles} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticleListPage;