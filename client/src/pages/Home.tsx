import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Activity, Truck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { AIAssistant } from "@/components/AIAssistant";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";

export default function Home() {
  // const { data: products } = useProducts();
  const { addItem } = useCart();

  const featuredProducts = products?.filter(p => p.isBestSeller).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                Premium Ophthalmic Equipment
              </span>
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
                Precision Vision <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Technology
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Equip your clinic with world-class diagnostic and surgical instruments designed for the modern ophthalmologist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full">
                    Explore Catalog
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white relative z-10">
                {/* Unsplash image of medical equipment */}
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80" 
                  alt="Advanced Ophthalmic Equipment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl z-0" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Certified Quality", desc: "ISO certified equipment with 2-year standard warranty." },
              { icon: Activity, title: "Latest Technology", desc: "Featuring cutting-edge diagnostic capabilities." },
              { icon: Truck, title: "Global Shipping", desc: "Secure, insured delivery to your clinic anywhere." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-medium tracking-wider uppercase text-sm">Selection</span>
              <h2 className="font-display text-4xl font-bold mt-2">Featured Equipment</h2>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="hidden md:flex">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link href={`/products/${product.id}`}>
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.isBestSeller && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Best Seller
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                  <h3 className="font-display text-xl font-bold mb-2 text-foreground">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <Button onClick={() => addItem(product)} size="sm" className="rounded-lg">
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

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-foreground font-bold">V</div>
                <span className="font-display font-bold text-xl">Visionary</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering eye care professionals with precision instruments for better patient outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Products</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/products?cat=diagnostic">Diagnostic</Link></li>
                <li><Link href="/products?cat=surgical">Surgical</Link></li>
                <li><Link href="/products?cat=laser">Laser Systems</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe for latest product updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/10 border-none rounded-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 flex-1 focus:ring-1 focus:ring-primary"
                />
                <Button size="sm">Join</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-gray-500">
            © 2024 Visionary Medical Equipment. All rights reserved.
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}
