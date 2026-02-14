import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil, Save, X, Plus, Tag, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "http://localhost:5000/api/categories";

type Category = {
  _id: string;
  name: string;
  productCount?: number; // UI-only
  color?: string;        // UI-only
};

export default function CategoryManager() {
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  /* ----------------------------------
     FETCH CATEGORIES
  ---------------------------------- */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/get/all`);
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();

      const enhanced = data.map((c: Category) => ({
        ...c,
        productCount: Math.floor(Math.random() * 20),
        color: `bg-[hsl(${Math.random() * 360},70%,55%)]`
      }));

      setCategories(enhanced);
    } catch (err: any) {
      toast({
        title: "Failed to load categories",
        description: err.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     ADD CATEGORY
  ---------------------------------- */
  const addCategory = async () => {
    if (!newCategory.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a category name",
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim() })
      });

      if (!res.ok) throw new Error("Failed to add category");

      const created = await res.json();

      setCategories(prev => [
        {
          ...created,
          productCount: 0,
          color: `bg-[hsl(${Math.random() * 360},70%,55%)]`
        },
        ...prev
      ]);

      setNewCategory("");

      toast({
        title: "Category added",
        description: `"${created.name}" has been created successfully`
      });
    } catch (err: any) {
      toast({
        title: "Add failed",
        description: err.message || "Unable to add category",
        variant: "destructive"
      });
    }
  };

  /* ----------------------------------
     UPDATE CATEGORY
  ---------------------------------- */
  const saveEdit = async (id: string) => {
    if (!editingValue.trim()) {
      toast({
        title: "Invalid name",
        description: "Category name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingValue.trim() })
      });

      if (!res.ok) throw new Error("Failed to update category");

      const updated = await res.json();

      setCategories(prev =>
        prev.map(c =>
          c._id === id ? { ...c, name: updated.name } : c
        )
      );

      setEditingId(null);
      setEditingValue("");

      toast({
        title: "Category updated",
        description: `"${updated.name}" has been updated`
      });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message || "Unable to update category",
        variant: "destructive"
      });
    }
  };

  /* ----------------------------------
     DELETE CATEGORY
  ---------------------------------- */
  const deleteCategory = async (id: string, name: string) => {
    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete category");

      setCategories(prev => prev.filter(c => c._id !== id));

      toast({
        title: "Category deleted",
        description: `"${name}" has been removed`
      });
    } catch (err: any) {
      toast({
        title: "Delete failed",
        description: err.message || "Unable to delete category",
        variant: "destructive"
      });
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ----------------------------------
     LOADING STATE
  ---------------------------------- */
  if (loading) {
    return (
      <div className="text-center py-32 text-muted-foreground">
        Loading categories…
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50 p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3 mb-2">
              <Tag className="w-10 h-10 text-purple-500 bg-purple-100 p-2 rounded-xl" />
              Category Manager
            </h2>
            <p className="text-muted-foreground">
              {categories.length} categories • {filteredCategories.length} shown
            </p>
          </div>

          {/* ADD */}
          <div className="flex gap-3">
            <Input
              placeholder="New category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              className="h-12"
            />
            <Button onClick={addCategory} className="h-12 px-6">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* LIST */}
        <AnimatePresence>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No categories found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group relative"
                >
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-white to-secondary/30 rounded-3xl shadow hover:shadow-xl transition">
                    <div className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-3xl ${cat.color}`} />

                    <div className="flex-1 pl-4">
                      {editingId === cat._id ? (
                        <Input
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEdit(cat._id)}
                          className="font-bold text-lg h-10"
                          autoFocus
                        />
                      ) : (
                        <h3 className="font-bold text-xl">{cat.name}</h3>
                      )}
                      <Badge variant="secondary" className="mt-1">
                        {cat.productCount} Products
                      </Badge>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      {editingId === cat._id ? (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => saveEdit(cat._id)}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditingId(cat._id);
                              setEditingValue(cat.name);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteCategory(cat._id, cat.name)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}