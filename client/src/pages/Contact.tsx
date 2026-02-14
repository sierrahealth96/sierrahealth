import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12">
        
        {/* Left Info */}
        <div>
          <h1 className="text-4xl font-bold mb-6">Get In Touch</h1>
          <p className="text-muted-foreground mb-8">
            For product inquiries, quotations, or dealership support — reach out to us.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail /> info@visionarymedical.in
            </div>
            <div className="flex items-center gap-4">
              <Phone /> +91 9876543210
            </div>
            <div className="flex items-center gap-4">
              <MapPin /> Kolkata, India
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl border">
          <form className="space-y-6">
            <Input placeholder="Full Name" />
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Phone Number" />
            <Textarea placeholder="Your Query..." />
            <Button className="w-full">Submit Inquiry</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
