
import Navbar from '@/components/Navbar';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Basic Storage',
    price: '₹30',
    unit: 'per quintal/day',
    description: 'Essential storage for small farmers with basic needs',
    features: [
      'Temperature controlled storage',
      'Basic security measures',
      'Monthly quality checks',
      'Standard loading/unloading',
      'Basic inventory tracking',
    ],
    notIncluded: [
      'Advanced monitoring system',
      'Transportation services',
      'Market linkage support',
      'Insurance coverage',
    ],
    highlight: false,
  },
  {
    name: 'Premium Storage',
    price: '₹45',
    unit: 'per quintal/day',
    description: 'Enhanced storage with advanced monitoring and support',
    features: [
      'Precision temperature & humidity control',
      '24/7 advanced security system',
      'Weekly quality assessments',
      'Priority loading/unloading',
      'Real-time inventory monitoring',
      'Basic transportation services',
      'Market price notifications',
      'Basic insurance coverage',
    ],
    notIncluded: [
      'Premium market linkage',
      'Export facilitation',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '₹60',
    unit: 'per quintal/day',
    description: 'Complete solution for large scale agricultural businesses',
    features: [
      'Custom temperature & humidity profiles',
      'Premium security with dedicated personnel',
      'Daily quality assessments & certification',
      'Express loading/unloading service',
      'Advanced inventory management system',
      'Comprehensive transportation network',
      'Direct market linkage & negotiations',
      'Full insurance coverage',
      'Export facilitation & documentation',
      'Financing options available',
    ],
    notIncluded: [],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-primary mb-4">Flexible Pricing Plans</h1>
          <p className="text-lg text-foreground/80">
            Choose the perfect storage solution that fits your needs and budget.
            All plans include our core IoT-enabled monitoring technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
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
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-foreground/70 ml-1">{plan.unit}</span>
                </div>
                <p className="text-foreground/70 mb-6">{plan.description}</p>
                
                <Link to="/contact" className="block w-full mb-6">
                  <Button 
                    className={`w-full ${!plan.highlight ? 'bg-primary/90 hover:bg-primary' : ''}`} 
                    variant={plan.highlight ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>

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
          <h2 className="text-2xl font-semibold mb-4 text-center">Need a custom solution?</h2>
          <p className="text-center mb-6">
            We offer tailored storage solutions for specific crop types, volumes, and durations.
            Contact our team to discuss your requirements.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button variant="outline">Contact Sales</Button>
            </Link>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Can I change plans later?</h3>
              <p className="text-foreground/70">Yes, you can upgrade or downgrade your plan at any time based on your storage needs.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Is there a minimum storage duration?</h3>
              <p className="text-foreground/70">Our minimum storage duration is 7 days for all plans.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How is the storage capacity calculated?</h3>
              <p className="text-foreground/70">Storage is calculated by weight (quintal) and billed on a daily basis.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-foreground/70">We accept UPI, credit/debit cards, net banking, and cash at select locations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
