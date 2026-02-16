import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Activity, Sparkles, Download, Palette, Type, Heart } from 'lucide-react';
import { SiFacebook } from 'react-icons/si';

export default function LandingPage() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/wavecraft-pro-logo.dim_512x512.png" 
              alt="WaveCraft Pro" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold">WaveCraft Pro</span>
          </div>
          <Button 
            onClick={login} 
            disabled={isLoggingIn}
            size="lg"
            className="bg-chart-1 hover:bg-chart-1/90 text-white font-semibold"
          >
            {isLoggingIn ? 'Connecting...' : 'Get Started Free'}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/hero-waveform-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Create Stunning Music Visualizer Videos
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional-grade visualizer video maker for YouTubers, musicians, and lo-fi creators. 
              Export up to 4K quality, completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={login} 
                disabled={isLoggingIn}
                size="lg"
                className="bg-chart-1 hover:bg-chart-1/90 text-white font-semibold text-lg px-8 py-6"
              >
                {isLoggingIn ? 'Connecting...' : 'Start Creating Now'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6"
                asChild
              >
                <a href="https://www.facebook.com/share/14SsrwttdEB/" target="_blank" rel="noopener noreferrer">
                  <SiFacebook className="mr-2 h-5 w-5" />
                  Follow Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional music visualizer videos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <Music className="h-12 w-12 mb-4 text-chart-1" />
                <CardTitle>Audio Analysis</CardTitle>
                <CardDescription>
                  Real-time FFT spectrum, bass/mid/treble separation, BPM detection, and sensitivity controls
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <Activity className="h-12 w-12 mb-4 text-chart-2" />
                <CardTitle>8 Visualizer Modes</CardTitle>
                <CardDescription>
                  Circular spectrum, bar equalizers, waveform, particles, 3D tunnel, radial rings, and more
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <Palette className="h-12 w-12 mb-4 text-chart-3" />
                <CardTitle>Custom Backgrounds</CardTitle>
                <CardDescription>
                  Solid colors, multi-stop gradients, image uploads, and animated particles
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <Type className="h-12 w-12 mb-4 text-chart-4" />
                <CardTitle>Text & Branding</CardTitle>
                <CardDescription>
                  Song titles, artist names, custom fonts, logo uploads, and entrance animations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <Download className="h-12 w-12 mb-4 text-chart-5" />
                <CardTitle>High-Quality Export</CardTitle>
                <CardDescription>
                  Export up to 4K resolution at 30 or 60fps with customizable bitrate
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <Sparkles className="h-12 w-12 mb-4 text-chart-1" />
                <CardTitle>Real-Time Preview</CardTitle>
                <CardDescription>
                  See your changes instantly with smooth, optimized preview rendering
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Visualizer Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Visualizer Styles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from multiple professional visualizer modes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Circular Spectrum',
              'Horizontal Bars',
              'Vertical Bars',
              'Waveform Line',
              'Particle Reactive',
              'Radial Neon Ring',
              'Minimal Lo-Fi Glow',
              '3D Tunnel'
            ].map((mode) => (
              <Card key={mode} className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="aspect-video bg-accent/20 rounded-lg mb-4 flex items-center justify-center">
                    <Activity className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{mode}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All features unlocked. No subscriptions. Completely free.
            </p>
          </div>
          <Card className="max-w-2xl mx-auto border-chart-1/50 bg-card/80 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Free Forever</CardTitle>
              <CardDescription className="text-lg">
                Full access to all premium features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {[
                  'Export up to 4K resolution',
                  'No watermarks',
                  'Unlimited exports',
                  'All visualizer modes',
                  'Custom backgrounds & branding',
                  'Save unlimited projects',
                  'Real-time preview',
                  'Audio editing tools'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-chart-1/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-chart-1" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={login} 
                disabled={isLoggingIn}
                size="lg"
                className="w-full bg-chart-1 hover:bg-chart-1/90 text-white font-semibold text-lg py-6 mt-6"
              >
                {isLoggingIn ? 'Connecting...' : 'Get Started Free'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Is WaveCraft Pro really free?',
                a: 'Yes! All features including 4K export, unlimited renders, and no watermarks are completely free.'
              },
              {
                q: 'What audio formats are supported?',
                a: 'WaveCraft Pro supports MP3 and WAV audio files for your music visualizer videos.'
              },
              {
                q: 'How long does it take to export a video?',
                a: 'Export time depends on your video length and resolution. A 3-minute 1080p video typically takes 2-5 minutes.'
              },
              {
                q: 'Can I use my own images and logos?',
                a: 'Absolutely! Upload custom background images and logos to personalize your visualizer videos.'
              },
              {
                q: 'Do I need to download any software?',
                a: 'No! WaveCraft Pro runs entirely in your browser. Just log in and start creating.'
              }
            ].map((faq, i) => (
              <Card key={i} className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl">{faq.q}</CardTitle>
                  <CardDescription className="text-base">{faq.a}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Create Amazing Visualizer Videos?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join creators worldwide using WaveCraft Pro to bring their music to life
          </p>
          <Button 
            onClick={login} 
            disabled={isLoggingIn}
            size="lg"
            className="bg-chart-1 hover:bg-chart-1/90 text-white font-semibold text-lg px-8 py-6"
          >
            {isLoggingIn ? 'Connecting...' : 'Start Creating Free'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} WaveCraft Pro</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
                <a 
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
            <a 
              href="https://www.facebook.com/share/14SsrwttdEB/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiFacebook className="h-5 w-5" />
              Follow us on Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
