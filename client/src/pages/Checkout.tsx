import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/cart";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Truck, ShieldCheck, Clock, Package, ArrowRight, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BASE_URL } from "@/Url";

const ORDER_API = `${BASE_URL}/api/orders/create`;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    message: items.length > 0
      ? `I am interested in purchasing the following items:\n${items
          .map((i) => `• ${i.name} (Qty: ${i.quantity}) (₹${i.price.toLocaleString()})`)
          .join("\n")}`
      : ""
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customerName || !form.email || !form.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill name, email, and phone number",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        message: form.message || "",
        products: items.map(item => ({
          productId: item._id,
          quantity: item.quantity
        }))
      };

      const res = await fetch(ORDER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit quote request");
      }

      toast({
        title: "🎉 Quote Request Sent!",
        description: "We'll contact you within 24 hours with pricing & delivery details."
      });

      clearCart();
      setLocation("/");
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    setLocation("/products");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Navbar />

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-32 pb-20 max-w-6xl"
      >
        <div className="text-center bg-white/70 backdrop-blur-xl rounded-4xl p-12 shadow-2xl border border-emerald-200/50 mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Request Quote
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Complete your details below. Get a formal quote with delivery timeline within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* 🔥 Premium Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 space-y-6"
          >
            <Card className="bg-gradient-to-br from-white via-white/90 to-emerald-50/50 backdrop-blur-xl shadow-2xl border border-emerald-200/50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-emerald-200/30 pb-6">
                <CardTitle className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  Order Summary ({items.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-center gap-4 p-4 rounded-3xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all border border-emerald-100/50 hover:border-emerald-200/70 hover:shadow-xl"
                    >
                      <div className="relative overflow-hidden rounded-2xl w-20 h-20 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                        <img
                          src={item.imageUrl || item.images?.[0] || "/placeholder.jpg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg text-gray-900 line-clamp-2 mb-1 group-hover:text-emerald-600 transition-colors">{item.name}</h4>
                        <p className="text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
                          <span>{item.category?.name || "Equipment"}</span>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                            Qty: {item.quantity}
                          </span>
                        </p>
                      </div>
                      <div className="text-right font-bold text-xl text-emerald-600 min-w-[100px]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="pt-6 border-t border-emerald-200/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 p-6 rounded-3xl backdrop-blur-sm">
                    <div className="flex justify-between items-center text-2xl font-black text-gray-900 mb-2">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-emerald-700 font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Price valid for 48 hours • Free consultation included
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-3 gap-4 bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/30"
            >
              {[
                { icon: Truck, text: "Nationwide Delivery", color: "emerald" },
                { icon: Clock, text: "24h Quote", color: "teal" },
                { icon: ShieldCheck, text: "100% Secure", color: "blue" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-white/80 hover:from-white">
                  <div className={`w-10 h-10 bg-${item.color}-100 rounded-2xl flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <span className="font-semibold text-sm text-gray-800">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 🔥 Premium Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 space-y-6"
          >
            <Card className="bg-gradient-to-br from-white via-white/90 to-emerald-50/50 backdrop-blur-xl shadow-2xl border border-emerald-200/50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-emerald-200/30 pb-8">
                <CardTitle className="text-3xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
                  Contact Details
                </CardTitle>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We'll send you a formal quote with delivery timeline & payment options.
                </p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Full Name *</Label>
                      <Input
                        placeholder="Enter your full name"
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border-emerald-200 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-900">Email *</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="h-14 rounded-2xl border-emerald-200 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-900">Phone Number *</Label>
                    <Input
                      placeholder="+91 98765 43210"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="h-14 rounded-2xl border-emerald-200 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-900">Additional Notes (Optional)</Label>
                    <Textarea
                      placeholder="Installation requirements, preferred delivery date, budget constraints..."
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="rounded-2xl border-emerald-200 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all resize-vertical min-h-[120px]"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      type="submit"
                      className="w-full h-16 text-xl font-black rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 group overflow-hidden relative"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          Processing Request...
                        </>
                      ) : (
                        <>
                          <Mail className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                          Send Quote Request
                          <ArrowRight className="w-6 h-6 ml-auto group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
