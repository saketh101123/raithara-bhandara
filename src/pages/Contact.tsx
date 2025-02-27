
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    isSubmitting: false,
    isSubmitted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        isSubmitted: true,
        name: '',
        email: '',
        phone: '',
        message: '' 
      }));
      toast.success("Your message has been sent! We'll get back to you soon.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-primary mb-6">Contact Us</h1>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl">
            Have questions about our storage solutions? Get in touch with our team and we'll be happy to help you find the perfect solution for your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <Phone className="text-primary mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-foreground/70 mb-3">Our support team is available 7 days a week</p>
              <p className="font-medium">+91 80 4567 8900</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <Mail className="text-primary mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-foreground/70 mb-3">For general inquiries and support</p>
              <p className="font-medium">support@raitharabhandara.com</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <MapPin className="text-primary mb-4" size={24} />
              <h3 className="text-lg font-semibold mb-2">Head Office</h3>
              <p className="text-foreground/70 mb-3">Visit our office in Bangalore</p>
              <p className="font-medium">123 Agri Tech Park, Whitefield, Bangalore - 560066</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              
              {formState.isSubmitted ? (
                <div className="bg-green-50 p-8 rounded-xl text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-foreground/70 mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="Your contact number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2"
                    disabled={formState.isSubmitting}
                  >
                    {formState.isSubmitting ? 'Sending...' : 'Send Message'} 
                    <Send size={16} />
                  </Button>
                </form>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Our Locations</h2>
              <div className="rounded-xl overflow-hidden h-[400px] bg-gray-100 mb-4">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.9973874144!2d77.35074421903857!3d12.95384772557775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1656152635351!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bangalore Office Location"
                />
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold mb-3">Warehouse Network</h3>
                <p className="text-foreground/70 mb-4">
                  We have storage facilities across Karnataka including Bangalore, Mysore, Hassan, Tumkur, Mandya, and Kolar.
                </p>
                <Button variant="outline" className="w-full">View All Locations</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
