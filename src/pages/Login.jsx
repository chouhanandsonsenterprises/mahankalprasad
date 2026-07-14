import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back! Jai Mahakal 🙏");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16" data-testid="login-page">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full gold-shine mx-auto flex items-center justify-center mb-3">
          <span className="font-serif-heading text-[#58181F] text-3xl leading-none">ॐ</span>
        </div>
        <h1 className="font-serif-heading text-4xl text-[#58181F] tracking-tight">Welcome Back</h1>
        <p className="text-[#7A686A] mt-2">Login to your Mahankal Prasad account</p>
      </div>
      <form onSubmit={submit} className="bg-white border border-[#D4AF37]/30 rounded-2xl p-7 space-y-4">
        <div><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="login-email" /></div>
        <div><Label>Password</Label><Input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} data-testid="login-password" /></div>
        <Button type="submit" disabled={busy} className="w-full bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full h-11 font-semibold" data-testid="login-submit">
          {busy ? "Logging in…" : "Login"}
        </Button>
        <p className="text-sm text-center text-[#7A686A]">
          New to Mahankal Prasad? <Link to="/register" className="text-[#58181F] font-semibold hover:text-[#F97316]" data-testid="link-register">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
