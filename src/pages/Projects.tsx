import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Sacred Ghat Renovation Phase 1",
      department: "Public Works",
      budget: "₹45.2 Cr",
      progress: 85,
      status: "In Progress",
      startDate: "Jan 2024",
      endDate: "Dec 2024",
      location: "Ramkund Area"
    },
    {
      id: 2,
      name: "Water Supply Enhancement",
      department: "Water Department", 
      budget: "₹28.5 Cr",
      progress: 92,
      status: "Near Completion",
      startDate: "Mar 2024",
      endDate: "Nov 2024",
      location: "Citywide"
    },
    {
      id: 3,
      name: "Digital Infrastructure Setup",
      department: "IT Department",
      budget: "₹15.8 Cr", 
      progress: 65,
      status: "In Progress",
      startDate: "May 2024",
      endDate: "Feb 2025",
      location: "Kumbh Area"
    },
    {
      id: 4,
      name: "Road Network Expansion",
      department: "PWD",
      budget: "₹68.3 Cr",
      progress: 78,
      status: "In Progress", 
      startDate: "Feb 2024",
      endDate: "Jan 2025",
      location: "Multiple Zones"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Near Completion": return "bg-success text-success-foreground";
      case "In Progress": return "bg-primary text-primary-foreground";
      case "Delayed": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Projects Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kumbh Infrastructure Projects
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive tracking of all infrastructure development projects for Kumbh Mela 2027
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Building2 className="h-8 w-8 text-primary" />
                <div className="text-right">
                  <div className="text-2xl font-bold">145</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Calendar className="h-8 w-8 text-success" />
                <div className="text-right">
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <IndianRupee className="h-8 w-8 text-gold" />
                <div className="text-right">
                  <div className="text-2xl font-bold">₹250</div>
                  <div className="text-sm text-muted-foreground">Total Budget (Cr)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-navy" />
                <div className="text-right">
                  <div className="text-2xl font-bold">75%</div>
                  <div className="text-sm text-muted-foreground">Avg Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project List */}
        <Card className="bg-gradient-card border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Project List</span>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Add New Project
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="space-y-4 p-6">
                {projects.map((project) => (
                  <Card key={project.id} className="border shadow-sm hover:shadow-primary transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Building2 className="h-4 w-4" />
                              <span>{project.department}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{project.startDate} - {project.endDate}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold text-foreground">{project.budget}</div>
                            <div className="flex items-center space-x-3 text-sm">
                              <span className="text-muted-foreground">Progress:</span>
                              <span className="font-medium">{project.progress}%</span>
                            </div>
                          </div>
                          
                          <Progress value={project.progress} className="h-2 mt-2" />
                        </div>

                        <div className="flex items-center space-x-2 md:ml-6">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;