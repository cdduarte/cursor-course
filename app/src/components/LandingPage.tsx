"use client";
import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  glowColor?: 'pink' | 'purple' | 'cyan' | 'green' | 'orange';
}

function FeatureCard({ icon, title, description, gradient, glowColor = 'purple' }: FeatureCardProps) {
  return (
    <div className={`
      relative group p-8 rounded-3xl 
      feature-card-enhanced feature-card-glass
      glow-${glowColor}
      ${gradient}
    `}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-4 font-primary tracking-tight">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed font-primary font-weight-regular">
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
  const baseClasses = "relative px-ds-lg py-ds-md shape-pill font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 font-primary shadow-2xl inline-block text-center";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:opacity-90 shadow-pink-500/50",
    secondary: "bg-gradient-secondary text-white hover:opacity-90 shadow-purple-500/50"
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
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,110,199,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(122,92,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,163,0.05),transparent_50%)]" />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Tags */}
          <div className="animate-fade-in-up mb-8 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           glassmorphism border border-white/20 
                           text-white/80 text-sm font-medium font-['Inter']
                           hover:bg-white/15 hover:border-white/30 transition-all duration-300
                           backdrop-blur-sm shadow-lg">
              <svg className="w-4 h-4" viewBox="0 0 100 100" fill="none">
                <g stroke="#ff6b35" strokeWidth="2.5" fill="none">
                  {/* Left vertical lines */}
                  <line x1="10" y1="15" x2="10" y2="85" />
                  <line x1="15" y1="15" x2="15" y2="85" />
                  <line x1="20" y1="15" x2="20" y2="85" />
                  <line x1="25" y1="15" x2="25" y2="85" />
                  <line x1="30" y1="15" x2="30" y2="85" />
                  <line x1="35" y1="15" x2="35" y2="85" />
                  <line x1="40" y1="15" x2="40" y2="85" />
                  
                  {/* Top horizontal lines */}
                  <line x1="10" y1="15" x2="60" y2="15" />
                  <line x1="10" y1="20" x2="65" y2="20" />
                  <line x1="10" y1="25" x2="70" y2="25" />
                  <line x1="10" y1="30" x2="75" y2="30" />
                  <line x1="10" y1="35" x2="78" y2="35" />
                  
                  {/* Middle horizontal lines */}
                  <line x1="10" y1="45" x2="75" y2="45" />
                  <line x1="10" y1="50" x2="78" y2="50" />
                  <line x1="10" y1="55" x2="75" y2="55" />
                  
                  {/* Bottom horizontal lines */}
                  <line x1="10" y1="65" x2="78" y2="65" />
                  <line x1="10" y1="70" x2="75" y2="70" />
                  <line x1="10" y1="75" x2="70" y2="75" />
                  <line x1="10" y1="80" x2="65" y2="80" />
                  <line x1="10" y1="85" x2="60" y2="85" />
                  
                  {/* Right curved lines */}
                  <path d="M 60 15 Q 85 15 85 40 Q 85 50 85 50 Q 85 75 60 85" />
                  <path d="M 65 20 Q 80 20 80 40 Q 80 50 80 50 Q 80 70 65 80" />
                  <path d="M 70 25 Q 78 25 78 40 Q 78 50 78 50 Q 78 65 70 75" />
                  <path d="M 75 30 Q 78 30 78 40 Q 78 50 78 50 Q 78 60 75 70" />
                  <path d="M 78 35 Q 78 40 78 50 Q 78 55 78 65" />
                </g>
              </svg>
              Backed by Nobody
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           glassmorphism border border-white/20 
                           text-white/80 text-sm font-medium font-['Inter']
                           hover:bg-white/15 hover:border-white/30 transition-all duration-300
                           backdrop-blur-sm shadow-lg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub 0K+
            </span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-semibold font-primary mb-6 leading-tight">
              <span className="animate-fade-in-up-delayed gradient-text-primary inline-block">
                Chat with
              </span>
              <br />
              <span className="animate-fade-in-up-late gradient-text-secondary inline-block">
                AI Magic
              </span>
            </h1>
            <div className="animate-fade-in-up-late h-1 w-32 mx-auto bg-gradient-primary rounded-full" style={{ animationDelay: '0.45s' }} />
          </div>

          {/* Subtitle */}
          <p className={`animate-fade-in-up-late text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-primary font-weight-regular ${
            theme === 'dark' ? 'text-white/80' : 'text-gray-700'
          }`} style={{ animationDelay: '0.6s' }}>
            Experience the future of AI conversation with text generation and stunning image creation. 
            All in one beautiful, intuitive interface.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up-late flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" style={{ animationDelay: '0.75s' }}>
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
          <div className="animate-fade-in-up-late relative max-w-4xl mx-auto" style={{ animationDelay: '0.9s' }}>
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
            <h2 className="text-4xl md:text-6xl font-semibold font-primary mb-6">
              <span className="gradient-text-secondary">
                Powerful Features
              </span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto font-primary font-weight-regular ${
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}>
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
              gradient=""
              glowColor="pink"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
              }
              title="Image Generation"
              description="Transform your ideas into stunning visuals with AI-powered image generation. Just describe what you want to see."
              gradient=""
              glowColor="purple"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Real-time Streaming"
              description="Watch responses unfold in real-time with lightning-fast streaming technology for an engaging experience."
              gradient=""
              glowColor="cyan"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              }
              title="Seamless Switching"
              description="Toggle between text chat and image generation modes instantly. Perfect for creative workflows."
              gradient=""
              glowColor="green"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
              title="Memory & Context"
              description="Your conversations are remembered and stored, building context for more personalized interactions."
              gradient=""
              glowColor="orange"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="Beautiful Interface"
              description="Enjoy a clean, modern interface designed for focus and productivity. Every pixel crafted with care."
              gradient=""
              glowColor="pink"
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
              <p className={`text-xl mb-10 max-w-2xl mx-auto font-['Inter'] ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}>
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
      <footer className={`relative px-6 py-12 border-t ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`font-['Inter'] ${
            theme === 'dark' ? 'text-white/60' : 'text-gray-500'
          }`}>
            Built with 💜 using Next.js, Supabase, and OpenAI
          </p>
        </div>
      </footer>
    </div>
  );
}