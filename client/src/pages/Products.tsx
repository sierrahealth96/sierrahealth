import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
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
import { products } from "@/data/products";
import { Link } from "wouter";

export default function Products() {
  // const { data: products, isLoading } = useProducts();
  const isLoading = false;
  const { addItem } = useCart();
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredProducts = products?.filter((p) => {
    const matchesCategory = category === "all" || p.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const categories = Array.from(new Set(products?.map((p) => p.category) || []));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Filters</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 bg-secondary/50 border-none rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Categories
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-all" 
                    checked={category === "all"}
                    onCheckedChange={() => setCategory("all")}
                  />
                  <label htmlFor="cat-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    All Products
                  </label>
                </div>
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cat-${cat}`} 
                      checked={category === cat}
                      onCheckedChange={() => setCategory(cat)}
                    />
                    <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-display text-3xl font-bold">Catalog</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{filteredProducts.length} results</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] rounded-lg">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-secondary/20 rounded-2xl aspect-[3/4] animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-secondary/20 rounded-2xl">
                <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link href={`/products/${product.id}`}>
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{product.category}</div>
                      <h3 className="font-display text-lg font-bold mb-2">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                        <span className="text-lg font-bold">${product.price}</span>
                        <Button 
                          onClick={() => addItem(product)} 
                          size="sm" 
                          className="rounded-lg bg-gray-900 hover:bg-gray-800"
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
