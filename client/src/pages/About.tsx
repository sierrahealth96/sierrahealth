import { Navbar } from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { 
  Eye, 
  Truck, 
  Package, 
  Globe, 
  Shield, 
  Users, 
  Activity, 
  ArrowRight,
  MapPin,
  Warehouse,
  Plane
} from "lucide-react";

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

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedSlide(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);

    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4000);

    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-50 to-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Precision Vision Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed"
          >
            India's premier importer of world-class ophthalmic equipment. Serving 500+ clinics with Japan, Europe & USA technology.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
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
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center group-hover:shadow-2xl transition-all duration-300 border border-primary/30"
                  >
                    <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Hero Carousel */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative">
          <div className="overflow-hidden rounded-4xl shadow-2xl" ref={emblaRef}>
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
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-xl px-6 py-3 rounded-3xl shadow-2xl border flex items-center space-x-2"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === selectedSlide ? 'bg-primary scale-125 shadow-lg' : 'bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Animated Process Timeline */}
      <section className="py-32 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text"
          >
            Our Supply Excellence
          </motion.h2>
          <p className="text-center max-w-2xl mx-auto text-xl text-muted-foreground mb-24">
            Seamless workflow from global manufacturers to Indian clinics, powered by precision logistics.
          </p>

          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-24 h-[80vh] w-1 bg-gradient-to-b from-primary/30 to-secondary/30" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                const isEven = i % 2 === 1;
                const position = i < 3 ? (i === 0 ? 'top' : 'bottom') : 'top';
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative z-10 ${isEven ? 'md:order-2' : ''}`}
                  >
                    <div className={`p-8 rounded-3xl shadow-xl border border-transparent hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl bg-white/80 backdrop-blur-sm h-[320px] flex flex-col justify-between`}>
                      {/* Icon Circle */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl bg-gradient-to-br ${step.color} text-white border-4 border-white/20 group-hover:shadow-primary/25`}
                      >
                        <Icon className="w-10 h-10" />
                      </motion.div>
                      
                      <div>
                        <h3 className="text-2xl font-black mb-4 text-center group-hover:text-primary transition-colors">{step.title}</h3>
                        <p className="text-muted-foreground text-center leading-relaxed">{step.desc}</p>
                      </div>
                      
                      {/* Arrow */}
                      <motion.div 
                        initial={false}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mt-4 group-hover:bg-primary/40`}
                      >
                        <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black mb-16"
          >
            Leadership Team
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Arkapravo Saha",
                role: "Founder & Director",
                img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
                desc: "20+ years in medical device logistics. Pioneered ophthalmic imports in Eastern India."
              },
              {
                name: "Rahul Sharma",
                role: "Operations Head",
                img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800",
                desc: "Expert in supply chain optimization. Managing nationwide distribution networks."
              }
            ].map((person, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20, transition: { duration: 0.3 } }}
                className="group cursor-pointer"
              >
                <div className="relative mb-6">
                  <img 
                    src={person.img} 
                    className="w-48 h-48 mx-auto rounded-4xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500 border-8 border-white/50" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-4xl flex items-end p-6">
                    <p className="text-white text-sm opacity-90 leading-relaxed">{person.desc}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2">{person.name}</h3>
                <p className="text-primary font-semibold text-lg">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
