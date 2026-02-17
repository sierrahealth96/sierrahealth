import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Activity, 
  Truck, 
  Award,
  Eye,
  Zap,
  Heart,
  ShoppingCart 
} from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { AIAssistant } from "@/components/AIAssistant";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/Url";

const TOP_SELLING_API = `${BASE_URL}/api/products/get/top-selling`;

export default function Home() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await fetch(TOP_SELLING_API);
        const data = await res.json();
        setProducts(data.slice(0, 6));
      } catch (err) {
        console.error("Failed to load top selling products", err);
        setProducts(products.slice(0, 6)); // Fallback to static data
      }
    };
    fetchTopSelling();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Navbar />
      
      {/* ✨ Hero Section - Premium Glassmorphism */}
      <section className="relative pt-32 pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.primary/0.08)_0%,transparent_50%)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 via-transparent to-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:pr-12"
            >
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl font-medium text-sm mb-8"
              >
                <Award className="w-5 h-5 text-emerald-600" />
                Premium Ophthalmic Equipment • ISO Certified
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-black text-5xl lg:text-7xl lg:leading-[0.9] mb-8 bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl"
              >
                Precision Vision <br className="hidden lg:block" />
                <span className="block lg:inline bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl">
                  Technology
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed opacity-90"
              >
                Equip your clinic with world-class diagnostic, surgical, and laser systems. 
                Imported precision instruments for modern ophthalmology.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/products">
                  <Button size="lg" className="h-16 px-10 text-xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-2xl hover:shadow-emerald-500/25 rounded-3xl group relative overflow-hidden">
                    <ShoppingCart className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                    Explore Catalog
                    <div className="absolute inset-0 bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-black rounded-3xl border-2 border-white/30 bg-white/20 backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] lg:aspect-square rounded-4xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/90 to-white relative z-10 border border-white/50 backdrop-blur-xl">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=85" 
                  alt="Advanced Ophthalmic Equipment" 
                  className="w-full h-full object-contain p-12 lg:p-20 hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-transparent to-blue-500/20 rounded-4xl blur-xl opacity-75 animate-pulse" />
              </div>
              
              {/* Floating badges */}
              <motion.div 
                className="absolute top-8 right-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-4 py-2 shadow-xl text-sm">
                  #1 Choice
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🎯 Features - Glass Cards */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl border border-emerald-200/50 backdrop-blur-sm font-bold text-emerald-700 mb-6 shadow-lg">
              Why Choose Visionary?
            </span>
            <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-foreground bg-clip-text text-transparent mb-6">
              Medical Grade Excellence
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Certified Quality", 
                desc: "ISO 13485 certified with 2-5 year warranties. Imported from Japan/Germany.",
                color: "emerald"
              },
              { 
                icon: Activity, 
                title: "AI Technology", 
                desc: "Next-gen diagnostics with AI assistance and real-time data analytics.",
                color: "blue"
              },
              { 
                icon: Truck, 
                title: "Pan India Service", 
                desc: "24/7 support, on-site installation, annual calibration included.",
                color: "purple"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -12, transition: { duration: 0.4 } }}
                className="group bg-white/70 backdrop-blur-xl rounded-4xl p-10 border border-white/50 shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 group-hover:from-emerald-500/10 transition-all duration-500" />
                <div className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 text-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 mb-8 relative z-10`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="font-black text-2xl mb-4 text-gray-900 relative z-10 group-hover:text-primary">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed relative z-10 opacity-90">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 Featured Products - Premium Cards */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-20">
            <div>
              <motion.span 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-3xl font-bold shadow-xl mb-4"
              >
                <Star className="w-5 h-5 fill-white" />
                Top Selling This Month
              </motion.span>
              <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent">
                Featured Equipment
              </h2>
            </div>
            <Link href="/products">
              <Button variant="outline" className="px-8 h-14 text-lg font-bold rounded-3xl border-2 border-primary/30 hover:shadow-xl hover:shadow-primary/20 bg-white/50 backdrop-blur-sm">
                View All Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, idx) => (
              <Link key={product._id} href={`/products/${product._id}`}>
              <motion.div
                key={product._id || idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -20 }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl hover:shadow-3xl border border-white/60 overflow-hidden hover:border-emerald-200/50 transition-all duration-700 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Premium Image Container */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50/30">
                  <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                    alt={product.name}
                  />
                  
                  {/* Animated badges */}
                  <motion.div 
                    className="absolute top-6 left-6"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-4 py-2 shadow-2xl text-sm backdrop-blur-sm">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Best Seller
                    </Badge>
                  </motion.div>

                  {/* Quick Actions */}
                  <div className="absolute top-6 right-6 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button size="sm" variant="ghost" className="w-12 h-12 rounded-2xl shadow-lg bg-white/90 hover:bg-white">
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-12 h-12 rounded-2xl shadow-lg bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({
                          ...product,
                          id: product._id,
                          imageUrl: product.images?.[0]
                        });
                      }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs font-bold rounded-full">
                      {product.category?.name || "Diagnostic"}
                    </span>
                  </div>
                  
                  <h3 className="font-black text-2xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 text-lg line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
                      ₹{product.price?.toLocaleString()}
                    </div>
                    <Button 
                      size="lg"
                      className="px-8 font-bold rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-emerald-500/25 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          ...product,
                          id: product._id,
                          imageUrl: product.images?.[0]
                        });
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🏆 Stats Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { num: "500+", label: "Clinics Served" },
              { num: "10K+", label: "Equipment Installed" },
              { num: "98%", label: "Customer Satisfaction" },
              { num: "24/7", label: "Support Available" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                  {stat.num}
                </div>
                <p className="text-xl font-bold opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-t from-gray-900 via-foreground to-gray-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-2xl font-black text-white">V</span>
                </div>
                <div>
                  <h3 className="font-black text-2xl">Visionary</h3>
                  <p className="text-emerald-400 font-bold">Medical Systems</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed opacity-80">
                Empowering eye care professionals across India with precision-engineered ophthalmic solutions.
              </p>
            </div>
            
            {[
              { title: "Products", links: ["/products?cat=diagnostic", "/products?cat=surgical", "/products?cat=laser", "/products?cat=phaco"] },
              { title: "Company", links: ["/about", "/contact", "/careers", "/blog"] },
              { title: "Support", links: ["/warranty", "/service", "/installation", "/faq"] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((href, i) => (
                    <li key={i}>
                      <Link href={href} className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block group">
                        {href.split('/')[1] || "Home"}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div>
              <h4 className="font-bold text-xl mb-6">Stay Updated</h4>
              <p className="text-gray-300 mb-6 opacity-80">Latest equipment releases and clinical insights.</p>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent border-none text-white placeholder-gray-400 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-2xl"
                />
                <Button className="w-full mt-3 h-12 font-bold rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12 text-center text-gray-400">
            <p>© 2026 Visionary Medical Equipment. All rights reserved. | PAN India Service Network</p>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}
