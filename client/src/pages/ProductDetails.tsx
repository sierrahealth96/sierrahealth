import { useParams, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, ShoppingCart, Eye, Shield, Truck, Award, ChevronLeft, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/Url";

const PRODUCT_DETAILS = `${BASE_URL}/api/products/get/details/`;
const PRODUCT_BY_CATEGORY = `${BASE_URL}/api/products/get/by-category/`;

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${PRODUCT_DETAILS}${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Fetch similar products after product details load
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!product?.category?._id || !id) return;

      try {
        const response = await fetch(
          `${PRODUCT_BY_CATEGORY}${product.category._id}?exclude=${id}`
        );

        if (!response.ok) throw new Error("Failed to load similar products");

        const data = await response.json();
        setSimilarProducts(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch similar products:", err);
        setSimilarProducts([]);
      }
    };

    fetchSimilarProducts();
  }, [product, id]);

  const galleryImages = product?.images || [];

  const specs = [
    { label: "Brand", value: product?.brand || "N/A", icon: Award },
    { label: "Category", value: product?.category?.name || "N/A", icon: Star },
    { label: "Warranty", value: "2 Years", icon: Shield },
    { label: "Installation", value: "Pan India", icon: Truck },
    { label: "Training", value: "Included", icon: Eye },
    { label: "Service", value: "24/7 Support", icon: Shield }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8 sm:p-12"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-muted/30 to-muted mx-auto rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
            <Eye className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-4 text-muted-foreground">{error || "Product Not Found"}</h2>
          <p className="text-lg text-muted-foreground mb-8 px-4">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button size="lg" className="px-8 h-14 text-lg font-bold shadow-xl w-full sm:w-auto">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      <Navbar />

      {/* Hero Product Section - MOBILE FIRST */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.primary/0.05)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="w-full space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            
            {/* Image Gallery - MOBILE STACKED */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:order-2 relative"
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
                className="bg-white/80 backdrop-blur-xl rounded-3xl sm:rounded-4xl shadow-2xl p-4 sm:p-8 border border-white/50 group hover:shadow-3xl transition-all duration-500 overflow-hidden w-full"
              >
                <img
                  src={galleryImages[currentImage] || galleryImages[0]}
                  alt={product.name}
                  className="w-full h-[300px] sm:h-[450px] lg:h-[500px] xl:h-[600px] object-contain mx-auto group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
              </motion.div>

              {/* Thumbnails - MOBILE HORIZONTAL SCROLL */}
              {galleryImages.length > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 sm:gap-3 mt-4 sm:mt-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent snap-x snap-mandatory"
                >
                  {galleryImages.map((img, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-2xl border-3 sm:border-4 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 snap-center ${
                        i === currentImage 
                          ? "border-emerald-500 shadow-emerald-500/25 ring-2 sm:ring-4 ring-emerald-500/30" 
                          : "border-transparent hover:border-emerald-500/50"
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
              )}
            </motion.div>

            {/* Product Info - MOBILE FULL WIDTH */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:sticky lg:top-32 lg:self-start space-y-6 sm:space-y-8"
            >
              {/* Brand Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-100/80 to-emerald-200/80 rounded-2xl sm:rounded-3xl border border-emerald-200/50 shadow-lg w-full sm:w-fit"
              >
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <span className="uppercase font-bold text-emerald-700 tracking-wide text-sm sm:text-base truncate">{product.brand}</span>
                <div className="ml-auto w-1 h-4 sm:h-6 bg-gradient-to-b from-emerald-500/50 to-transparent rounded-full animate-pulse hidden sm:block" />
              </motion.div>

              {/* Title & Rating */}
              <div className="space-y-4 sm:space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 sm:mb-6 bg-gradient-to-r from-foreground via-emerald-600 to-emerald-700 bg-clip-text text-transparent drop-shadow-2xl line-clamp-2 sm:line-clamp-none"
                >
                  {product.name}
                </motion.h1>
                
                <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <div className="flex gap-1 sm:gap-0.5">
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
                        <Star className={`w-5 h-5 sm:w-6 sm:h-6 ${i < 4.8 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-yellow-600">(4.8 • 124 reviews)</span>
                </div>
              </div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-lg line-clamp-4 sm:line-clamp-none"
              >
                {product.description}
              </motion.p>

              {/* Price & Quantity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 sm:space-y-6"
              >
                <div className="flex items-baseline gap-2 sm:gap-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl">
                    ₹{product.price?.toLocaleString() || "0"}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium">per unit</div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <label className="font-bold text-base sm:text-lg whitespace-nowrap">Quantity:</label>
                  <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-2xl p-1 shadow-lg border w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-12 w-12 rounded-xl hover:bg-muted/50 transition-all flex-shrink-0"
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-4 sm:px-6 py-3 font-bold text-lg sm:text-xl border-l border-r border-muted/50 min-w-[50px] sm:min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-12 w-12 rounded-xl hover:bg-muted/50 transition-all flex-shrink-0"
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
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full"
              >
                <Button
                  size="lg"
                  className="flex-1 h-14 sm:h-16 text-lg sm:text-xl font-black rounded-3xl shadow-2xl hover:shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 group relative overflow-hidden"
                  onClick={() => addItem({ 
                    ...product, 
                    _id: product._id,
                    imageUrl: product.images?.[0],
                    quantity 
                  })}
                >
                  <ShoppingCart className="w-5 h-5 sm:w-7 sm:h-7 mr-2 sm:mr-4 group-hover:translate-x-1 transition-transform" />
                  Add to Cart {quantity > 1 && `• x${quantity}`}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-14 sm:h-16 text-lg sm:text-xl font-bold rounded-3xl border-2 border-emerald-500/50 hover:bg-emerald-500/5 hover:border-emerald-500 hover:shadow-emerald-500/25 transition-all px-4 sm:px-8"
                >
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Request Quote
                </Button>
              </motion.div>

              {/* Features Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 sm:gap-3 pt-4 sm:pt-6"
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
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold flex items-center gap-2 shadow-lg bg-gradient-to-r from-${color}-500/10 to-${color}-600/10 border border-${color}-200/50 hover:shadow-${color}-500/25 transition-all flex-1 sm:flex-none text-xs sm:text-sm`}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${color}-500`} />
                    {label}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="py-16 sm:py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl sm:rounded-4xl shadow-2xl border border-white/50 overflow-hidden"
          >
            <Tabs defaultValue="overview">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-1 rounded-t-3xl sm:rounded-t-4xl">
                <TabsList className="grid w-full grid-cols-3 bg-transparent p-1 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl backdrop-blur-sm bg-white/90 border-none">
                  {[
                    { value: "overview", label: "Overview", icon: Eye },
                    { value: "specs", label: "Specifications", icon: Package },
                    { value: "reviews", label: "Reviews", icon: Star }
                  ].map(({ value, label, icon: Icon }) => (
                    <TabsTrigger 
                      key={value}
                      value={value}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:scale-105 transition-all duration-500 font-bold py-3 sm:py-4 h-auto gap-2 flex items-center justify-center text-xs sm:text-sm"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">{label}</span>
                      <span className="sm:hidden">{label.charAt(0)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Overview */}
              <TabsContent value="overview" className="p-6 sm:p-12 pt-6 sm:pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-2xl sm:text-3xl font-black mb-6 line-clamp-2">Clinical Excellence</h3>
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg line-clamp-4 sm:line-clamp-none">
                      Imported directly from {product.brand} Japan/Germany facilities. 
                      Meets international ISO 13485 standards with certified installation 
                      and pan-India service support.
                    </p>
                    <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg text-muted-foreground">
                      <li>• Non-contact measurement technology</li>
                      <li>• AI-assisted diagnostics</li>
                      <li>• 5-year component warranty</li>
                      <li>• Remote software updates</li>
                    </ul>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full"
                  >
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl sm:rounded-4xl p-6 sm:p-12 shadow-2xl border border-blue-200/30">
                      <div className="relative z-10">
                        <img 
                          src={product.images?.[0]} 
                          className="w-full max-w-sm sm:max-w-md mx-auto drop-shadow-2xl object-contain"
                          alt={product.name}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              {/* Specifications */}
              <TabsContent value="specs" className="p-6 sm:p-12 pt-6 sm:pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
                  <div className="space-y-4 sm:space-y-6">
                    {specs.map(({ label, value, icon: Icon }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-white/50 rounded-2xl sm:rounded-3xl hover:shadow-md transition-all border hover:border-emerald-500/30 w-full"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border border-emerald-500/30 flex-shrink-0">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-base sm:text-lg truncate">{label}</p>
                          <p className="text-xl sm:text-2xl font-black text-foreground">{value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8 rounded-3xl border border-emerald-200/50 shadow-xl">
                      <h4 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 sm:gap-3">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                        Service Promise
                      </h4>
                      <ul className="space-y-1 sm:space-y-2 text-base sm:text-lg text-muted-foreground">
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
              <TabsContent value="reviews" className="p-6 sm:p-12 pt-6 sm:pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                      className="bg-gradient-to-b from-white/80 to-slate-50/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all w-full"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-emerald-500/30 shadow-xl flex-shrink-0 mt-1">
                          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-lg sm:text-xl line-clamp-1">{review.author}</h4>
                          <p className="text-muted-foreground text-sm sm:text-base line-clamp-1">{review.clinic}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6">
                        {Array(5).fill(0).map((_, j) => (
                          <Star 
                            key={j} 
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${j < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 line-clamp-3">{review.text}</p>
                      <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-1">
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
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-muted-foreground to-emerald-600 bg-clip-text line-clamp-1"
          >
            Similar Equipment
          </motion.h2>
          
          {similarProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {similarProducts.map((sp, i) => (
                <motion.div
                  key={sp._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12, transition: { duration: 0.4 } }}
                  className="group cursor-pointer w-full"
                >
                  <Link href={`/products/${sp._id}`}>
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-xl hover:shadow-3xl border border-white/50 hover:border-emerald-500/30 transition-all duration-500 h-[380px] sm:h-[420px] flex flex-col overflow-hidden hover:bg-white w-full">
                      <div className="relative h-48 sm:h-64 mb-4 sm:mb-6 overflow-hidden rounded-2xl sm:rounded-3xl">
                        <img
                          src={sp.images?.[0]}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          alt={sp.name}
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 line-clamp-2 group-hover:text-emerald-600 transition-colors">{sp.name}</h3>
                        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                          <span className="text-xl sm:text-2xl font-black text-emerald-600">₹{sp.price?.toLocaleString()}</span>
                        </div>
                        <div className="mt-auto flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                          <Star className="w-4 h-4 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span>4.9 (23)</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm uppercase font-bold text-emerald-600 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 sm:py-24 px-4"
            >
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-muted/30 to-muted mx-auto rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-2xl">
                <Package className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 text-muted-foreground">No Similar Products</h3>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto mb-8 px-4 line-clamp-2 sm:line-clamp-none">
                No other products in this category are currently available.
              </p>
              <Link href="/products">
                <Button size="lg" className="px-8 sm:px-12 h-14 text-lg font-bold shadow-xl w-full sm:w-auto">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Browse All Products
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
