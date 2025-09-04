"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DepartmentWiseProgress() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [newDept, setNewDept] = useState("");
  const [editDept, setEditDept] = useState<any>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // Fetch departments + sub-departments
  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("id, name, sub_departments(id)");

    if (error) {
      console.error(error);
    } else {
      setDepartments(data);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Add Department
  const addDepartment = async () => {
    if (!newDept.trim()) return;

    const { error } = await supabase
      .from("departments")
      .insert([{ name: newDept }]);

    if (error) {
      console.error(error);
      alert("Error adding department!");
    } else {
      setNewDept("");
      setOpenAdd(false);
      fetchDepartments();
    }
  };

  // Edit Department
  const updateDepartment = async () => {
    if (!editDept?.name.trim()) return;

    const { error } = await supabase
      .from("departments")
      .update({ name: editDept.name })
      .eq("id", editDept.id);

    if (error) {
      console.error(error);
      alert("Error updating department!");
    } else {
      setEditDept(null);
      setOpenEdit(false);
      fetchDepartments();
    }
  };

  // Delete Department
  const deleteDepartment = async (id: number) => {
    if (!confirm("Are you sure you want to delete this department?")) return;

    const { error } = await supabase.from("departments").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Error deleting department!");
    } else {
      fetchDepartments();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-900">
            Department-wise Progress
          </h2>

          {/* Add Department Modal */}
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                + Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add a New Department</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dept" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="dept"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="col-span-3"
                    placeholder="Enter department name"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={addDepartment}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Card
              key={dept.id}
              className="shadow-lg rounded-2xl border hover:shadow-xl transition"
            >
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Building2 className="h-5 w-5 text-orange-600" />
                  {dept.name}
                </CardTitle>
                <Badge className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                  {dept.sub_departments?.length || 0} sub-departments
                </Badge>
              </CardHeader>
              <CardContent className="flex justify-end gap-3">
                {/* Edit Button */}
                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditDept(dept)}
                      className="flex items-center gap-1"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Department</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="editDept" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="editDept"
                          value={editDept?.name || ""}
                          onChange={(e) =>
                            setEditDept({ ...editDept, name: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={updateDepartment}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Update
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteDepartment(dept.id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
