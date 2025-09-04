import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Example images – replace with your own
import sangamImg from "@/assets/sangam.jpg";
import templeImg from "@/assets/temple.jpg";
import heritageImg from "@/assets/heritage.jpg";

const AttractionsSection = () => {
  const [activeTab, setActiveTab] = useState("Sangam");

  const tabs = ["Sangam", "Temples", "Heritage Sites"];

  const attractions = {
    Sangam: {
      image: sangamImg,
      content:
        "Trivini Sangam: The sacred spot where the Godavari, Varuna, and Aruna (or Tharuni) rivers meet.",
    },
    Temples: {
      image: templeImg,
      content:
        "Trimbakeshwar Temple: Site of the Trimbakeshwar Shiva Temple, home to a unique, three-faced Jyotirlinga embodying the Hindu Trinity (Brahma, Vishnu, and Shiva).",
    },
    "Heritage Sites": {
      image: heritageImg,
      content:
        "Pandav Leni: An ancient complex of 24 rock-cut Buddhist and Jain caves, renowned for their exquisite intricate carvings, sculptures of Buddha and Bodhisattvas, and inscriptions that provide insights into ancient India's spiritual and artistic traditions.",
    },
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Camera className="h-12 w-12 text-saffron" />
            <h2 className="text-4xl md:text-5xl font-bold text-navy">
              Attractions at Nashik
            </h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-full p-2 shadow-elegant overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-saffron text-white shadow-md"
                    : "text-navy hover:text-saffron hover:bg-saffron/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white border-0 shadow-elegant overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab} // ensures animation on tab switch
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Image Section */}
                  <div className="flex-1 relative">
                    <img
                      src={attractions[activeTab].image}
                      alt={activeTab}
                      className="h-[70vh] w-full object-cover"
                    />
                  </div>

                  {/* Content Description */}
                  <div className="p-8 text-center">
                    <p className="text-lg text-navy/80 leading-relaxed">
                      {attractions[activeTab].content}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
