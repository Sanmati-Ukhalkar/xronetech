import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { LocationPicker } from './LocationPicker';

const cropTypes = [
  'Rice',
  'Wheat',
  'Cotton',
  'Sugarcane',
  'Maize',
  'Soybean',
  'Vegetables',
  'Fruits',
  'Other',
];

// Validation schemas
const step1Schema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().regex(/^[+]?[\d\s-]{10,15}$/, 'Please enter a valid phone number'),
  email: z.string().trim().email('Please enter a valid email').optional().or(z.literal('')),
});

const step2Schema = z.object({
  cropType: z.string().min(1, 'Please select a crop type'),
  landArea: z.number().min(0.1, 'Land area must be at least 0.1 acres').max(10000, 'Land area seems too large'),
  preferredDate: z.date().refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: 'Date cannot be in the past',
  }),
});

const step3Schema = z.object({
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  address: z.string().max(500, 'Address is too long').optional(),
});

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  cropType: string;
  landArea: string;
  preferredDate: Date | undefined;
  location: { lat: number; lng: number } | null;
  address: string;
}

interface BookingFormProps {
  webhookUrl: string;
}

export function BookingForm({ webhookUrl }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    cropType: '',
    landArea: '',
    preferredDate: undefined,
    location: null,
    address: '',
  });

  const steps = [
    { number: 1, title: 'Farmer Details' },
    { number: 2, title: 'Field Details' },
    { number: 3, title: 'Location' },
  ];

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    setErrors({});
    
    try {
      if (step === 1) {
        step1Schema.parse({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
        });
      } else if (step === 2) {
        step2Schema.parse({
          cropType: formData.cropType,
          landArea: parseFloat(formData.landArea) || 0,
          preferredDate: formData.preferredDate,
        });
      } else if (step === 3) {
        step3Schema.parse({
          location: formData.location,
          address: formData.address,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    if (!webhookUrl) {
      toast({
        title: 'Webhook URL Required',
        description: 'Please enter your n8n webhook URL above the form.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const payload = {
      source: 'xronetech-website',
      formType: 'book-drone-spray',
      timestamp: new Date().toISOString(),
      data: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        cropType: formData.cropType,
        landArea: formData.landArea,
        preferredDate: formData.preferredDate?.toISOString(),
        location: formData.location,
        address: formData.address.trim(),
      },
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
      toast({
        title: 'Booking Submitted!',
        description: 'Thank you. Our team will contact you shortly.',
      });

      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          cropType: '',
          landArea: '',
          preferredDate: undefined,
          location: null,
          address: '',
        });
        setCurrentStep(1);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
          Booking Submitted Successfully!
        </h3>
        <p className="text-muted-foreground text-lg">
          Thank you. Our team will contact you shortly to confirm your drone spray service.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-card p-6 md:p-10">
      {/* Progress Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300',
                    currentStep >= step.number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {currentStep > step.number ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    'text-sm font-medium mt-2 text-center hidden sm:block',
                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-4 rounded-full transition-all duration-300',
                    currentStep > step.number ? 'bg-primary' : 'bg-secondary'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div ref={formRef}>
        {/* Step 1: Farmer Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6">
              Farmer Details
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={cn('h-12', errors.fullName && 'border-destructive')}
                disabled={isLoading}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={cn('h-12', errors.phone && 'border-destructive')}
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={cn('h-12', errors.email && 'border-destructive')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Field Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6">
              Field Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type *</Label>
              <Select
                value={formData.cropType}
                onValueChange={(value) =>
                  setFormData({ ...formData, cropType: value })
                }
                disabled={isLoading}
              >
                <SelectTrigger className={cn('h-12', errors.cropType && 'border-destructive')}>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cropType && (
                <p className="text-sm text-destructive">{errors.cropType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="landArea">Land Area (Acres) *</Label>
              <Input
                id="landArea"
                type="number"
                step="0.1"
                min="0.1"
                placeholder="Enter land area in acres"
                value={formData.landArea}
                onChange={(e) =>
                  setFormData({ ...formData, landArea: e.target.value })
                }
                className={cn('h-12', errors.landArea && 'border-destructive')}
                disabled={isLoading}
              />
              {errors.landArea && (
                <p className="text-sm text-destructive">{errors.landArea}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full h-12 justify-start text-left font-normal',
                      !formData.preferredDate && 'text-muted-foreground',
                      errors.preferredDate && 'border-destructive'
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.preferredDate ? (
                      format(formData.preferredDate, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.preferredDate}
                    onSelect={(date) =>
                      setFormData({ ...formData, preferredDate: date })
                    }
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.preferredDate && (
                <p className="text-sm text-destructive">{errors.preferredDate}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6">
              Location
            </h3>

            <div className="space-y-2">
              <Label>Field Location *</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Click on the map to select your field location
              </p>
              <LocationPicker
                value={formData.location}
                onChange={(location) => setFormData({ ...formData, location })}
                disabled={isLoading}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address Details (Optional)</Label>
              <Textarea
                id="address"
                placeholder="Village, Taluk, District, State..."
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className={cn('min-h-[100px]', errors.address && 'border-destructive')}
                disabled={isLoading}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-10 pt-6 border-t border-border">
        {currentStep > 1 ? (
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <Button size="lg" onClick={handleNext} disabled={isLoading}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button size="lg" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Booking
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
