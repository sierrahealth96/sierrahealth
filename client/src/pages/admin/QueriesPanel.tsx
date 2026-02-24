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
// import { formatPriceRange } from "@/lib/utils"; // Add your price formatter
import { BASE_URL } from "@/Url";

const ORDERS_API = `${BASE_URL}/api/orders/get/orders`;

export default function QueriesPanel() {
  const [queries, setQueries] = useState<any[]>([]);
  const [date, setDate] = useState("");

  const fetchOrders = async (selectedDate?: string) => {
    const url = selectedDate
      ? `${ORDERS_API}?date=${selectedDate}`
      : ORDERS_API;

    const res = await fetch(url);
    const data = await res.json();

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

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-xl rounded-3xl sm:rounded-4xl shadow-2xl border border-white/50 p-4 sm:p-8"
    >
      {/* Header - MOBILE STACKED */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2 sm:gap-3">
          <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          Customer Inquiries
        </h2>

        {/* Date Filter - MOBILE FULL WIDTH */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
          <Button
            size="sm"
            onClick={() => fetchOrders(date)}
            className="w-full sm:w-auto px-4 h-10 sm:h-auto text-sm font-bold"
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-[70vh] overflow-y-auto pr-2 sm:pr-0">
        <Accordion type="single" collapsible className="w-full">
          {queries.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full"
            >
              <AccordionItem
                value={q.id}
                className="border-0 bg-gradient-to-r from-secondary/20 to-muted/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                {/* Header - MOBILE STACKED */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-lg sm:text-xl truncate">{q.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{q.email}</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 self-start sm:self-center whitespace-nowrap">
                      NEW <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>

                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 border-t border-muted/30 hover:no-underline">
                  <div className="text-left w-full">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 line-clamp-1">
                      {q.timestamp}
                    </p>
                    <p className="text-base sm:text-lg font-medium line-clamp-2 sm:line-clamp-3">
                      {q.message}
                    </p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 sm:px-6 pb-6 pt-2">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Contact Info - MOBILE STACKED */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50">
                      <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl hover:shadow-md transition-all">
                        <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground truncate">{q.email}</span>
                      </div>
                      <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all">
                        <Phone className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground truncate">{q.phone}</span>
                      </div>
                    </div>

                    {/* Products - MOBILE FULL WIDTH */}
                    <div className="space-y-2 sm:space-y-3">
                      <h4 className="font-bold text-base sm:text-lg flex items-center gap-2 mb-3 sm:mb-4">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        Requested Products ({q.products.length})
                      </h4>

                      {q.products.length === 0 ? (
                        <div className="p-6 text-center bg-gray-50 rounded-xl">
                          <p className="text-sm sm:text-base text-muted-foreground">No products selected</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {q.products.map((p: any, idx: number) => (
                            <motion.div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/50 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100/50"
                            >
                              <div className="mb-2 sm:mb-0 sm:mr-4 flex-1 min-w-0">
                                <p className="font-semibold text-sm sm:text-base line-clamp-2 mb-1">
                                  {p.name}
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  ₹{(p.price).toLocaleString("en-IN")}
                                </p>
                              </div>
                              <div className="flex items-center justify-end sm:justify-center">
                                <span className="bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                                  Qty: {p.quantity}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>

      {/* Empty State */}
      {queries.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 px-4"
        >
          <MessageCircle className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
          <h3 className="text-xl sm:text-2xl font-black mb-2 text-muted-foreground">No Inquiries Yet</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Customer inquiries will appear here when customers request quotes.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
