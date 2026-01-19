import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PageFooter from '@/components/PageFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { loginAdmin, supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import HangingBulb from "@/components/HangingBulb";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin', { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting login with email:', email);
      const { error } = await loginAdmin(email, password);

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      toast.success('Logged in successfully!');
      navigate('/admin');
    } catch (error: any) {
      console.error('Full error:', error);

      // Better error messages
      if (error?.message?.includes('Failed to fetch')) {
        toast.error('Network error: Check your Supabase credentials in .env');
      } else if (error?.message?.includes('Invalid login credentials')) {
        toast.error('Invalid email or password');
      } else if (error?.message?.includes('User not found')) {
        toast.error('User account not found. Create one in Supabase first');
      } else {
        toast.error(error?.message || 'Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <HangingBulb isOn={true} onToggle={() => { }} />
      <Navigation />
      <FloatingParticles />
      <CircuitBackground />

      <main className="relative pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-circuit p-8 backdrop-blur-sm bg-black/40">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-orbitron font-bold gradient-text mb-2">
                  Admin Login
                </h1>
                <p className="font-rajdhani text-muted-foreground">Manage your IoTRONICS content</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-rajdhani font-medium mb-2 text-primary">Email</label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="bg-secondary/5 border-primary/20 text-white focus:border-primary/50 transition-colors font-rajdhani"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium mb-2 text-primary">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="bg-secondary/5 border-primary/20 text-white focus:border-primary/50 transition-colors font-rajdhani"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-glow"
                >
                  {loading ? 'Logging in...' : 'Login Access'}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-primary/10">
                <p className="text-muted-foreground text-xs text-center font-rajdhani">
                  SECURE ACCESS • RESTRICTED AREA
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
