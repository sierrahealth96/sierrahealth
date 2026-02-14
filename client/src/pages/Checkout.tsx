import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { useSubmitInquiry } from "@/hooks/use-products";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { mutate, isPending } = useSubmitInquiry();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      productIds: items.map(i => i.id),
      message: `I am interested in purchasing the following items:\n${items.map(i => `- ${i.name} (Qty: ${i.quantity})`).join('\n')}`
    }
  });

  const onSubmit = (data: InsertInquiry) => {
    // Override product IDs to current cart state just in case
    const submissionData = {
      ...data,
      productIds: items.map(i => i.id)
    };

    mutate(submissionData, {
      onSuccess: () => {
        toast({
          title: "Inquiry Sent",
          description: "We will contact you shortly with a formal quote.",
        });
        clearCart();
        setLocation("/");
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive"
        });
      }
    });
  };

  if (items.length === 0) {
    setLocation("/products");
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="font-display text-4xl font-bold mb-8 text-center">Request Quote</h1>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
            <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Estimated Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Final price may vary based on shipping, taxes, and customization options. We will send a formal invoice.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="font-display text-xl font-bold mb-6">Contact Information</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input {...form.register("customerName")} className="rounded-xl" />
                {form.formState.errors.customerName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.customerName.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input {...form.register("email")} type="email" className="rounded-xl" />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input {...form.register("phone")} className="rounded-xl" />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Additional Notes</label>
                <Textarea {...form.register("message")} className="rounded-xl min-h-[120px]" />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg rounded-xl" 
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
