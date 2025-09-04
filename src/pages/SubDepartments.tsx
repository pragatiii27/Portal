"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SubDepartments() {
  const { id } = useParams(); // department id
  const navigate = useNavigate();
  const [subDepartments, setSubDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubDepartments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("sub_departments")
        .select("id, name, description")
        .eq("department_id", id);

      if (error) {
        console.error("Error fetching sub-departments:", error.message);
      } else {
        setSubDepartments(data || []);
      }
      setLoading(false);
    };

    if (id) fetchSubDepartments();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Sub-Departments
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : subDepartments.length === 0 ? (
          <p className="text-gray-600">No sub-departments found for this department.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subDepartments.map((sub) => (
              <Card
                key={sub.id}
                className="hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/subdepartments/${sub.id}`)}
              >
                <CardHeader>
                  <CardTitle>{sub.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{sub.description || "No description available."}</p>
                  <Button
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/subdepartments/${sub.id}`);
                    }}
                  >
                    View Projects
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
