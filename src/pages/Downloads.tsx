import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar,
  Eye,
  Share,
  BarChart3,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const Reports = () => {
  const reports = [
    {
      title: "Monthly Progress Report - November 2024",
      type: "Progress Report",
      date: "December 1, 2024",
      status: "Published",
      downloads: 245,
      description: "Comprehensive overview of all projects and their current status"
    },
    {
      title: "Budget Utilization Analysis Q3 2024", 
      type: "Financial Report",
      date: "November 28, 2024",
      status: "Published",
      downloads: 189,
      description: "Detailed financial analysis and budget utilization across departments"
    },
    {
      title: "Infrastructure Completion Milestone Report",
      type: "Milestone Report", 
      date: "November 25, 2024",
      status: "Published",
      downloads: 156,
      description: "Key infrastructure projects completed in Q3 and Q4 2024"
    },
    {
      title: "Safety & Compliance Audit Report",
      type: "Audit Report",
      date: "November 20, 2024", 
      status: "Published",
      downloads: 98,
      description: "Safety standards compliance and risk assessment for ongoing projects"
    },
    {
      title: "Weekly Status Update - Week 48",
      type: "Status Update",
      date: "November 30, 2024",
      status: "Draft", 
      downloads: 0,
      description: "Latest weekly progress updates from all active project sites"
    }
  ];

  const quickStats = [
    { label: "Total Reports", value: "42", icon: FileText, color: "text-primary" },
    { label: "This Month", value: "8", icon: Calendar, color: "text-success" },
    { label: "Total Downloads", value: "1,247", icon: Download, color: "text-gold" },
    { label: "Active Reports", value: "5", icon: BarChart3, color: "text-navy" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-success text-success-foreground";
      case "Draft": return "bg-gold text-gold-foreground";
      case "Under Review": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-navy/10 text-navy border-navy/30">
            Reports & Updates
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Project Reports & Documentation
          </h1>
          <p className="text-muted-foreground text-lg">
            Access detailed reports, progress updates, and official documentation
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-elegant">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div className="text-right">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reports List */}
        <Card className="bg-gradient-card border-0 shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Reports</span>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {reports.map((report, index) => (
                <Card key={index} className="border shadow-sm hover:shadow-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span className="font-medium text-primary">{report.type}</span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {report.date}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            {report.downloads} downloads
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>

                      <div className="flex items-center space-x-2 md:ml-6">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <TrendingUp className="h-5 w-5 text-success" />
                Progress Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Regular progress updates and milestone reports for all active projects.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View All Progress Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <BarChart3 className="h-5 w-5 text-gold" />
                Financial Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Budget analysis, cost estimation, and financial utilization reports.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Financial Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <AlertCircle className="h-5 w-5 text-navy" />
                Audit Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Quality audits, compliance reports, and safety assessment documents.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Audit Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reports;