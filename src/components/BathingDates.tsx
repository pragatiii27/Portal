import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const BathingDates = () => {
  const bathingDates = [
    { name: "First Shahi Snan", date: "2", month: "AUGUST", year: "2027" },
    { name: "Second Shahi Snan", date: "31", month: "AUGUST", year: "2027" },
    { name: "Third Shahi Snan, Nashik", date: "11", month: "SEPTEMBER", year: "2027" },
    { name: "Third Shahi Snan, Trimbakeshwar", date: "12", month: "SEPTEMBER", year: "2027" },
  ];

  return (
    <section className="py-16 relative overflow-hidden text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="src/assets/bg.jpg"
          alt="background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="h-12 w-12 text-saffron" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Bathing Dates
            </h2>
          </div>
        </div>

        {/* Dates Grid - exactly 4 in one row */}
        <div className="grid grid-cols-4 gap-8 justify-center items-center mb-12">
          {bathingDates.map((item, index) => (
            <div
              key={index}
              className="w-64 bg-white text-navy rounded-2xl p-8 text-center shadow-xl hover:shadow-[0_8px_30px_rgb(255,153,51,0.4)] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-saffron/20"
            >
              <div className="text-xs font-semibold text-navy/70 mb-2 uppercase tracking-wider">
                {item.name}
              </div>
              <div className="text-5xl font-bold text-navy mb-2">{item.date}</div>
              <div className="text-sm font-semibold text-navy/80">{item.month}</div>
              <div className="text-sm font-semibold text-navy/80">{item.year}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-8">
            Bathing in the holy rivers during Kumbh is believed to cleanse one’s soul and wash away sins. While every dip taken throughout the sacred days of Nashik Kumbh holds immense spiritual value, certain days are considered especially auspicious. These special bathing dates are marked by divine significance—be sure to note them and be part of this once-in-a-lifetime spiritual experience.
          </p>

          
        </div>
      </div>
    </section>
  );
};

export default BathingDates;
