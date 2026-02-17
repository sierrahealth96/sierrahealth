import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { 
  Eye, 
  Truck, 
  Package, 
  Globe, 
  Users, 
  Activity, 
  ArrowRight,
  MapPin,
  Warehouse,
  Plane,
  Leaf,
  TrendingUp,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const stats = [
  { value: "500+", label: "Clinics Served", icon: Users },
  { value: "50K+", label: "Equipment Units", icon: Package },
  { value: "98%", label: "On-Time Delivery", icon: Truck },
  { value: "10+", label: "Years Excellence", icon: Activity }
];

const processSteps = [
  {
    icon: Globe,
    title: "Global Sourcing",
    desc: "Partner with premium manufacturers from Japan (Nidek, Topcon), Europe (Zeiss), and USA (Alcon). Strict quality certification.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Plane,
    title: "Precision Import",
    desc: "Temperature-controlled logistics ensure equipment integrity during transit to India.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Warehouse,
    title: "Central Warehousing",
    desc: "Howrah facility with inspection, calibration, and inventory management for nationwide dispatch.",
    color: "from-orange-500 to-amber-600"
  },
  {
    icon: MapPin,
    title: "Clinic Delivery",
    desc: "Direct to hospitals & eye clinics across India with certified installation & service support.",
    color: "from-purple-500 to-violet-600"
  }
];

export default function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    speed: 8,
    dragFree: true 
  });
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [growthAnimation, setGrowthAnimation] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedSlide(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);

    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4000);

    const timer = setTimeout(() => setGrowthAnimation(true), 1000);
    
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
      clearTimeout(timer);
    };
  }, [emblaApi]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Precision Vision Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed opacity-90"
          >
            India's premier importer of world-class ophthalmic equipment. Serving 500+ clinics with Japan, Europe & USA technology.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-emerald-50/50 to-blue-50/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-3xl flex items-center justify-center group-hover:shadow-2xl transition-all duration-300 border-2 border-emerald-200/50 backdrop-blur-sm"
                  >
                    <Icon className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-muted-foreground font-semibold text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Hero Carousel */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative">
          <div className="overflow-hidden rounded-4xl shadow-2xl border border-white/50" ref={emblaRef}>
            <div className="flex">
              {[
                "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1400",
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1400",
                "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1400",
                "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1400"
              ].map((img, i) => (
                <div key={i} className="flex-[0_0_100%]">
                  <img 
                    src={img} 
                    alt={`Ophthalmic equipment ${i+1}`}
                    className="w-full h-[500px] md:h-[600px] object-cover hover:scale-[1.02] transition-transform duration-1000" 
                  />
                </div>
              ))}
            </div>
          </div>
          <AnimatePresence>
            {emblaApi && (
              <motion.div
                key={selectedSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-3xl shadow-2xl border border-emerald-200/50 flex items-center space-x-2"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === selectedSlide ? 'bg-emerald-500 scale-125 shadow-lg' : 'bg-gray-300/50'
                    }`}
                    whileHover={{ scale: i === selectedSlide ? 1.4 : 1.2 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Animated Process Timeline */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-emerald-50/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent drop-shadow-xl"
          >
            Our Supply Excellence
          </motion.h2>
          <p className="text-center max-w-2xl mx-auto text-xl text-muted-foreground mb-24 leading-relaxed opacity-90">
            Seamless workflow from global manufacturers to Indian clinics, powered by precision logistics.
          </p>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-24 h-[80vh] w-1 bg-gradient-to-b from-emerald-400/40 to-blue-400/40 rounded-full shadow-lg" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                const isEven = i % 2 === 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`group relative z-10 ${isEven ? 'md:order-2' : ''}`}
                  >
                    <div className={`p-8 rounded-4xl shadow-xl border border-white/50 hover:border-emerald-200/70 transition-all duration-500 group-hover:shadow-2xl bg-white/80 backdrop-blur-sm h-[340px] flex flex-col justify-between hover:bg-white/95 hover:-translate-y-2`}>
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl bg-gradient-to-br ${step.color} text-white border-4 border-white/30 group-hover:shadow-emerald/25 group-hover:border-white/50`}
                      >
                        <Icon className="w-10 h-10" />
                      </motion.div>
                      
                      <div>
                        <h3 className="text-2xl font-black mb-4 text-center group-hover:text-emerald-600 transition-colors drop-shadow-sm">{step.title}</h3>
                        <p className="text-muted-foreground text-center leading-relaxed text-sm opacity-95">{step.desc}</p>
                      </div>
                      
                      <motion.div 
                        initial={false}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`w-10 h-10 bg-emerald-100/70 rounded-2xl flex items-center justify-center mx-auto mt-4 group-hover:bg-emerald-500/80 backdrop-blur-sm shadow-lg`}
                      >
                        <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:text-white transition-all duration-300" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 🌳 GROWTH ANIMATION SECTION - FIXED */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Our Growth Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-24 max-w-3xl mx-auto leading-relaxed"
          >
            From a single warehouse in Howrah to serving 500+ clinics nationwide. Watch our growth story unfold.
          </motion.p>

          {/* 🌿 Animated Growth Tree */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={growthAnimation ? { scale: 1, rotate: 0 } : { scale: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="max-w-4xl mx-auto relative mb-20"
          >
            {/* Tree Trunk - Growing */}
            <motion.div
              initial={{ height: 0 }}
              animate={growthAnimation ? { height: 300 } : { height: 0 }}
              transition={{ duration: 3, delay: 0.8, ease: "easeOut" }}
              className="w-4 bg-gradient-to-t from-[#8B4513] to-[#D2691E] mx-auto rounded-full shadow-2xl relative overflow-hidden"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={growthAnimation ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 2, delay: 1.5 }}
                className="absolute inset-0 bg-gradient-to-t from-[#654321]/50 to-transparent"
              />
            </motion.div>

            {/* Leaves - Blooming */}
            <motion.div
              initial={{ scale: 0 }}
              animate={growthAnimation ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 2, delay: 2.5, type: "spring", stiffness: 200 }}
              className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-80 h-80"
            >
              <div className="relative w-full h-full">
                {/* Multiple leaf layers */}
                {[0, 1, 2, 3].map((layer) => (
                  <motion.div
                    key={layer}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={growthAnimation ? { 
                      scale: 1, 
                      rotate: [0, 10, -5, 0] 
                    } : { scale: 0 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 3 + layer * 0.2, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute w-24 h-24 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 rounded-full blur-xl opacity-60"
                    style={{
                      left: `${20 + layer * 15}%`,
                      top: `${10 + layer * 10}%`,
                      transform: `rotate(${layer * 45}deg)`
                    }}
                  />
                ))}
                
                {/* Main Leaves */}
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={growthAnimation ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, delay: 3.2 }}
                  className="absolute inset-0"
                >
                  <Leaf className="w-32 h-32 text-emerald-500 absolute -left-8 -top-8 drop-shadow-2xl" />
                  <Leaf className="w-28 h-28 text-emerald-400 absolute -right-12 top-4 rotate-12 drop-shadow-xl" />
                  <Leaf className="w-24 h-24 text-teal-400 absolute left-4 bottom-8 -rotate-6 drop-shadow-lg" />
                </motion.div>
              </div>
            </motion.div>

            {/* Growth Particles */}
            <AnimatePresence>
              {growthAnimation && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        x: "50%", 
                        y: "100%", 
                        scale: 0,
                        opacity: 0
                      }}
                      animate={{ 
                        x: `${20 + Math.sin(i) * 40}%`, 
                        y: `${10 + Math.cos(i) * 20}%`,
                        scale: 1,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        delay: 2 + i * 0.1,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      className="absolute w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg"
                      style={{
                        left: "50%",
                        top: "100%"
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Growth Stats - FIXED ICONS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={growthAnimation ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 4 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200/50">
              <TrendingUp className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <div className="text-3xl font-black text-emerald-600 mb-2">500+</div>
              <p className="text-muted-foreground font-semibold">Clinics Reached</p>
            </div>
            <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200/50">
              <Zap className="w-16 h-16 text-teal-500 mx-auto mb-4" />
              <div className="text-3xl font-black text-teal-600 mb-2">50K+</div>
              <p className="text-muted-foreground font-semibold">Units Delivered</p>
            </div>
            <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200/50">
              <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-black text-green-600 mb-2">10+</div>
              <p className="text-muted-foreground font-semibold">Years Growing</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-foreground/95 to-foreground text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl">V</div>
                <span className="font-black text-2xl">Visionary</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed opacity-90 max-w-sm">
                Empowering eye care professionals with precision instruments for better patient outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Products</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/products?cat=diagnostic" className="hover:text-white transition-colors">Diagnostic</Link></li>
                <li><Link href="/products?cat=surgical" className="hover:text-white transition-colors">Surgical</Link></li>
                <li><Link href="/products?cat=laser" className="hover:text-white transition-colors">Laser Systems</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-gray-300 text-sm mb-4 opacity-80">Subscribe for latest product updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-400 flex-1 focus:ring-2 focus:ring-emerald-400/50 backdrop-blur-sm"
                />
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl font-bold px-6 whitespace-nowrap">Join</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-gray-400">
            © 2026 Visionary Medical Equipment. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
