import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Explore Travel Stories & Destinations
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Discover travel experiences, destination guides, and helpful tips from my journeys.
          From relaxing beaches to exciting city adventures, find inspiration for your next trip.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Featured Articles Grid Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Latest Travel Stories</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Article Card #1 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.125rem] bg-zinc-200 overflow-hidden">
              <img
                src="https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/dqm8q1e6jyqaxapkgqy3.jpg"
                alt="Travel"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Baguio City
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">A Weekend in Baguio</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Enjoy cool weather and scenic views in the Summer Capital of the Philippines.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article Card #2 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.125rem] bg-zinc-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                alt="Travel"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Boracay Island
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Exploring Boracay Island</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Experience white sand beaches, crystal-clear water, and vibrant nightlife.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article Card #3 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.125rem] bg-zinc-200 overflow-hidden">
              <img
                src="https://www.elnidoparadise.com/wp-content/uploads/entalula-beach-el-nido-palawan-2.jpg"
                alt="Travel"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Palawan
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Island Hopping in Palawan</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Discover lagoons, limestone cliffs, and breathtaking island views.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article Card #4 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.125rem] bg-zinc-200 overflow-hidden">
              <img
                src="https://scarletscribs.wordpress.com/wp-content/uploads/2025/05/250508-intramuros-walled-city-manila-philippines.jpg"
                alt="Travel"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Manila
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Manila Street Food Guide</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Taste the best street foods and local flavors in the heart of the city.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;