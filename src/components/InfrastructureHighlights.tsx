import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Construction, 
  Droplet, 
  Recycle, 
  Building,
  Zap,
  Wifi,
  Shield,
  Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";

const InfrastructureHighlights = () => {
  const [showMore, setShowMore] = useState(false);

  const infrastructureData = [
    {
      title: "Roads & Bridges",
      count: 45,
      description: "Enhanced connectivity and traffic management",
      icon: Construction,
      color: "text-primary",
      bgColor: "bg-primary/10",
      projects: ["Ring Road Extension", "Godavari Bridge", "Pilgrim Pathways"]
    },
    {
      title: "Water Supply",
      count: 35,
      description: "Clean drinking water access points",
      icon: Droplet,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      projects: ["Bore Wells", "Distribution Network", "Storage Tanks"]
    },
    {
      title: "Sanitation",
      count: 28,
      description: "Waste management and cleanliness systems",
      icon: Recycle,
      color: "text-success",
      bgColor: "bg-success/10",
      projects: ["Toilet Complexes", "Waste Collection", "Sewage Treatment"]
    },
    {
      title: "Sacred Ghats",
      count: 24,
      description: "Religious bathing facilities along Godavari",
      icon: Waves,
      color: "text-gold",
      bgColor: "bg-gold/10",
      projects: ["Ghat Renovation", "Safety Rails", "Lighting Systems"]
    },
    {
      title: "Power Supply",
      count: 32,
      description: "Electrical infrastructure and backup systems",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      projects: ["Grid Expansion", "LED Lighting", "Solar Panels"]
    },
    {
      title: "Digital Infrastructure",
      count: 18,
      description: "Communication and technology systems",
      icon: Wifi,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      projects: ["WiFi Hotspots", "Mobile Towers", "CCTV Network"]
    },
    {
      title: "Security Systems",
      count: 26,
      description: "Safety and crowd management facilities",
      icon: Shield,
      color: "text-red-500",
      bgColor: "bg-red-50",
      projects: ["Control Rooms", "Emergency Response", "Barricading"]
    },
    {
      title: "Administrative",
      count: 15,
      description: "Government offices and service centers",
      icon: Building,
      color: "text-navy",
      bgColor: "bg-navy/10",
      projects: ["Help Desks", "Info Centers", "Medical Facilities"]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
            Infrastructure Development
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Development Highlights
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive infrastructure projects ensuring seamless pilgrimage experience
          </p>
        </div>

        {/* Show first 4 by default */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infrastructureData
            .slice(0, showMore ? infrastructureData.length : 4)
            .map((item, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card border-0 shadow-elegant hover:shadow-primary transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${item.bgColor} transition-all duration-300 group-hover:scale-110`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">
                        {item.count}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Projects
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground mt-3">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground mb-2">
                      Key Projects:
                    </div>
                    {item.projects.map((project, idx) => (
                      <div key={idx} className="flex items-center text-xs">
                        <div className={`w-2 h-2 rounded-full ${item.bgColor} mr-2`} />
                        <span className="text-muted-foreground">{project}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          {!showMore && (
            <Button onClick={() => setShowMore(true)} className="px-6 py-2">
              Show More
            </Button>
          )}
        </div>

        {/* Summary Stats */}
        {showMore && (
          <div className="mt-12 bg-gradient-primary rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              Total Infrastructure Investment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-white mb-2">₹250 Cr</div>
                <div className="text-white/80">Total Budget Allocated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">223+</div>
                <div className="text-white/80">Active Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">75%</div>
                <div className="text-white/80">Implementation Progress</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfrastructureHighlights;
