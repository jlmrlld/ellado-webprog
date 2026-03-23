import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Hero Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Explore the World with Me
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Welcome to my travel blog where I share unforgettable journeys, travel tips, 
              and hidden gems from different places. Join me as I explore the world!
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div>
            <img
              src="https://bigdreamboatmancoron.com/cdn/shop/articles/coron-blog-cover-image_51ffee40-281e-48cc-b644-2fa4b39a6749.jpg?v=1741269730"
              alt="Travel Beach"
              className="rounded-3xl object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick overview blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">05</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Places Visited
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Cities Explored
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">15</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Travel Tips
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Featured Guides
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Destinations
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Explore Popular Cities</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Shanghai */}
          <article className="overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-sm hover:shadow-md transition">
            <img
              src="https://resources.formula-e.pulselive.com/photo-resources/2024/05/25/f5ccde7c-a1dd-42d9-aaaf-003be47aff94/Shanghai-skyline.jpg?width=1440&height=810"
              alt="Shanghai"
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-zinc-900">Shanghai City</h3>
              <p className="mt-2 text-sm text-zinc-600">
                A vibrant mix of modern skyscrapers and traditional culture, perfect for city exploration.
              </p>
              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </div>
          </article>

          {/* Cebu */}
          <article className="overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-sm hover:shadow-md transition">
            <img
              src="https://images.unsplash.com/photo-1604999333679-b86d54738315"
              alt="Cebu"
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-zinc-900">Cebu City</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Known for its beautiful beaches, waterfalls, and rich historical landmarks.
              </p>
              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </div>
          </article>

          {/* Seoul */}
          <article className="overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-sm hover:shadow-md transition">
            <img
              src="https://media.architecturaldigest.com/photos/5c0ed0538d2a442e241057b1/16:9/w_2560%2Cc_limit/GettyImages-771579891.jpg"
              alt="Seoul"
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-zinc-900">Seoul City</h3>
              <p className="mt-2 text-sm text-zinc-600">
                A dynamic city blending tradition and technology with amazing food and culture.
              </p>
              <Button className="mt-4" variant="primary">
                View More
              </Button>
            </div>
          </article>

        </div>
      </section>
    </div>
  );
};

export default HomePage;