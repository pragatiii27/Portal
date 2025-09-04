"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export default function Departments() {
  const [departments, setDepartments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("id, name, sub_departments(id)");

      if (error) console.error(error);
      else setDepartments(data);
    };
    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Department-wise Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Card
              key={dept.id}
              onClick={() => navigate(`/departments/${dept.id}`)}
              className="shadow-sm rounded-2xl border hover:shadow-lg hover:-translate-y-1 transition cursor-pointer bg-white"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Building2 className="h-5 w-5 text-orange-600" />
                  {dept.name}
                </CardTitle>
                <Badge className="bg-orange-100 text-orange-700">
                  {dept.sub_departments?.length || 0} sub-departments
                </Badge>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
