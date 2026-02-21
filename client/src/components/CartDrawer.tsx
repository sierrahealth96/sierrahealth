import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart, Zap, Award } from "lucide-react";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-[95vw] sm:w-[420px] p-0 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-emerald-200/30">
        {/* Clean Header */}
        <div className="border-b border-gray-100 p-6 sticky top-0 z-20 bg-white/100 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <SheetTitle className="font-black text-2xl text-gray-900">
                Your Cart
              </SheetTitle>
              <div className="text-emerald-600 font-bold text-lg flex items-center gap-1">
                <Award className="w-4 h-4" />
                {items.length} item{items.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-12"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center shadow-md">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-gray-900">Your Cart is Empty</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                  Discover premium ophthalmic equipment for your clinic.
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="px-8 h-12 font-bold rounded-2xl shadow-lg hover:shadow-xl border border-emerald-200 hover:border-emerald-300 transition-all bg-white"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Start Shopping
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex gap-4 p-4 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 hover:bg-emerald-50/30 overflow-hidden"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-white">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1 mb-3">
                      <h4 className="font-semibold text-base leading-tight line-clamp-2 text-gray-900">
                        {item.name}
                      </h4>
                      <span className="text-emerald-600 font-bold text-lg">
                        {/* ₹{item.price.toLocaleString()} */}
                      </span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl p-1.5 border shadow-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all"
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="w-10 text-center font-bold text-lg text-gray-900">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 hover:bg-red-50 border border-gray-200 hover:border-red-200 hover:text-red-600 transition-all rounded-xl"
                        onClick={() => removeItem(item._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Clean Footer - Total Only */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-white/100 backdrop-blur-sm shadow-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                {/* <span className="text-gray-700">Total</span>
                <span className="text-3xl font-black text-emerald-600">
                  ₹{total.toLocaleString()}
                </span> */}
              </div>
              
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full h-14 text-xl font-black rounded-2xl shadow-xl hover:shadow-emerald-400/50 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              
              <div className="flex items-center justify-center gap-6 pt-4 text-xs text-gray-500 font-medium opacity-80">
                <div className="flex items-center gap-1">
                  🔒 Secure Checkout
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <div className="flex items-center gap-1">
                  🚚 Free Delivery
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
