import React from "react";
import { Flame, Heart, Award, Users } from "lucide-react";

const About = () => (
  <div className="max-w-5xl mx-auto px-6 py-16" data-testid="about-page">
    <div className="text-center mb-14">
      <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">Our Story</div>
      <h1 className="font-serif-heading text-5xl md:text-6xl text-[#58181F] mt-2 tracking-tight">About Mahankal Prasad</h1>
      <div className="divider-om font-serif-heading mt-6">ॐ</div>
    </div>

    <div className="rounded-2xl overflow-hidden aspect-[16/8] mb-12 border border-[#D4AF37]/30">
      <img src="https://images.pexels.com/photos/38122489/pexels-photo-38122489.jpeg" alt="Mahakaleshwar Temple" className="w-full h-full object-cover" />
    </div>

    <div className="prose prose-lg max-w-none">
      <p className="text-lg text-[#2D1A1C]/85 leading-relaxed">
        Rooted in the sacred soil of Ujjain — the eternal city of Lord Mahakal — Mahankal Prasad is a devoted initiative by
        <strong> CHOUHAN AND SONS ENTERPRISES</strong> to bring authentic, blessed prasad and puja essentials from the
        Mahakaleshwar Jyotirlinga to every home across India.
      </p>
      <p className="text-lg text-[#2D1A1C]/85 leading-relaxed mt-6">
        For generations, devotees have travelled thousands of kilometers to seek the darshan of Bhagwan Mahakal. We were
        born from a simple prayer — to carry that same divine grace beyond the temple walls, delivered with purity, tradition,
        and love. Every product we ship is sanctified in the sanctum of the temple and packed with reverence.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mt-16">
      {[
        { icon: Flame, title: "Our Mission", body: "To make the divine blessings of Mahakaleshwar accessible to every devotee, no matter where they live." },
        { icon: Heart, title: "Our Values", body: "Purity, authenticity, transparency and devotion — in every laddu, mala and offering we send." },
        { icon: Award, title: "Our Promise", body: "Fresh, hygienically prepared, temple-blessed prasad — sourced directly with no middlemen." },
        { icon: Users, title: "Our Community", body: "10,000+ devotees across India who have made Mahankal Prasad a part of their spiritual life." },
      ].map((c) => (
        <div key={c.title} className="bg-white border border-[#D4AF37]/30 rounded-2xl p-7">
          <c.icon className="h-8 w-8 text-[#F97316] mb-3" />
          <h3 className="font-serif-heading text-2xl text-[#58181F]">{c.title}</h3>
          <p className="text-[#7A686A] mt-2 leading-relaxed">{c.body}</p>
        </div>
      ))}
    </div>
  </div>
);

export default About;
