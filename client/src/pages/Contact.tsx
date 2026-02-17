import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Loader2, ShieldCheck, Truck, Clock, Map, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/Url";

const ORDER_API = `${BASE_URL}/api/orders/create`;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    message: ""
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
        title: "Missing details",
        description: "Please enter name, email and phone",
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
        products: []
      };

      const res = await fetch(ORDER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit inquiry");
      }

      toast({
        title: "🎉 Inquiry Submitted!",
        description: "Our team will contact you within 24 hours."
      });

      setForm({
        customerName: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      value: "info@visionarymedical.in",
      link: "mailto:info@visionarymedical.in"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: MapPin,
      title: "Location", 
      value: "Howrah, West Bengal",
      link: "#"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "24 Hours",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <Navbar />

      <div className="pt-32 pb-20">
        {/* Hero Banner */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 max-w-6xl mb-20"
        >
          <div className="text-center bg-white/70 backdrop-blur-xl rounded-4xl p-12 shadow-2xl border border-emerald-200/50">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-foreground to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl"
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Ready for premium ophthalmic equipment? Our experts respond within 24 hours.
            </motion.p>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-16 items-start">
          
          {/* ✨ Premium Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 lg:sticky lg:top-32"
          >
            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 backdrop-blur-xl rounded-4xl p-8 border border-emerald-200/30 shadow-2xl">
              <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Contact Details
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-emerald-200/50 hover:border-emerald-300/70 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <CardContent className="p-6 pb-4">
                        <div className="flex items-start gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 mt-1 group-hover:shadow-emerald-500/25"
                          >
                            <item.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h4>
                            <a 
                              href={item.link} 
                              className="text-emerald-600 font-semibold text-xl hover:text-emerald-700 transition-colors block truncate"
                            >
                              {item.value}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Service Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Free Consultation",
                  desc: "Equipment selection & pricing"
                },
                {
                  icon: Truck,
                  title: "Nationwide Delivery", 
                  desc: "Doorstep installation included"
                },
                {
                  icon: Map,
                  title: "Howrah Showroom",
                  desc: "Visit our facility"
                }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="bg-white/70 backdrop-blur-xl h-full border-emerald-200/30 hover:shadow-2xl hover:border-emerald-300/50 transition-all group">
                    <CardContent className="p-6 flex items-center gap-4 h-full">
                      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <service.icon className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg mb-1">{service.title}</h5>
                        <p className="text-muted-foreground text-sm">{service.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 🔥 Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-white via-white/90 to-emerald-50/50 backdrop-blur-xl shadow-2xl border border-emerald-200/50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-emerald-200/30 pb-8">
                <CardTitle className="text-3xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
                  Send Inquiry
                </CardTitle>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Fill out the form below. We'll get back to you within 24 hours.
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
                    <Label className="text-sm font-semibold text-gray-900">Your Query</Label>
                    <Textarea
                      placeholder="Tell us about your equipment needs, budget, or specific requirements..."
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="rounded-2xl border-emerald-200 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all resize-vertical"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="pt-2"
                  >
                    <Button 
                      type="submit" 
                      className="w-full h-16 text-xl font-black rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 group overflow-hidden relative"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Mail className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
                          Submit Inquiry
                          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-emerald-700 font-semibold bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/30"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                100% Secure Form
              </div>
              <div className="w-px h-6 bg-emerald-300/50" />
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Free Consultation
              </div>
              <div className="w-px h-6 bg-emerald-300/50" />
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Reply in 24h
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
