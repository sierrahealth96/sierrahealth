// AdminPanel.tsx
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Bell, Package, Settings, MessageCircle, Users, TrendingUp, Star } from "lucide-react";
import QueriesPanel from "./QueriesPanel";
import AddProductForm from "./AddProductForm";
import CategoryManager from "./CategoryManager";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/Url";
import AdminReviewsPanel from "./AdminReviewsPanel";

const CRM_API = `${BASE_URL}/api/crm/crm/admin`;
 

export default function AdminPanel() {

  const [stats, setStats] = useState([
  { value: "0", label: "New Queries", icon: MessageCircle, color: "from-blue-500 to-indigo-600" },
  { value: "0", label: "Products", icon: Package, color: "from-emerald-500 to-teal-600" },
  { value: "0", label: "Categories", icon: Settings, color: "from-purple-500 to-violet-600" },
  { value: "0", label: "Users", icon: Users, color: "from-orange-500 to-amber-600" }
]);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch(CRM_API);
      const data = await res.json();

      setStats([
        {
          value: String(data.totalOrders),
          label: "New Queries",
          icon: MessageCircle,
          color: "from-blue-500 to-indigo-600"
        },
        {
          value: String(data.totalProducts),
          label: "Products",
          icon: Package,
          color: "from-emerald-500 to-teal-600"
        },
        {
          value: String(data.totalCategories),
          label: "Categories",
          icon: Settings,
          color: "from-purple-500 to-violet-600"
        },
        {
          value: String(data.totalUsers),
          label: "Users",
          icon: Users,
          color: "from-orange-500 to-amber-600"
        }
      ]);
    } catch (err) {
      console.error("Failed to load CRM stats", err);
    }
  };

  fetchStats();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-slate-100">
      {/* <Navbar /> */}

      {/* Header with Stats */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary/0.08)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent drop-shadow-2xl"
          >
            Admin Dashboard
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mb-16 leading-relaxed"
          >
            Manage inquiries, products, and categories with precision control.
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 hover:border-primary/30 hover:shadow-2xl hover:bg-white transition-all duration-500 h-[140px] flex flex-col justify-between">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${stat.color} text-white border-2 border-white/20`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                      <p className="text-sm text-muted-foreground font-medium group-hover:text-primary transition-colors">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl pb-24">
<Tabs defaultValue="queries" className="w-full">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/60 backdrop-blur-xl rounded-4xl p-8 shadow-2xl border border-white/50 mb-8"
  >
    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-transparent p-1 rounded-3xl border-none shadow-xl backdrop-blur-sm bg-white/80">
      
      {/* Queries Tab - BLUE */}
      <TabsTrigger 
        value="queries" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-[1.02] transition-all duration-300 font-bold py-4 h-auto flex items-center gap-2 justify-start lg:justify-center group hover:bg-blue-50/50 hover:border-blue-200/50 hover:shadow-md"
      >
        <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 group-data-[state=active]:text-white text-blue-500" />
        <span className="hidden lg:inline text-sm lg:text-base">Customer Queries</span>
        <span className="lg:hidden text-xs">Queries</span>
      </TabsTrigger>
      
      {/* Reviews Tab - YELLOW */}
      <TabsTrigger 
        value="reviews" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-[1.02] transition-all duration-300 font-bold py-4 h-auto flex items-center gap-2 justify-start lg:justify-center group hover:bg-yellow-50/50 hover:border-yellow-200/50 hover:shadow-md"
      >
        <Star className="w-5 h-5 lg:w-6 lg:h-6 group-data-[state=active]:text-white text-yellow-500" />
        <span className="hidden lg:inline text-sm lg:text-base">Reviews</span>
        <span className="lg:hidden text-xs">Reviews</span>
      </TabsTrigger>
      
      {/* Add Product Tab - EMERALD */}
      <TabsTrigger 
        value="add-product" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-[1.02] transition-all duration-300 font-bold py-4 h-auto flex items-center gap-2 justify-start lg:justify-center group hover:bg-emerald-50/50 hover:border-emerald-200/50 hover:shadow-md"
      >
        <Package className="w-5 h-5 lg:w-6 lg:h-6 group-data-[state=active]:text-white text-emerald-500" />
        <span className="hidden lg:inline text-sm lg:text-base">Add Products</span>
        <span className="lg:hidden text-xs">Products</span>
      </TabsTrigger>
      
      {/* Categories Tab - PURPLE */}
      <TabsTrigger 
        value="categories" 
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-[1.02] transition-all duration-300 font-bold py-4 h-auto flex items-center gap-2 justify-start lg:justify-center group hover:bg-purple-50/50 hover:border-purple-200/50 hover:shadow-md"
      >
        <Settings className="w-5 h-5 lg:w-6 lg:h-6 group-data-[state=active]:text-white text-purple-500" />
        <span className="hidden lg:inline text-sm lg:text-base">Categories</span>
        <span className="lg:hidden text-xs">Categories</span>
      </TabsTrigger>
      
    </TabsList>
  </motion.div>

  <TabsContent value="queries" className="mt-0">
    <QueriesPanel />
  </TabsContent>
  
  <TabsContent value="reviews" className="mt-0">
    <AdminReviewsPanel />
  </TabsContent>
  
  <TabsContent value="add-product" className="mt-0">
    <AddProductForm />
  </TabsContent>
  
  <TabsContent value="categories" className="mt-0">
    <CategoryManager />
  </TabsContent>
</Tabs>

      </div>
    </div>
  );
}
