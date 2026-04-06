import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-[#B0C4DE]/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
             {/* Subtle decorative accent */}
            <div className="absolute -bottom-4 -right-4 h-full w-full bg-[#fcbc2b]/20 rounded-3xl -z-10" />
            <img
              src="https://adventure.com/wp-content/uploads/2024/08/nils-nedel-ONpGBpns3cs-unsplash-1-scaled.jpg"
              alt="Traveler"
              className="rounded-3xl object-cover shadow-xl w-full h-[320px] border-4 border-white"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-black leading-tight text-zinc-900 sm:text-5xl">
              A Passion for Travel and Exploration
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-7 text-zinc-600">
              I'm a travel enthusiast who loves exploring new places, cultures, and cuisines.
              Through this blog, I share my travel experiences, tips, and stories to inspire
              others.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/" className="bg-[#fcbc2b] text-zinc-900 shadow-lg rounded-full px-6 font-bold border-none transition-all duration-300 hover:scale-105">
                Back Home
              </Button>
              <Button to="/articles" className="border-2 border-zinc-900 bg-transparent text-zinc-900 rounded-full px-6 font-bold transition-all duration-300 hover:bg-zinc-900 hover:text-white">
                Open Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400">
            Travel Overview
          </p>
          <h2 className="mt-2 text-3xl font-black text-zinc-900">My Travel Journey in Numbers</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { val: "07", label: "Places Visited" },
            { val: "10", label: "Cities Explored" },
            { val: "19", label: "Travel Tips Shared" },
            { val: "100%", label: "Passion for Travel" }
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl bg-zinc-50 p-8 shadow-sm border border-zinc-100">
              <p className="text-4xl font-black text-zinc-900">{stat.val}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              My Journey
            </p>
            <h2 className="mt-2 text-3xl font-black text-zinc-900">Travel Experiences & Stories</h2>
            
            <div className="mt-8 space-y-6">
              {[
                {
                  title: "How It All Started",
                  text: "My travel journey began with small trips around local cities. What started as simple adventures quickly turned into a passion for exploring new places and cultures."
                },
                {
                  title: "Favorite Travel Moments",
                  text: "From watching sunsets on the beach to exploring busy city streets, every trip brings unforgettable memories that I love sharing through this blog."
                },
                {
                  title: "Why I Share My Journey",
                  text: "I created this blog to inspire others—especially students—to travel, explore new places, and experience the world even on a budget."
                }
              ].map((item, i) => (
                <article key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-zinc-100">
                  <h3 className="text-xl font-bold text-zinc-900">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-600">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-xl border border-zinc-100">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              Visual Grid
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "https://afar.brightspotcdn.com/dims4/default/16af386/2147483647/strip/true/crop/3000x1500+0+258/resize/1440x720!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F1f%2F58%2F349510d34220a70218ec7bb92600%2Ftravelguides-beijing-meiqianbao-shutterstock.jpg",
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/38/61/b7/20190604-080330-largejpg.jpg?w=500&h=500&s=1",
                "https://www.agoda.com/wp-content/uploads/2024/08/Namsan-Tower-during-autumn-in-Seoul-South-Korea-1244x700.jpg",
                "https://scarletscribs.wordpress.com/wp-content/uploads/2025/05/250508-intramuros-walled-city-manila-philippines.jpg"
              ].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl shadow-inner">
                  <img
                    src={src}
                    alt="Destination"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <button className="mt-8 w-full justify-center bg-zinc-900 text-white rounded-xl py-4 font-bold border-none transition-colors duration-300 hover:bg-zinc-700">
                View Section
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;