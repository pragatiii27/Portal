"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubProjects() {
  const { id } = useParams(); // sub-department id
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, name, status, funding_allocated, funding_used")
        .eq("sub_department_id", id);

      if (error) console.error(error);
      else setProjects(data);
    };
    fetchProjects();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Projects under Sub-Department
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <Card
              key={proj.id}
              onClick={() => navigate(`/projects/${proj.id}`)}
              className="hover:shadow-lg transition cursor-pointer"
            >
              <CardHeader>
                <CardTitle>{proj.name}</CardTitle>
                <Badge
                  className={
                    proj.status === "Ongoing"
                      ? "bg-yellow-100 text-yellow-800"
                      : proj.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {proj.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Funding: ₹{proj.funding_used} / ₹{proj.funding_allocated}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
