"use client";
import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className={`relative group p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 ${gradient}`}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-4 font-['Inter'] tracking-tight">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed font-['Inter']">
          {description}
        </p>
      </div>
    </div>
  );
}

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  'aria-label'?: string;
}

function GradientButton({ children, onClick, href, variant = 'primary', className = '', 'aria-label': ariaLabel }: GradientButtonProps) {
  const baseClasses = "relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 font-['Inter'] shadow-2xl inline-block text-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 via-orange-400 to-pink-600 text-white hover:from-pink-600 hover:via-orange-500 hover:to-pink-700 shadow-pink-500/50",
    secondary: "bg-gradient-to-r from-purple-500 via-cyan-400 to-green-400 text-white hover:from-purple-600 hover:via-cyan-500 hover:to-green-500 shadow-purple-500/50"
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variants[variant]} ${className}`} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,110,199,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(122,92,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,163,0.05),transparent_50%)]" />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold font-['Inter'] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-pink-600 bg-clip-text text-transparent">
                Chat with
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-pink-500 via-orange-400 to-pink-600 rounded-full" />
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-['Inter']">
            Experience the future of AI conversation with text generation and stunning image creation. 
            All in one beautiful, intuitive interface.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <GradientButton variant="primary" href="/chat" aria-label="Start using the AI chat interface">
              Try It Now
            </GradientButton>
            <GradientButton variant="secondary" onClick={() => {
              document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
            }} aria-label="Scroll to features section to learn more">
              See Features
            </GradientButton>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
            <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <div className="space-y-4 text-left">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-3xl max-w-xs">
                    <p className="text-sm">Create a futuristic logo for my startup</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-3xl max-w-md border border-white/20">
                    <p className="text-sm">I've created a stunning futuristic logo design for your startup! ✨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold font-['Inter'] mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-['Inter']">
              Discover what makes our AI assistant extraordinary
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              title="Smart Conversations"
              description="Experience natural, flowing conversations with advanced GPT-4.1 technology that understands context and nuance."
              gradient="hover:shadow-pink-500/20"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
              }
              title="Image Generation"
              description="Transform your ideas into stunning visuals with AI-powered image generation. Just describe what you want to see."
              gradient="hover:shadow-purple-500/20"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Real-time Streaming"
              description="Watch responses unfold in real-time with lightning-fast streaming technology for an engaging experience."
              gradient="hover:shadow-cyan-500/20"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              }
              title="Seamless Switching"
              description="Toggle between text chat and image generation modes instantly. Perfect for creative workflows."
              gradient="hover:shadow-green-500/20"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
              title="Memory & Context"
              description="Your conversations are remembered and stored, building context for more personalized interactions."
              gradient="hover:shadow-orange-500/20"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="Beautiful Interface"
              description="Enjoy a clean, modern interface designed for focus and productivity. Every pixel crafted with care."
              gradient="hover:shadow-pink-500/20"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
            <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/20 p-12 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold font-['Inter'] mb-6">
                <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-pink-600 bg-clip-text text-transparent">
                  Ready to Experience
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                  AI Magic?
                </span>
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-['Inter']">
                Join thousands of users already creating, chatting, and innovating with our AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <GradientButton variant="primary" href="/chat" className="text-xl px-10 py-5" aria-label="Start using the AI chatbot now">
                  Start Chatting Now
                </GradientButton>
                <GradientButton variant="secondary" onClick={() => {
                  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                }} className="text-xl px-10 py-5" aria-label="Learn more about our features">
                  Learn More
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60 font-['Inter']">
            Built with 💜 using Next.js, Supabase, and OpenAI
          </p>
        </div>
      </footer>
    </div>
  );
}