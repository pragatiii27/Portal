"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetails() {
  const { id } = useParams(); // project id
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setProject(data);
    };
    fetchProject();
  }, [id]);

  if (!project) return <p className="p-6">Loading...</p>;

  const fundingUsedPercent =
    project.funding_allocated > 0
      ? (project.funding_used / project.funding_allocated) * 100
      : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <Card className="max-w-2xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {project.name}
            </CardTitle>
            <Badge>{project.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Registered:</strong>{" "}
              {new Date(project.date_registered).toLocaleDateString()}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {new Date(project.deadline).toLocaleDateString()}
            </p>
            <p>
              <strong>Funding:</strong> ₹{project.funding_used} / ₹
              {project.funding_allocated}
            </p>
            <Progress value={fundingUsedPercent} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
