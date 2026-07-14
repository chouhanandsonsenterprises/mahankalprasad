import React, { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent — we'll get back to you soon 🙏");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Could not send message");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16" data-testid="contact-page">
      <div className="text-center mb-14">
        <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">Get in Touch</div>
        <h1 className="font-serif-heading text-5xl md:text-6xl text-[#58181F] mt-2 tracking-tight">Contact Us</h1>
        <p className="text-[#7A686A] mt-4">We would love to hear from you. Reach us for any query — from orders to bulk offerings.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6">
            <h3 className="font-serif-heading text-2xl text-[#58181F] mb-4">Contact Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0"><Phone className="h-4 w-4 text-[#F97316]" /></div>
                <div>
                  <div className="uppercase text-xs text-[#7A686A] tracking-widest">Phone</div>
                  <a href="tel:+919977002593" className="font-semibold text-[#58181F]">+91 9977002593</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0"><Mail className="h-4 w-4 text-[#F97316]" /></div>
                <div>
                  <div className="uppercase text-xs text-[#7A686A] tracking-widest">Email</div>
                  <a href="mailto:arjunchouhan061@gmail.com" className="font-semibold text-[#58181F] break-all">arjunchouhan061@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center flex-shrink-0"><MapPin className="h-4 w-4 text-[#F97316]" /></div>
                <div>
                  <div className="uppercase text-xs text-[#7A686A] tracking-widest">Address</div>
                  <div className="font-semibold text-[#58181F]">CHOUHAN AND SONS ENTERPRISES</div>
                  <div className="text-[#7A686A]">Ujjain, Madhya Pradesh, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 aspect-video">
            <iframe
              title="Mahakaleshwar Temple, Ujjain"
              src="https://www.google.com/maps?q=Mahakaleshwar+Jyotirlinga+Ujjain&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form onSubmit={submit} className="bg-white border border-[#D4AF37]/30 rounded-2xl p-7 space-y-4" data-testid="contact-form">
          <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="contact-name" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="contact-email" /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} data-testid="contact-phone" /></div>
          </div>
          <div><Label>Subject</Label><Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} data-testid="contact-subject" /></div>
          <div><Label>Message</Label><Textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} data-testid="contact-message" /></div>
          <Button type="submit" disabled={busy} className="w-full bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full h-11 font-semibold" data-testid="contact-submit">
            <Send className="h-4 w-4 mr-2" /> {busy ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
