import Hero from "@/components/Hero";
import GrabPack from "@/components/GrabPack";
import JustPulled from "@/components/JustPulled";
import Reviews from "@/components/Reviews";
import BinderFeatures from "@/components/BinderFeatures";
import FeatureSection from "@/components/FeatureSection";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full max-w-7xl px-8 py-12 sm:px-12 lg:px-16">
      <Hero />
      <GrabPack />
      <JustPulled />
      <Reviews />
      <BinderFeatures />

      <FeatureSection
        eyebrow="PROVABLY FAIR"
        eyebrowColor="text-accent"
        title={
          <>
            The pack is decided before <br className="hidden sm:block" />
            you pay.
          </>
        }
        watermark="SEALED"
        copy="Every rip is sealed and time stamped before your coins move. Afterwards you get the seed and can redo the math yourself. You do not have to trust us: that is the whole point."
        cta="See how verification works"
      />

      <FeatureSection
        eyebrow="INSTANT BUYBACK"
        eyebrowColor="text-emerald-400"
        title="Not feeling the pull? Sell it back."
        watermark="TRADE"
        copy="Every card in your binder can be sold back instantly at 75% of live market value. No listings, no waiting on a buyer."
        cta="See buyback rates"
      />

      <FeatureSection
        eyebrow="REAL CARDS, SHIPPED"
        eyebrowColor="text-gold"
        title={
          <>
            The good ones go to <br className="hidden sm:block" />
            your door.
          </>
        }
        watermark="HOME"
        copy="Keep a card and it becomes a parcel. We source the physical copy, sleeve it and ship it to your house, with tracking, straight from your vault."
        cta="How shipping works"
      />

      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
