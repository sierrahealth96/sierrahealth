import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageCircle,
  Package,
  Clock
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/Url";

const ORDERS_API = `${BASE_URL}/api/orders/get/orders`;

export default function QueriesPanel() {
  const [queries, setQueries] = useState<any[]>([]);
  const [date, setDate] = useState("");

  /* ---------------- FETCH ORDERS ---------------- */

  const fetchOrders = async (selectedDate?: string) => {
    const url = selectedDate
      ? `${ORDERS_API}?date=${selectedDate}`
      : ORDERS_API;

    const res = await fetch(url);
    const data = await res.json();

    // Transform backend data to UI shape
    const formatted = data.map((o: any) => ({
      id: o._id,
      name: o.user?.name,
      email: o.user?.email,
      phone: o.user?.phone,
      products: o.products?.map((p: any) => ({
        name: p.product?.name || "Unknown product",
        price: p.product?.price || 0,
        quantity: p.quantity || 1
      })) || [],
      message: o.message || "No message",
      status: "new",
      timestamp: new Date(o.createdAt).toLocaleString()
    }));

    setQueries(formatted);
  };

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchOrders(); // no date → all orders
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50 p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <MessageCircle className="w-10 h-10 text-primary" />
          Customer Inquiries
        </h2>

        {/* Date Filter */}
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <Button
            size="sm"
            onClick={() => fetchOrders(date)}
          >
            Apply
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {queries.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AccordionItem
              value={q.id}
              className="border-0 bg-gradient-to-r from-secondary/30 to-muted/30 rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-xl">{q.name}</p>
                      <p className="text-sm text-muted-foreground">{q.email}</p>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center gap-2">
                    NEW <Clock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <AccordionTrigger className="px-6 py-4">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">{q.timestamp}</p>
                  <p className="text-lg">{q.message}</p>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="px-6 pb-6 space-y-6">
                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-6 p-6 bg-white rounded-3xl">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      {q.email}
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-emerald-500" />
                      {q.phone}
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Package className="w-6 h-6" />
                      Requested Products ({q.products.length})
                    </h4>

                    {q.products.length === 0 ? (
                      <p className="text-muted-foreground">No products selected</p>
                    ) : (
                      q.products.map((p: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between p-4 bg-white rounded-xl"
                        >
                          <div>
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ₹{p.price}
                            </p>
                          </div>
                          <span className="font-bold">Qty: {p.quantity}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}