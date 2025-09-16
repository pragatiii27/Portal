import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Database,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Projects = () => {
  const [works, setWorks] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [subDepartments, setSubDepartments] = useState<any[]>([]);

  // Modal state
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // Selected work
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [editWork, setEditWork] = useState<any>(null);

  // Form states
  const [form, setForm] = useState<any>({
    work_type: "",
    department_id: "",
    sub_department: "",
    estimated_cost: "",
    physical_progress: "upcoming",
  });

  const [editForm, setEditForm] = useState<any>({
    work_type: "",
    department_id: "",
    sub_department: "",
    estimated_cost: "",
    physical_progress: "upcoming",
  });

  // Fetch all works with joins
  const fetchWorks = async () => {
    const { data, error } = await supabase
      .from("works")
      .select(
        `
        *,
        sub_departments(name, departments(name))
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching works:", error);
    } else {
      setWorks(data || []);
    }
  };

  // Fetch departments + subDepartments
  const fetchMeta = async () => {
    const { data: dep } = await supabase.from("departments").select("*");
    const { data: sub } = await supabase.from("sub_departments").select("*");
    setDepartments(dep || []);
    setSubDepartments(sub || []);
  };

  useEffect(() => {
    fetchWorks();
    fetchMeta();

    // Realtime
    const worksChannel = supabase
      .channel("works_channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "works" }, () => {
        fetchWorks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(worksChannel);
    };
  }, []);

  // ------------------- Add -------------------
  const handleAdd = async () => {
    if (!form.work_type) {
      alert("Please fill Project name.");
      return;
    }

    const payload = {
      work_type: form.work_type,
      department_id: form.department_id ? Number(form.department_id) : null,
      sub_department: form.sub_department ? Number(form.sub_department) : null,
      estimated_cost: form.estimated_cost ? Number(form.estimated_cost) : null,
      physical_progress: form.physical_progress,
    };

    console.log("Insert payload:", payload); // 🔍 debug

    const { error } = await supabase.from("works").insert([payload]);

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to add work: " + error.message);
    } else {
      setAddOpen(false);
      setForm({
        work_type: "",
        department_id: "",
        sub_department: "",
        estimated_cost: "",
        physical_progress: "upcoming",
      });
    }
  };

  // ------------------- Edit -------------------
  const openEdit = (work: any) => {
    setEditWork(work);
    setEditForm({
      work_type: work.work_type,
      department_id: work.department_id,
      sub_department: work.sub_department,
      estimated_cost: work.estimated_cost,
      physical_progress: work.physical_progress,
    });
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!editWork) return;

    const {
      work_type,
      department_id,
      sub_department,
      estimated_cost,
      physical_progress,
    } = editForm;

    if (!work_type) {
      alert("Please fill Project name.");
      return;
    }

    const { error } = await supabase
      .from("works")
      .update({
        work_type,
        department_id: department_id ? Number(department_id) : null,
        sub_department: sub_department ? Number(sub_department) : null,
        estimated_cost: estimated_cost ? Number(estimated_cost) : null,
        physical_progress,
      })
      .eq("id", editWork.id);

    if (error) {
      console.error("Update error:", error);
      alert("Failed to update work: " + error.message);
    } else {
      setEditOpen(false);
      setEditWork(null);
    }
  };

  const handleDelete = async () => {
    if (!editWork) return;

    const { error } = await supabase.from("works").delete().eq("id", editWork.id);
    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete work.");
    } else {
      setEditOpen(false);
      setEditWork(null);
    }
  };

  // ------------------- Stats -------------------
  const totalEstimatedCost = works.reduce(
    (sum, w) => sum + (Number(w.estimated_cost) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Works Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            NMC Works Tracking
          </h1>
          <p className="text-muted-foreground text-lg">
            Realtime updates from Supabase Works Table
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <Database className="h-8 w-8 text-primary" />
              <div className="text-right">
                <div className="text-2xl font-bold">{works.length}</div>
                <div className="text-sm text-muted-foreground">Total Works</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <Calendar className="h-8 w-8 text-success" />
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {works.filter((w) => w.created_at).length}
                </div>
                <div className="text-sm text-muted-foreground">Recorded Entries</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <Database className="h-8 w-8 text-purple-500" />
              <div className="text-right">
                <div className="text-2xl font-bold">{totalEstimatedCost}</div>
                <div className="text-sm text-muted-foreground">Total Estimated Cost</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Works List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Works List</span>
              <Button size="sm" className="bg-primary" onClick={() => setAddOpen(true)}>
                Add New Work
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {works.length === 0 && (
              <p className="text-muted-foreground">No works found.</p>
            )}
            {works.map((work) => (
              <Card key={work.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{work.work_type}</h3>
                    <p className="text-sm text-muted-foreground">
                      Department: {work.sub_departments?.departments?.name || "—"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sub-Department: {work.sub_departments?.name || "—"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => { setSelectedWork(work); setViewOpen(true); }}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openEdit(work)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* ---------------- Add Dialog ---------------- */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Work</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Project Name"
            value={form.work_type}
            onChange={(e) => setForm({ ...form, work_type: e.target.value })}
          />
          <Select
            onValueChange={(val) => setForm({ ...form, department_id: val })}
            value={form.department_id}
          >
            <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d.id} value={d.id.toString()}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) => setForm({ ...form, sub_department: val })}
            value={form.sub_department}
          >
            <SelectTrigger><SelectValue placeholder="Select Sub-Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {subDepartments
                .filter((s) => !form.department_id || String(s.department_id) === String(form.department_id))
                .map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Estimated Cost"
            value={form.estimated_cost}
            onChange={(e) => setForm({ ...form, estimated_cost: e.target.value })}
          />
          <Select
            onValueChange={(val) => setForm({ ...form, physical_progress: val })}
            value={form.physical_progress}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={handleAdd}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------------- View Dialog ---------------- */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Work</DialogTitle>
          </DialogHeader>
          {selectedWork && (
            <div className="space-y-2">
              <p><b>Project:</b> {selectedWork.work_type}</p>
              <p><b>Department:</b> {selectedWork.sub_departments?.departments?.name}</p>
              <p><b>Sub-Department:</b> {selectedWork.sub_departments?.name}</p>
              <p><b>Estimated Cost:</b> {selectedWork.estimated_cost}</p>
              <p><b>Status:</b> {selectedWork.physical_progress}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ---------------- Edit Dialog ---------------- */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Work</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Project Name"
            value={editForm.work_type}
            onChange={(e) => setEditForm({ ...editForm, work_type: e.target.value })}
          />
          <Select
            onValueChange={(val) => setEditForm({ ...editForm, department_id: val })}
            value={editForm.department_id?.toString()}
          >
            <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d.id} value={d.id.toString()}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) => setEditForm({ ...editForm, sub_department: val })}
            value={editForm.sub_department?.toString()}
          >
            <SelectTrigger><SelectValue placeholder="Select Sub-Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {subDepartments
                .filter((s) => !editForm.department_id || String(s.department_id) === String(editForm.department_id))
                .map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Estimated Cost"
            value={editForm.estimated_cost || ""}
            onChange={(e) => setEditForm({ ...editForm, estimated_cost: e.target.value })}
          />
          <Select
            onValueChange={(val) => setEditForm({ ...editForm, physical_progress: val })}
            value={editForm.physical_progress}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="h-4 w-4 mr-1" /> Delete
            </Button>
            <Button onClick={handleEditSave}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
