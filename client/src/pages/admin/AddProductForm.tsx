import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Image,
  Tag,
  DollarSign,
  FileText,
  Package,
  X,
  ImagePlus
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const PRODUCT_API = "http://localhost:5000/api/products/add";
const CATEGORY_API = "http://localhost:5000/api/categories/get/all";

type Category = {
  _id: string;
  name: string;
};

export default function AddProductForm() {
  const { toast } = useToast();

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -----------------------------
     FETCH CATEGORIES
  ----------------------------- */
  useEffect(() => {
    fetch(CATEGORY_API)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {
        toast({
          title: "Failed to load categories",
          description: "Category dropdown could not be loaded",
          variant: "destructive"
        });
      });
  }, []);

  /* -----------------------------
     IMAGE HANDLING
  ----------------------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const updatedImages = [...images, ...newFiles];

    if (updatedImages.length > 6) {
      toast({
        title: "Image limit exceeded",
        description: "Maximum 6 images allowed",
        variant: "destructive"
      });
      return;
    }

    setImages(updatedImages);

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  /* -----------------------------
     SUBMIT PRODUCT
  ----------------------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast({
        title: "Category required",
        description: "Please select a category",
        variant: "destructive"
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("category", selectedCategory);

      images.forEach(img => {
        formData.append("images", img);
      });

      const res = await fetch(PRODUCT_API, {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Product creation failed");

      toast({
        title: "Product added successfully",
        description: `${images.length} image(s) uploaded`
      });

      e.currentTarget.reset();
      setImages([]);
      setImagePreviews([]);
      setSelectedCategory("");
    } catch (err: any) {
      toast({
        title: "Add product failed",
        description: err.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -----------------------------
     FORM FIELDS
  ----------------------------- */
  const formFields = [
    { name: "name", placeholder: "Product Name", icon: Package },
    { name: "brand", placeholder: "Brand", icon: Tag },
    { name: "price", type: "number" as const, placeholder: "Price (₹)", icon: DollarSign }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50 p-10">
        <h2 className="text-3xl font-black flex items-center gap-3 mb-8">
          <Package className="w-12 h-12 text-emerald-500 bg-emerald-100 p-3 rounded-2xl" />
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            {formFields.map(field => {
              const Icon = field.icon;
              return (
                <div key={field.name}>
                  <label className="flex items-center gap-2 mb-2 font-semibold text-sm">
                    <Icon className="w-4 h-4" /> {field.name.toUpperCase()}
                  </label>
                  <Input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    className="h-14"
                  />
                </div>
              );
            })}

            {/* CATEGORY DROPDOWN */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-semibold text-sm">
                <Tag className="w-4 h-4" /> CATEGORY
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                required
                className="h-14 w-full rounded-md border border-muted px-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold text-sm">
              <FileText className="w-4 h-4" /> DESCRIPTION
            </label>
            <Textarea
              name="description"
              required
              rows={4}
              className="h-32"
              placeholder="Product description, specifications, features..."
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="flex items-center gap-2 mb-4 font-semibold text-sm">
              <ImagePlus className="w-5 h-5" /> PRODUCT IMAGES (MAX 6)
            </label>

            <label className="block w-full h-20 border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer">
              <Upload className="mx-auto mb-2" />
              Click to upload images
              <input type="file" accept="image/*" multiple hidden onChange={handleImageChange} />
            </label>

            <AnimatePresence>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="relative">
                      <img src={src} className="h-32 w-full object-cover rounded-xl" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-white p-1 rounded-full"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 text-xl font-black bg-gradient-to-r from-emerald-500 to-teal-600"
          >
            <Package className="w-6 h-6 mr-3" />
            {isSubmitting ? "Adding Product..." : `Add Product (${images.length} images)`}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}