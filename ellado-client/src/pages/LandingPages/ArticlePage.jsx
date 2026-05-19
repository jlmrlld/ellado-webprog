import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import { fetchArticles } from "../../services/ArticleService";

function ArticlePage() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await fetchArticles();

                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data?.articles || [];

                const found = data.find((a) => a.slug === slug);

                setArticle(found || null);
            } catch (err) {
                console.error(err);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-bold text-zinc-900">
                        Article not found
                    </h1>
                    <p className="mt-2 text-zinc-500">
                        The article you’re looking for doesn’t exist or was removed.
                    </p>

                    <Button to="/articles" className="mt-6">
                        Back to Articles
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <section className="border-b bg-white">
                <div className="mx-auto max-w-3xl px-4 py-6">
                    <Button to="/articles" className="mb-6">
                        Back to Articles
                    </Button>

                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                        {article.title}
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        {article.slug}
                    </p>
                </div>
            </section>

            {/* Content */}
            <article className="mx-auto max-w-3xl px-4 py-10">
                <div className="overflow-hidden rounded-2xl shadow-sm border bg-white">
                    <img
                        src={article.image || "https://via.placeholder.com/1200x600"}
                        alt={article.title}
                        className="h-72 w-full object-cover"
                    />

                    <div className="p-6 sm:p-10">
                        <div className="space-y-5 text-zinc-700 leading-relaxed text-[16px]">
                            {article.content?.split("\n").map((p, i) =>
                                p.trim() ? <p key={i}>{p}</p> : null
                            )}
                        </div>

                        <div className="mt-10 flex justify-between items-center border-t pt-6">
                            <Button to="/articles">Back</Button>
                            <Button to="/articles">More Articles</Button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default ArticlePage;