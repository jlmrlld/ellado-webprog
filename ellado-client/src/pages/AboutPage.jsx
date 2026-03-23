import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <img
              src="https://adventure.com/wp-content/uploads/2024/08/nils-nedel-ONpGBpns3cs-unsplash-1-scaled.jpg"
              alt="Traveler"
              className="rounded-3xl object-cover shadow-md w-full h-[320px]"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A Passion for Travel and Exploration
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              I'm a travel enthusiast who loves exploring new places, cultures, and cuisines.
              Through this blog, I share my travel experiences, tips, and stories to inspire
              others.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Overview Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Travel Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">My Travel Journey in Numbers</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">07</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Places Visited
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">10</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Cities Explored
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">19</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Travel Tips Shared
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Passion for Travel
            </p>
          </div>
        </div>
      </section>

      {/* Section Flow & Visual Grid */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              My Journey
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Travel Experiences & Stories</h2>
            
            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">How It All Started</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  My travel journey began with small trips around local cities. What started
                  as simple adventures quickly turned into a passion for exploring new places
                  and cultures.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Favorite Travel Moments</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  From watching sunsets on the beach to exploring busy city streets,
                  every trip brings unforgettable memories that I love sharing through this blog.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Why I Share My Journey</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  I created this blog to inspire others—especially students—to travel,
                  explore new places, and experience the world even on a budget.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Visual Grid
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src="https://afar.brightspotcdn.com/dims4/default/16af386/2147483647/strip/true/crop/3000x1500+0+258/resize/1440x720!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F1f%2F58%2F349510d34220a70218ec7bb92600%2Ftravelguides-beijing-meiqianbao-shutterstock.jpg"
                  alt="Beach"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/38/61/b7/20190604-080330-largejpg.jpg?w=500&h=500&s=1"
                  alt="Beach"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src="https://www.agoda.com/wp-content/uploads/2024/08/Namsan-Tower-during-autumn-in-Seoul-South-Korea-1244x700.jpg"
                  alt="Beach"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-[1.25rem]">
                <img
                  src="https://scarletscribs.wordpress.com/wp-content/uploads/2025/05/250508-intramuros-walled-city-manila-philippines.jpg"
                  alt="Beach"
                  className="h-full w-full object-cover"
                />
              </div>

            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;