// QueriesPanel.tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MessageCircle, Package, Clock, CheckCircle2 } from "lucide-react";

const queries = [
  {
    id: 1,
    name: "Dr. Anirban Sen",
    email: "drsen@gmail.com",
    phone: "9876543210",
    products: [
      { name: "OCT with Fundus", quantity: 1 },
      { name: "Auto Refractometer", quantity: 2 }
    ],
    message: "Need quotation with installation details.",
    status: "new" as "new" | "contacted" | "closed",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    name: "Vision Care Clinic",
    email: "visioncare@gmail.com",
    phone: "9123456780",
    products: [
      { name: "Phacoemulsification System", quantity: 1 }
    ],
    message: "Looking for bulk purchase discount.",
    status: "contacted" as "new" | "contacted" | "closed",
    timestamp: "1 day ago"
  }
];

export default function QueriesPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50 p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <MessageCircle className="w-10 h-10 text-primary" />
          Customer Inquiries
        </h2>
        <div className="text-sm text-muted-foreground font-medium">
          {queries.filter(q => q.status === "new").length} New
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {queries.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: q.id * 0.1 }}
          >
            <AccordionItem
              value={String(q.id)}
              className="border-0 bg-gradient-to-r from-secondary/30 hover:from-secondary/50 to-muted/30 hover:to-muted/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/20"
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border-2 border-primary/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <User className="w-7 h-7 text-primary" />
                    </motion.div>
                    <div>
                      <p className="font-bold text-xl">{q.name}</p>
                      <p className="text-sm text-muted-foreground">{q.email}</p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      backgroundColor: [
                        q.status === "new" ? "#3B82F6" : q.status === "contacted" ? "#10B981" : "#059669"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2 shadow-lg ${
                      q.status === "new" ? "bg-blue-500" : 
                      q.status === "contacted" ? "bg-emerald-500" : "bg-green-600"
                    }`}
                  >
                    {q.status.toUpperCase()}
                    <Clock className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>

              <AccordionTrigger className="px-0 pb-0 border-none bg-transparent">
                <div className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/50 transition-colors">
                  <div className="text-left">
                    <p className="font-semibold text-muted-foreground mb-1">{q.timestamp}</p>
                    <p className="text-lg">{q.message}</p>
                  </div>
                  <Phone className="w-6 h-6 text-muted-foreground ml-4" />
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-0">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-6 pb-6 space-y-6 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm rounded-b-3xl"
                >
                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-6 p-6 bg-white/60 rounded-3xl shadow-inner">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Email:</span>
                        <a href={`mailto:${q.email}`} className="text-primary hover:underline font-medium">{q.email}</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-emerald-500" />
                        <span className="font-semibold">Phone:</span>
                        <span className="font-medium">{q.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Package className="w-6 h-6 text-secondary" />
                      Requested Products ({q.products.length})
                    </h4>
                    <div className="grid gap-3">
                      {q.products.map((p, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-5 bg-gradient-to-r from-white to-secondary/20 rounded-2xl shadow-sm hover:shadow-md transition-all border hover:border-primary/30"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl flex items-center justify-center border-2 border-blue-200">
                              <Package className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-semibold">{p.name}</p>
                              <p className="text-sm text-muted-foreground">High priority equipment</p>
                            </div>
                          </div>
                          <div className="text-2xl font-black text-primary">Qty: {p.quantity}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
