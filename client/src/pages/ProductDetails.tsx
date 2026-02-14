import { useParams, Link } from "wouter";
import { products } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, ShoppingCart, Eye, Shield, Truck, Award, ChevronLeft,Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-12"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-muted/30 to-muted mx-auto rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
            <Eye className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-muted-foreground">Product Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button size="lg" className="px-8 h-14 text-lg font-bold shadow-xl">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const galleryImages = [
    product.imageUrl,
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1400",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1400"
  ];

  const specs = [
    { label: "Brand", value: product.brand, icon: Award },
    { label: "Category", value: product.category, icon: Star },
    { label: "Warranty", value: "2 Years", icon: Shield },
    { label: "Installation", value: "Pan India", icon: Truck },
    { label: "Training", value: "Included", icon: Eye },
    { label: "Service", value: "24/7 Support", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      <Navbar />

      {/* Hero Product Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.primary/0.05)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* Main Image */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [-0.5, 0.5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl p-8 border border-white/50 group hover:shadow-3xl transition-all duration-500 overflow-hidden"
              >
                <img
                  src={galleryImages[currentImage]}
                  alt={product.name}
                  className="w-full h-[500px] lg:h-[600px] object-contain mx-auto group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
              </motion.div>

              {/* Thumbnails */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
              >
                {galleryImages.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl border-4 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      i === currentImage 
                        ? "border-primary shadow-primary/25 ring-4 ring-primary/30" 
                        : "border-transparent hover:border-primary/50"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={img} 
                      className="w-full h-full object-cover"
                      alt={`${product.name} ${i + 1}`}
                    />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8 lg:sticky lg:top-32 lg:self-start"
            >
              {/* Brand Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-primary/20 shadow-lg"
              >
                <Award className="w-5 h-5 text-primary" />
                <span className="uppercase font-bold text-primary tracking-wide">{product.brand}</span>
                <div className="ml-2 w-1 h-6 bg-gradient-to-b from-primary/50 to-transparent rounded-full animate-pulse" />
              </motion.div>

              {/* Title & Rating */}
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl lg:text-5xl font-black leading-tight mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent drop-shadow-2xl"
                >
                  {product.name}
                </motion.h1>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.1 
                        }}
                      >
                        <Star className={`w-6 h-6 ${i < 4.8 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xl font-bold text-yellow-600">(4.8 • 124 reviews)</span>
                </div>
              </div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
              >
                {product.description}
              </motion.p>

              {/* Price & Quantity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-baseline gap-4">
                  <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl">
                    ₹{product.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">per unit</div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <label className="font-bold text-lg">Quantity:</label>
                  <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-2xl p-1 shadow-lg border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-12 w-12 rounded-xl hover:bg-muted/50 transition-all"
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-6 py-3 font-bold text-xl border-l border-r border-muted/50 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-12 w-12 rounded-xl hover:bg-muted/50"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  size="lg"
                  className="flex-1 h-16 text-xl font-black rounded-3xl shadow-2xl hover:shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 group relative overflow-hidden"
                  onClick={() => addItem({ ...product, quantity })}
                >
                  <ShoppingCart className="w-7 h-7 mr-4 group-hover:translate-x-1 transition-transform" />
                  Add to Cart • {quantity > 1 && `x${quantity}`}
                  <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-16 text-xl font-bold rounded-3xl border-2 border-primary/50 hover:bg-primary/5 hover:border-primary hover:shadow-primary/25 transition-all px-8"
                >
                  <Shield className="w-6 h-6 mr-3" />
                  Request Quote
                </Button>
              </motion.div>

              {/* Features Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 pt-6"
              >
                {[
                  { icon: Truck, label: "Free Delivery", color: "emerald" },
                  { icon: Shield, label: "2 Year Warranty", color: "blue" },
                  { icon: Eye, label: "Pan India Service", color: "purple" }
                ].map(({ icon: Icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg bg-gradient-to-r from-${color}-500/10 to-${color}-600/10 border border-${color}-200/50 hover:shadow-${color}-500/25 transition-all`}
                  >
                    <Icon className={`w-5 h-5 text-${color}-500`} />
                    {label}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50 overflow-hidden"
          >
            <Tabs defaultValue="overview">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-1 rounded-t-4xl">
                <TabsList className="grid w-full grid-cols-3 bg-transparent p-2 rounded-3xl shadow-xl backdrop-blur-sm bg-white/90 border-none">
                  {[
                    { value: "overview", label: "Overview", icon: Eye },
                    { value: "specs", label: "Specifications", icon: Package },
                    { value: "reviews", label: "Reviews", icon: Star }
                  ].map(({ value, label, icon: Icon }) => (
                    <TabsTrigger 
                      key={value}
                      value={value}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 transition-all duration-500 font-bold py-4 h-auto gap-2 flex items-center justify-center"
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Overview */}
              <TabsContent value="overview" className="p-12 pt-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-3xl font-black mb-6">Clinical Excellence</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                      Imported directly from {product.brand} Japan/Germany facilities. 
                      Meets international ISO 13485 standards with certified installation 
                      and pan-India service support.
                    </p>
                    <ul className="space-y-3 text-lg text-muted-foreground">
                      <li>• Non-contact measurement technology</li>
                      <li>• AI-assisted diagnostics</li>
                      <li>• 5-year component warranty</li>
                      <li>• Remote software updates</li>
                    </ul>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-4xl p-12 shadow-2xl border border-blue-200/30">
                      <div className="relative z-10">
                        <img 
                          src={product.imageUrl} 
                          className="w-full max-w-md mx-auto drop-shadow-2xl"
                          alt={product.name}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Specifications */}
              <TabsContent value="specs" className="p-12 pt-4">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    {specs.map(({ label, value, icon: Icon }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-6 bg-gradient-to-r from-slate-50 to-white/50 rounded-3xl hover:shadow-md transition-all border hover:border-primary/30"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center shadow-lg border border-primary/30">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{label}</p>
                          <p className="text-2xl font-black text-foreground">{value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-200/50 shadow-xl">
                      <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-emerald-600" />
                        Service Promise
                      </h4>
                      <ul className="space-y-2 text-lg text-muted-foreground">
                        <li>• 24/7 Technical Support</li>
                        <li>• On-site Installation</li>
                        <li>• Annual Calibration</li>
                        <li>• Spare Parts Availability</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="p-12 pt-4">
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      author: "Dr. Anirban Sen",
                      clinic: "Netralaya Eye Hospital",
                      rating: 5,
                      text: "Transformed our diagnostic workflow. Exceptional accuracy and build quality.",
                      date: "Feb 2026"
                    },
                    {
                      author: "Vision Care Clinic",
                      clinic: "Kolkata",
                      rating: 4.8,
                      text: "Installation was smooth, support team very responsive. Highly recommend.",
                      date: "Jan 2026"
                    }
                  ].map((review, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="bg-gradient-to-b from-white/80 to-slate-50/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center border-2 border-primary/30 shadow-xl">
                          <Star className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">{review.author}</h4>
                          <p className="text-muted-foreground">{review.clinic}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-6">
                        {Array(5).fill(0).map((_, j) => (
                          <Star 
                            key={j} 
                            className={`w-5 h-5 ${j < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-lg leading-relaxed mb-6">{review.text}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {review.date} • Verified Purchase
                      </p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-muted-foreground to-primary bg-clip-text"
            >
              Similar Equipment
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {similarProducts.map((sp, i) => (
                <motion.div
                  key={sp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -20, transition: { duration: 0.4 } }}
                  className="group cursor-pointer"
                >
                  <Link href={`/products/${sp.id}`}>
                    <div className="bg-white/70 backdrop-blur-xl rounded-4xl p-8 shadow-xl hover:shadow-3xl border border-white/50 hover:border-primary/30 transition-all duration-500 h-[420px] flex flex-col overflow-hidden hover:bg-white">
                      <div className="relative h-64 mb-6 overflow-hidden rounded-3xl">
                        <img
                          src={sp.imageUrl}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          alt={sp.name}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-primary to-secondary px-4 py-2 font-bold shadow-lg">
                            -12%
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">{sp.name}</h3>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-2xl font-black text-emerald-600">₹{sp.price.toLocaleString()}</span>
                          <span className="text-xl text-muted-foreground line-through opacity-60">₹{(sp.price * 1.12).toLocaleString()}</span>
                        </div>
                        <div className="mt-auto flex items-center gap-3 text-sm text-muted-foreground mb-6">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>4.9 (23)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs uppercase font-bold text-primary tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
