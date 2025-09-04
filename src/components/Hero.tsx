import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroBanner from "@/assets/kumbh-hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl text-white">
          <div className="text-lg md:text-xl mb-4 text-white/80">
            Kumbh Mela, Nashik 2027
          </div>
          <div className="text-lg md:text-xl mb-2 text-white font-semibold">
            world's largest congregation of people!
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Maha Kumbh
            <br />
            Mela <span className="text-saffron">2027</span>
          </h1>
          
          {/* <p className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed text-white/90">
            Join us in this grand spiritual gathering to experience the vibrant culture, devotion, and unity.
          </p> */}
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-navy/50 backdrop-blur-sm px-4 py-2 rounded border border-white/20">
              <span className="text-saffron">📅</span>
              <span className="text-white">October 31, 2026 - July 24, 2028</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;