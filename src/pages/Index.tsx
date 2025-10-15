import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Upload, Shield, Zap, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Decentralized</span>
            <br />
            Image Sharing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload, share, and discover images on IPFS. Own your content with blockchain technology and MetaMask authentication.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:glow-effect transition-all">
                <Upload className="mr-2 h-5 w-5" />
                Start Sharing
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="glass-card border-primary/30 hover:border-primary/50">
                Explore Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-lg text-center hover:glow-effect transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Decentralized Storage</h3>
            <p className="text-muted-foreground">
              Your images are stored on IPFS, ensuring permanence and censorship resistance.
            </p>
          </div>

          <div className="glass-card p-8 rounded-lg text-center hover:glow-effect transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
            <p className="text-muted-foreground">
              MetaMask authentication provides secure, wallet-based access without passwords.
            </p>
          </div>

          <div className="glass-card p-8 rounded-lg text-center hover:glow-effect transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-muted-foreground">
              Access your images from anywhere in the world via IPFS gateways.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass-card p-12 rounded-2xl text-center glow-effect">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your MetaMask wallet and start sharing your images on the decentralized web.
          </p>
          <Link to="/upload">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:glow-effect transition-all">
              <Upload className="mr-2 h-5 w-5" />
              Upload Your First Image
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
