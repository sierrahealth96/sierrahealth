import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { MessageCircle, X, Send, Bot, User, Sparkles, ArrowRight, CheckCircle, User as UserIcon, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/Url";

// Import your Toast primitives directly
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast"; // Keep if you have it, otherwise remove

const ORDER_API = `${BASE_URL}/api/orders/create`;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "option" | "form" | "submitted";
};

type ChatState = "welcome" | "navigating" | "product_query" | "contact_form" | "submitted";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>("welcome");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hi! 👋 I'm your medical equipment assistant. How can I help you today?", "option");
    }
  }, [isOpen]);

  const addBotMessage = (content: string, type?: ChatMessage["type"]) => {
    const msg: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content,
      type
    };
    setMessages(prev => [...prev, msg]);
  };

  const addUserMessage = (content: string) => {
    const msg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content
    };
    setMessages(prev => [...prev, msg]);
  };

  // Navigation handlers
  const handleNavigation = (option: string) => {
    addUserMessage(option);
    
    setTimeout(() => {
      switch (option.toLowerCase()) {
        case "about":
          addBotMessage("Great! Click the About button below to visit our About page ⬇️", "navigating");
          break;
          
        case "contact":
          setChatState("contact_form");
          addBotMessage("Perfect! Fill in your contact details below:", "form");
          break;
          
        case "products":
          setChatState("product_query");
          addBotMessage(
            "Awesome! Choose an option below:\n• Browse all products\n• Submit product inquiry",
            "option"
          );
          break;
          
        default:
          addBotMessage("Choose: About, Contact, or Products.");
      }
    }, 500);
  };

  const handleProductQuery = (option: string) => {
    addUserMessage(option);
    
    setTimeout(() => {
      if (option.toLowerCase().includes("browse")) {
        addBotMessage("Click Products below to browse! ⬇️", "navigating");
      } else {
        setChatState("contact_form");
        addBotMessage("Got it! Fill your product inquiry details below:", "form");
      }
    }, 500);
  };

  // Form handlers
  const handleFormInput = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async () => {
    if (!formData.customerName || !formData.email || !formData.phone) {
      addBotMessage("❌ Please fill name, email & phone before submitting!");
      return;
    }

    setIsSubmitting(true);
    addUserMessage("Submit my inquiry");

    try {
      const payload = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || "",
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

      // Show success toast
      setShowSuccessToast(true);
      
      setChatState("submitted");
      addBotMessage(
        "🎉 **Inquiry Submitted Successfully!**\n\nOur team will contact you within 24 hours.\n\nThank you for reaching out! 🙏",
        "submitted"
      );

      // Reset form after success
      setTimeout(() => {
        setFormData({ customerName: "", email: "", phone: "", message: "" });
        setChatState("welcome");
        setMessages([]);
        setShowSuccessToast(false);
      }, 4000);

    } catch (err: any) {
      addBotMessage(`❌ Sorry, something went wrong: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.type === "option") {
      const options = msg.content.includes("today") 
        ? ["About", "Contact", "Products"] 
        : msg.content.includes("products") 
        ? ["Browse Products", "Product Inquiry"] 
        : [];

      return (
        <div className="space-y-2 pt-2">
          {options.map(option => (
            <div key={option} className="flex gap-2">
              <Link 
                href={
                  option === "About" ? "/about" :
                  option === "Browse Products" ? "/products" :
                  "#"
                }
                className="flex-1"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-11 px-3 text-xs"
                  onClick={() => {
                    if (chatState === "welcome") handleNavigation(option);
                    else handleProductQuery(option);
                  }}
                >
                  <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
                  {option}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      );
    }

    if (msg.type === "form" && chatState === "contact_form") {
      return (
        <div className="space-y-3 pt-2 px-1">
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
              👤 Your Name *
            </Label>
            <Input
              value={formData.customerName}
              onChange={(e) => handleFormInput("customerName", e.target.value)}
              placeholder="Enter your full name"
              className="h-10 text-sm rounded-xl"
            />
          </div>
          
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
              ✉️ Email *
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleFormInput("email", e.target.value)}
              placeholder="your@email.com"
              className="h-10 text-sm rounded-xl"
            />
          </div>
          
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
              📱 Phone *
            </Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleFormInput("phone", e.target.value)}
              placeholder="9876543210"
              className="h-10 text-sm rounded-xl"
            />
          </div>
          
          <div>
            <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
              💬 Message (optional)
            </Label>
            <Input
              value={formData.message}
              onChange={(e) => handleFormInput("message", e.target.value)}
              placeholder="Tell us about your requirements..."
              className="h-10 text-sm rounded-xl"
            />
          </div>
          
          <Button
            className="w-full h-11 font-semibold text-sm shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            onClick={handleFormSubmit}
            disabled={isSubmitting || !formData.customerName || !formData.email || !formData.phone}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "✅ Submit Inquiry"
            )}
          </Button>
        </div>
      );
    }

    if (msg.type === "submitted") {
      return (
        <div className="text-center p-6 space-y-3">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 drop-shadow-lg" />
          </motion.div>
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-2xl p-4 shadow-lg">
            <p className="font-black text-emerald-800 text-base mb-1">🎉 SUCCESS!</p>
            <p className="text-sm text-emerald-700 font-medium">Our team will contact you within 24 hours</p>
          </div>
        </div>
      );
    }

    return <p className="whitespace-pre-wrap">{msg.content}</p>;
  };

  return (
    <>
      {/* Toast Provider - Wrap your app or this component */}
      <ToastProvider>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 w-[90vw] max-w-[360px] h-[75vh] max-h-[600px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 z-[9999] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-primary to-emerald-600 p-4 flex items-center justify-between text-white shadow-2xl">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl animate-pulse">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg leading-tight truncate">🤖 AI Assistant</h3>
                    <p className="text-xs opacity-90">Medical equipment expert</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/30 h-10 w-10 shadow-lg"
                  onClick={() => {
                    setIsOpen(false);
                    setChatState("welcome");
                    setMessages([]);
                    setFormData({ customerName: "", email: "", phone: "", message: "" });
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/90 via-white to-emerald-50/50">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "flex gap-3 max-w-[95%] rounded-2xl shadow-lg p-4",
                      msg.role === "user" 
                        ? "ml-auto flex-row-reverse bg-gradient-to-r from-primary to-indigo-600 text-white rounded-br-none border border-primary/30" 
                        : "bg-white/90 backdrop-blur-sm rounded-bl-none border border-gray-200/50 hover:shadow-xl"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0",
                      msg.role === "user" ? "bg-primary/90" : "bg-gradient-to-br from-primary to-emerald-500"
                    )}>
                      {msg.role === "user" ? (
                        <User className="w-5 h-5 text-white drop-shadow-sm" />
                      ) : (
                        <Bot className="w-5 h-5 text-white drop-shadow-sm" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {renderMessageContent(msg)}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input - Only show in welcome state */}
              {chatState === "welcome" && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                      addUserMessage(input.trim());
                      setInput("");
                    }
                  }} 
                  className="p-4 bg-white/90 backdrop-blur-sm border-t border-gray-200/50 shadow-lg"
                >
                  <div className="flex gap-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type 'About', 'Contact', or 'Products'..."
                      className="flex-1 h-14 rounded-2xl border-gray-200 focus-visible:ring-2 ring-primary/50 shadow-inner text-sm font-medium"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="h-14 w-14 rounded-2xl bg-gradient-to-r from-primary to-emerald-500 hover:from-emerald-500 hover:to-primary shadow-xl hover:shadow-emerald/30 transition-all"
                      disabled={!input.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccessToast && (
            <Toast>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <ToastTitle>Inquiry Submitted!</ToastTitle>
                  <ToastDescription>Our team will contact you within 24 hours.</ToastDescription>
                </div>
              </div>
              <ToastClose />
            </Toast>
          )}
        </AnimatePresence>

        <ToastViewport />
      </ToastProvider>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 via-primary to-emerald-600 shadow-2xl border-4 border-white/50 backdrop-blur-xl z-[9999] flex items-center justify-center hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 group"
      >
        <motion.div 
          animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white drop-shadow-2xl group-hover:scale-110 transition-transform" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white drop-shadow-2xl animate-pulse group-hover:scale-110 transition-transform" />
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
