import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  Eye, 
  ShoppingCart,
  Zap,
  Award
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AIAssistant } from "@/components/AIAssistant";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { BASE_URL } from "@/Url";

const PRODUCT_API = `${BASE_URL}/api/products/get/all`;
const CATEGORY_API = `${BASE_URL}/api/categories/get/all`;

export default function Products() {
  const { addItem } = useCart();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);


const formatPriceRange = (price) => {
  if (!price || price === 0) return "Price on Request";

  // Only for prices >= 1 Lakh
  if (price >= 100000) {
    const baseValue = Math.round(price / 100000) * 100000;
    const minRange = Math.max(0, baseValue - 300000);
    const maxRange = baseValue + 300000;

    // Convert to lakhs
    const minLakhs = Math.round(minRange / 100000);
    const maxLakhs = Math.round(maxRange / 100000);

    // ✅ Single unit, no spaces around hyphen
    return `${minLakhs}-${maxLakhs} Lakhs`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
};


  useEffect(() => {
    Promise.all([
      fetch(PRODUCT_API).then(res => res.json()),
      fetch(CATEGORY_API).then(res => res.json())
    ])
    .then(([productRes, categoryRes]) => {
      setProducts(productRes.products || []);
      setCategories(["all", ...categoryRes.map((c: any) => c.name)]);
    })
    .finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = products
    .filter(p => {
      const matchesCategory = category === "all" || p.category?.name === category;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.images?.[0] || [],
      category: product.category,
      description: product.description || "",
    };
    
    addItem(cartProduct);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* ✨ Premium Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 lg:sticky lg:top-32 lg:h-screen lg:overflow-y-auto space-y-8"
          >
            {/* Search */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl p-6 border border-white/50"
            >
              <div className="relative mb-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search ophthalmic equipment..."
                  className="pl-12 bg-transparent border-none h-14 text-lg rounded-3xl focus:ring-2 focus:ring-emerald-400/50 shadow-none"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {filteredProducts.length} results
              </p>
            </motion.div>

            <Separator className="my-0 h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* Categories */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl p-6 border border-white/50"
            >
              <h4 className="font-black text-xl mb-6 flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                <SlidersHorizontal className="w-6 h-6" />
                Filter by Category
              </h4>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {categories.map(cat => (
                  <motion.div 
                    key={cat}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-3 group cursor-pointer p-3 rounded-2xl hover:bg-emerald-50/50 transition-all"
                    onClick={() => setCategory(cat)}
                  >
                    <Checkbox
                      checked={category === cat}
                      className="w-5 h-5 rounded-lg border-2 border-emerald-300 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                    <label className="text-sm font-semibold cursor-pointer flex-1 group-hover:text-emerald-600 transition-colors">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </label>
                    {category === cat && (
                      <Zap className="w-4 h-4 text-emerald-500 ml-auto" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-4xl p-6 border border-emerald-200/30 shadow-xl"
            >
              <h5 className="font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Quick Stats
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Products:</span>
                  <span className="font-bold text-emerald-700">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Filtered:</span>
                  <span className="font-bold text-emerald-700">{filteredProducts.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 🔥 Premium Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-black text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent"
              >
                Equipment Catalog
                <motion.span 
                  className="inline-block ml-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 px-4 py-2 rounded-full text-lg font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ({filteredProducts.length})
                </motion.span>
              </motion.h1>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-[200px] lg:w-[220px] h-14 rounded-3xl bg-white/70 backdrop-blur-xl border-emerald-200/50 shadow-lg font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl border-emerald-200/50 bg-white/95 backdrop-blur-xl shadow-2xl">
                    <SelectItem value="newest" className="font-semibold">Newest First</SelectItem>
                    <SelectItem value="price-asc" className="font-semibold">Price: Low → High</SelectItem>
                    <SelectItem value="price-desc" className="font-semibold">Price: High → Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, skeleton: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl p-8 border border-white/50 animate-pulse"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl mb-6" />
                    <div className="space-y-3">
                      <div className="h-6 bg-slate-200 rounded-xl w-3/4" />
                      <div className="h-4 bg-slate-200 rounded-full w-1/2" />
                      <div className="flex justify-between items-center">
                        <div className="h-8 bg-slate-200 rounded-xl w-20" />
                        <div className="h-10 bg-slate-200 rounded-2xl w-28" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32 bg-white/60 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50"
              >
                <Filter className="w-20 h-20 mx-auto mb-8 text-emerald-400/50" />
                <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-gray-500 to-muted-foreground bg-clip-text text-transparent">
                  No Equipment Found
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                  Try adjusting your search terms or category filters above.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="px-8 h-14 font-bold rounded-3xl shadow-xl">
                    Clear All Filters
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="px-8 h-14 font-bold rounded-3xl">
                      Browse All Products
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, idx) => (
                <Link key={product._id} href={`/products/${product._id}`}>
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -15 }}
                    className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl hover:shadow-3xl border border-white/60 hover:border-emerald-200/50 overflow-hidden cursor-pointer hover:bg-white/95 transition-all duration-700 flex flex-col"
                  >
                    {/* Premium Image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50/30">
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                      />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />
                      
                      {/* Category Badge */}
                      <motion.div 
                        className="absolute top-6 left-6"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-4 py-2 shadow-2xl backdrop-blur-sm">
                          {product.category?.name}
                        </Badge>
                      </motion.div>

                      {/* Quick Actions */}
                      <div className="absolute top-6 right-6 space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="w-12 h-12 rounded-2xl shadow-lg bg-white/95 hover:bg-white backdrop-blur-sm"
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="w-12 h-12 rounded-2xl shadow-lg bg-emerald-500 hover:bg-emerald-600 backdrop-blur-sm"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <motion.h3 
                        className="font-black text-xl lg:text-2xl mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300"
                        whileHover={{ y: -2 }}
                      >
                        {product.name}
                      </motion.h3>
                      
                      <p className="text-muted-foreground text-base mb-6 line-clamp-2 leading-relaxed opacity-90">
                        {product.description}
                      </p>

                      <div className="mt-auto pt-6 flex justify-between items-center border-t border-emerald-100/50">
                        <motion.div 
                          className="text-0.1xl sm:text-0.5xl lg:text-xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg"
                          whileHover={{ scale: 1.05 }}
                        >
                          {formatPriceRange(product.price)}
                        </motion.div>
                        
                        <Button
                          size="lg"
                          className="px-8 font-bold rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 whitespace-nowrap"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}
