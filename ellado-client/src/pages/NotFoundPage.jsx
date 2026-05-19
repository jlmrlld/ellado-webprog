import React from 'react';
import Button from '../components/Button';

function NotFoundPage() {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="bg-zinc-50 px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Visual 404 Header */}
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 mb-4">
                        Error 404
                    </p>
                    
                    <h1 className="text-6xl font-bold tracking-tight text-zinc-900 sm:text-8xl">
                        Page Not Found
                    </h1>
                    
                    <p className="mt-8 text-lg leading-8 text-zinc-600 max-w-lg mx-auto">
                        The link you followed to get here must be broken, or the destination 
                        has been moved.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button to="/">Return Home</Button>
                        <Button to="/articles">View Articles</Button>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-100 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm text-zinc-500 italic">
                        "Not all those who wander are lost... but this page definitely is."
                    </p>
                </div>
            </section>
        </div>
    );
}

export default NotFoundPage;