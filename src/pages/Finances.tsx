import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  BarChart3,
  Download,
  Calculator
} from "lucide-react";

const Finances = () => {
  const budgetAllocation = [
    { department: "Public Works", allocated: 95.2, utilized: 78.5, percentage: 82.4 },
    { department: "Water Supply", allocated: 48.5, utilized: 43.2, percentage: 89.1 },
    { department: "Electrical", allocated: 32.8, utilized: 24.6, percentage: 75.0 },
    { department: "Health", allocated: 22.3, utilized: 20.3, percentage: 91.0 },
    { department: "Sanitation", allocated: 18.7, utilized: 16.5, percentage: 88.2 },
    { department: "Security", allocated: 16.2, utilized: 11.3, percentage: 69.8 },
    { department: "IT Services", allocated: 15.8, utilized: 10.3, percentage: 65.2 },
    { department: "Administration", allocated: 8.5, utilized: 7.2, percentage: 84.7 }
  ];

  const totalAllocated = budgetAllocation.reduce((sum, dept) => sum + dept.allocated, 0);
  const totalUtilized = budgetAllocation.reduce((sum, dept) => sum + dept.utilized, 0);
  const utilizationRate = ((totalUtilized / totalAllocated) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-gold/10 text-gold border-gold/30">
            Financial Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cost Estimation & Budget Tracking
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time financial monitoring for Kumbh Mela infrastructure projects
          </p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <IndianRupee className="h-8 w-8 text-primary" />
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">₹{totalAllocated.toFixed(1)} Cr</div>
                <div className="text-sm text-muted-foreground">Total Allocated</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <IndianRupee className="h-8 w-8 text-success" />
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">₹{totalUtilized.toFixed(1)} Cr</div>
                <div className="text-sm text-muted-foreground">Total Utilized</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <PieChart className="h-8 w-8 text-gold" />
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">{utilizationRate}%</div>
                <div className="text-sm text-muted-foreground">Utilization Rate</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <BarChart3 className="h-8 w-8 text-navy" />
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">₹{(totalAllocated - totalUtilized).toFixed(1)} Cr</div>
                <div className="text-sm text-muted-foreground">Remaining Budget</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department-wise Budget Breakdown */}
        <Card className="bg-gradient-card border-0 shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Department-wise Budget Analysis</span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Calculator className="h-4 w-4 mr-2" />
                  Cost Estimator
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Department</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Allocated (₹ Cr)</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Utilized (₹ Cr)</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Utilization %</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetAllocation.map((dept, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-foreground">{dept.department}</div>
                      </td>
                      <td className="text-right py-4 px-4 text-foreground">₹{dept.allocated}</td>
                      <td className="text-right py-4 px-4 text-foreground">₹{dept.utilized}</td>
                      <td className="text-right py-4 px-4">
                        <Badge 
                          className={
                            dept.percentage >= 80 ? "bg-success text-success-foreground" :
                            dept.percentage >= 60 ? "bg-gold text-gold-foreground" :
                            "bg-destructive text-destructive-foreground"
                          }
                        >
                          {dept.percentage.toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-full">
                          <Progress value={dept.percentage} className="h-2" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Financial Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <TrendingUp className="h-5 w-5 text-success" />
                Top Performing Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {budgetAllocation
                  .sort((a, b) => b.percentage - a.percentage)
                  .slice(0, 3)
                  .map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                      <span className="text-sm font-medium">{dept.department}</span>
                      <Badge className="bg-success text-success-foreground">{dept.percentage.toFixed(1)}%</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <TrendingDown className="h-5 w-5 text-gold" />
                Needs Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {budgetAllocation
                  .sort((a, b) => a.percentage - b.percentage)
                  .slice(0, 3)
                  .map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gold/5 rounded-lg">
                      <span className="text-sm font-medium">{dept.department}</span>
                      <Badge variant="outline" className="border-gold text-gold">{dept.percentage.toFixed(1)}%</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Finances;