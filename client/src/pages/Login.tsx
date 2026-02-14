import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 flex justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <Input placeholder="Email" className="mb-4" />
          <Input placeholder="Password" type="password" className="mb-6" />
          <Button className="w-full">Login</Button>
        </div>
      </div>
    </div>
  );
}
