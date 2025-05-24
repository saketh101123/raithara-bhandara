
import Navbar from '@/components/Navbar';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const logisticsPlan = [
  {
    name: 'Basic Logistics',
    price: '₹299',
    unit: 'per month',
    description: 'Essential transport for local cold storage needs',
    features: [
      'Pickup from farm to nearest cold storage (within 20 km)',
      'Shared vehicle transport (may be combined with others\' loads)',
      'Scheduled pickups (within 24 hours)',
      'Basic support (chat/email)',
    ],
    notIncluded: [
      'Dedicated vehicle',
      'Real-time tracking',
      'Cold chain transport',
      'State-wide coverage',
      'Priority scheduling',
    ],
    highlight: false,
    icon: '🥉',
    planId: 'basic-logistics',
  },
  {
    name: 'Standard Logistics',
    price: '₹699',
    unit: 'per month',
    description: 'Enhanced transport with dedicated vehicles and tracking',
    features: [
      'Pickup from farm to any cold storage within 50 km',
      'Dedicated vehicle for your crops',
      'Real-time vehicle tracking',
      'Priority scheduling (same-day pickups)',
      'Phone & WhatsApp support',
    ],
    notIncluded: [
      'State-wide coverage',
      'Cold chain transport',
      'Multiple delivery locations',
      'Dedicated logistics manager',
    ],
    highlight: true,
    icon: '🥈',
    planId: 'standard-logistics',
  },
  {
    name: 'Advanced Logistics',
    price: '₹999',
    unit: 'per month',
    description: 'Complete logistics solution with premium features',
    features: [
      'State-wide transport coverage (anywhere in Karnataka)',
      'Cold chain transport (temperature-controlled vehicles)',
      'Delivery to multiple cold storages in one trip',
      'Route optimization for faster delivery',
      'Dedicated logistics manager',
      'Early morning/late-night slot booking',
    ],
    notIncluded: [],
    highlight: false,
    icon: '🥇',
    planId: 'advanced-logistics',
  },
];

const Pricing = () => {
  const handleBookPlan = (planId: string, planName: string, price: string) => {
    // Store plan details in localStorage for the payment page
    localStorage.setItem('selectedLogisticsPlan', JSON.stringify({
      planId,
      planName,
      price,
      type: 'logistics'
    }));
    // Navigate to logistics payment page
    window.location.href = `/payment/logistics/${planId}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-primary mb-4">Logistics & Transport Plans</h1>
          <p className="text-lg text-foreground/80">
            Choose the perfect logistics solution for seamless farm-to-storage transport.
            All plans include insurance coverage and 24/7 customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {logisticsPlan.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl overflow-hidden border ${
                plan.highlight 
                  ? 'border-primary shadow-lg relative ring-2 ring-primary/20' 
                  : 'border-border shadow'
              }`}
            >
              {plan.highlight && (
                <div className="bg-primary text-white py-1 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{plan.icon}</span>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-foreground/70 ml-1">{plan.unit}</span>
                </div>
                <p className="text-foreground/70 mb-6">{plan.description}</p>
                
                <Button 
                  className={`w-full mb-6 ${!plan.highlight ? 'bg-primary/90 hover:bg-primary' : ''}`} 
                  variant={plan.highlight ? 'default' : 'outline'}
                  onClick={() => handleBookPlan(plan.planId, plan.name, plan.price)}
                >
                  Book This Plan
                </Button>

                <div className="space-y-4">
                  <p className="font-medium">Included features:</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-green-500 shrink-0 mr-2 mt-0.5" size={16} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.notIncluded.length > 0 && (
                    <>
                      <p className="font-medium mt-4">Not included:</p>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start text-foreground/60">
                            <X className="text-foreground/40 shrink-0 mr-2 mt-0.5" size={16} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-8 bg-green-50 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">Need a custom logistics solution?</h2>
          <p className="text-center mb-6">
            We offer tailored transport solutions for specific crops, volumes, and routes.
            Contact our logistics team to discuss your requirements.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button variant="outline">Contact Logistics Team</Button>
            </Link>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Can I change plans later?</h3>
              <p className="text-foreground/70">Yes, you can upgrade or downgrade your logistics plan at any time based on your transport needs.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">What areas do you cover?</h3>
              <p className="text-foreground/70">Basic covers 20km radius, Standard covers 50km radius, and Advanced covers the entire state of Karnataka.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How do I schedule a pickup?</h3>
              <p className="text-foreground/70">You can schedule pickups through our app, website, or by calling our support team.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-foreground/70">We accept UPI, credit/debit cards, net banking, and monthly invoicing for business customers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
