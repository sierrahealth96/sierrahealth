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
    const fetchTopSelling = async () => {
      try {
        const res = await fetch(TOP_SELLING_API);
        const data = await res.json();
        setProducts(data.slice(0, 6));
      } catch (err) {
        console.error("Failed to load top selling products", err);
        setProducts(products.slice(0, 6));
      }
    };
    fetchTopSelling();
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      ...product,
      id: product._id,
      imageUrl: product.images?.[0]
    });
  };

  return (
    <>
    {/* 🔧 FIXED: Global overflow protection */}
    <div className="overflow-x-hidden w-screen max-w-full h-screen">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-x-hidden w-full max-w-full">
        <Navbar />
        
        {/* ✨ Hero Section - FIXED */}
        <section className="relative pt-32 pb-28 lg:pt-48 lg:pb-36 overflow-hidden w-full max-w-full">
          <div className="absolute inset-0 z-0 w-full max-w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.primary/0.08)_0%,transparent_50%)]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 via-transparent to-blue-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 max-w-full relative z-20 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-full">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:pr-12 w-full max-w-full"
              >
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl font-medium text-sm mb-8 w-fit max-w-full"
                >
                  <Award className="w-5 h-5 text-emerald-600" />
                  Premium Ophthalmic Equipment • ISO Certified
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-black text-5xl lg:text-7xl lg:leading-[0.9] mb-8 bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl w-full max-w-full break-words"
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
                  className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed opacity-90 w-full max-w-full"
                >
                  Equip your clinic with world-class diagnostic, surgical, and laser systems. 
                  Imported precision instruments for modern ophthalmology.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 w-full max-w-full"
                >
                  <Link href="/products">
                    <Button size="lg" className="h-16 px-10 text-xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-2xl hover:shadow-emerald-500/25 rounded-3xl group relative overflow-hidden flex-shrink-0 w-fit">
                      <ShoppingCart className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                      Explore Catalog
                      <div className="absolute inset-0 bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-black rounded-3xl border-2 border-white/30 bg-white/20 backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex-shrink-0 w-fit">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-full max-w-full"
              >
                <div className="aspect-[4/3] lg:aspect-square rounded-4xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/90 to-white relative z-10 border border-white/50 backdrop-blur-xl w-full max-w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=85" 
                    alt="Advanced Ophthalmic Equipment" 
                    className="w-full h-full object-contain p-12 lg:p-20 hover:scale-105 transition-transform duration-1000 max-w-full"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-transparent to-blue-500/20 rounded-4xl blur-xl opacity-75 animate-pulse" />
                </div>
                
                <motion.div 
                  className="absolute top-8 right-8 max-w-max"
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

        {/* 🎯 Features - FIXED */}
        <section className="py-28 relative overflow-hidden w-full max-w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/30 w-full max-w-full" />
          <div className="container mx-auto px-4 relative z-10 w-full max-w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-24 w-full max-w-full"
            >
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl border border-emerald-200/50 backdrop-blur-sm font-bold text-emerald-700 mb-6 shadow-lg w-fit mx-auto">
                Why Choose Visionary?
              </span>
              <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-foreground bg-clip-text text-transparent mb-6 w-full max-w-full break-words">
                Medical Grade Excellence
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 w-full max-w-full">
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
                  className="group bg-white/70 backdrop-blur-xl rounded-4xl p-10 border border-white/50 shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-500 overflow-hidden relative w-full max-w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 group-hover:from-emerald-500/10 transition-all duration-500" />
                  <div className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 text-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 mb-8 relative z-10`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="font-black text-2xl mb-4 text-gray-900 relative z-10 group-hover:text-primary break-words">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed relative z-10 opacity-90">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔥 Featured Products - FIXED */}
        <section className="py-32 bg-white/50 backdrop-blur-sm overflow-hidden w-full max-w-full">
          <div className="container mx-auto px-4 w-full max-w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-6 lg:gap-0 w-full max-w-full">
              <div className="w-full lg:w-auto">
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-3xl font-bold shadow-xl mb-4 w-fit"
                >
                  <Star className="w-5 h-5 fill-white" />
                  Top Selling This Month
                </motion.span>
                <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent w-full max-w-full break-words">
                  Featured Equipment
                </h2>
              </div>
              <Link href="/products" className="w-full lg:w-auto">
                <Button variant="outline" className="px-8 h-14 text-lg font-bold rounded-3xl border-2 border-primary/30 hover:shadow-xl hover:shadow-primary/20 bg-white/50 backdrop-blur-sm w-fit mx-auto lg:ml-auto">
                  View All Products <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-full">
              {products.map((product, idx) => (
                <Link key={product._id} href={`/products/${product._id}`} className="w-full max-w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -20 }}
                    className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl hover:shadow-3xl border border-white/60 hover:border-emerald-200/50 transition-all duration-700 cursor-pointer overflow-hidden w-full max-w-full"
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50/30 w-full max-w-full">
                      <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                        alt={product.name}
                      />
                      
                      <motion.div 
                        className="absolute top-6 left-6 max-w-max"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-4 py-2 shadow-2xl text-sm backdrop-blur-sm">
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          Best Seller
                        </Badge>
                      </motion.div>

                      <div className="absolute top-6 right-6 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 max-w-max">
                        <Button size="sm" variant="ghost" className="w-12 h-12 rounded-2xl shadow-lg bg-white/90 hover:bg-white">
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="w-12 h-12 rounded-2xl shadow-lg bg-white/90 hover:bg-white"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />
                    </div>

                    <div className="p-8 w-full max-w-full">
                      <div className="flex items-center gap-2 mb-4 max-w-full">
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs font-bold rounded-full truncate max-w-[120px]">
                          {product.category?.name || "Diagnostic"}
                        </span>
                      </div>
                      
                      <h3 className="font-black text-2xl mb-3 line-clamp-2 group-hover:text-primary transition-colors break-words">
                        {product.name}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 text-lg line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between w-full max-w-full">
                        <div className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
                          {formatPriceRange(product.price)}
                        </div>
                        <Button 
                          size="lg"
                          className="px-8 font-bold rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-emerald-500/25 transition-all flex-shrink-0"
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
          </div>
        </section>

        {/* 🏆 Stats Section - FIXED */}
        <section className="py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white overflow-hidden w-full max-w-full">
          <div className="container mx-auto px-4 w-full max-w-full">
            <div className="grid md:grid-cols-4 gap-12 text-center w-full max-w-full">
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
                  className="group w-full max-w-full"
                >
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4 drop-shadow-2xl break-words">
                    {stat.num}
                  </div>
                  <p className="text-xl font-bold opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Footer - FIXED */}
        <footer className="bg-gradient-to-t from-gray-900 via-foreground to-gray-800 text-white py-24 relative overflow-hidden w-screen max-w-full">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 to-transparent w-full max-w-full" />
          <div className="container mx-auto px-4 relative z-10 w-full max-w-full">
            <div className="grid md:grid-cols-4 gap-12 mb-16 w-full max-w-full">
              <div className="lg:col-span-1 w-full max-w-full">
                <div className="flex items-center gap-4 mb-8 w-full max-w-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
                    <span className="text-2xl font-black text-white">V</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-2xl break-words">Visionary</h3>
                    <p className="text-emerald-400 font-bold">Medical Systems</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed opacity-80 w-full max-w-full">
                  Empowering eye care professionals across India with precision-engineered ophthalmic solutions.
                </p>
              </div>
              
              {[
                { title: "Products", links: ["/products?cat=diagnostic", "/products?cat=surgical", "/products?cat=laser", "/products?cat=phaco"] },
                { title: "Company", links: ["/about", "/contact", "/careers", "/blog"] },
                { title: "Support", links: ["/warranty", "/service", "/installation", "/faq"] }
              ].map((section, idx) => (
                <div key={idx} className="w-full max-w-full">
                  <h4 className="font-bold text-xl mb-6 flex items-center gap-2 w-fit">
                    <Zap className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    {section.title}
                  </h4>
                  <ul className="space-y-3 w-full max-w-full">
                    {section.links.map((href, i) => (
                      <li key={i} className="w-full max-w-full">
                        <Link href={href} className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block group truncate max-w-full">
                          {href.split('/')[1] || "Home"}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <div className="w-full max-w-full">
                <h4 className="font-bold text-xl mb-6 w-fit">Stay Updated</h4>
                <p className="text-gray-300 mb-6 opacity-80 w-full max-w-full">Latest equipment releases and clinical insights.</p>
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 w-full max-w-full">
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
            
            <div className="border-t border-white/10 pt-12 text-center text-gray-400 w-full max-w-full">
              <p className="w-full max-w-full">© 2026 Visionary Medical Equipment. All rights reserved. | PAN India Service Network</p>
            </div>
          </div>
        </footer>

        <AIAssistant />
      </div>
    </div>
    </>
  );
}
