import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle2, Loader2, MapPin, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const acresOptions = [
  '1-2 Acres',
  '3-5 Acres',
  '6-10 Acres',
  '10+ Acres',
];

// Validation schema
const formSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().regex(/^[+]?[\d\s-]{10,15}$/, 'Please enter a valid phone number'),
  acresSpray: z.string().min(1, 'Please select acres to spray'),
  preferredDate: z.date().refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
    message: 'Date cannot be in the past',
  }),
  pincode: z.string().trim().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  latitude: z.number({ required_error: 'Location is required' }),
  longitude: z.number({ required_error: 'Location is required' }),
});

interface FormData {
  fullName: string;
  phone: string;
  acresSpray: string;
  preferredDate: Date | undefined;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
}

export function BookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    acresSpray: '',
    preferredDate: undefined,
    pincode: '',
    latitude: null,
    longitude: null,
  });

  // Auto-fetch geolocation on component mount
  useEffect(() => {
    fetchUserLocation();
  }, []);

  const updateLatLng = async (lat: number, lng: number) => {
    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!SUPABASE_URL || !SUPABASE_KEY) return;

      await fetch(`${SUPABASE_URL}/functions/v1/updateLatLng`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ 
          latitude: lat, 
          longitude: lng,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const fetchUserLocation = () => {
    setIsFetchingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsFetchingLocation(false);
      setShowLocationDialog(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
        
        // Update location in background
        updateLatLng(latitude, longitude);
        
        setIsFetchingLocation(false);
        toast({
          title: 'Location Detected',
          description: 'Your location has been automatically detected.',
        });
      },
      (error) => {
        let errorMessage = 'Unable to fetch location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location access in your browser settings.';
            setShowLocationDialog(true);
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        setLocationError(errorMessage);
        setIsFetchingLocation(false);
        
        toast({
          title: 'Location Error',
          description: errorMessage,
          variant: 'destructive',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleOpenLocationSettings = () => {
    setShowLocationDialog(false);
    toast({
      title: 'Enable Location Access',
      description: 'Please click the location icon in your browser address bar and allow location access, then refresh the page.',
      duration: 7000,
    });
  };

  const validateForm = (): boolean => {
    setErrors({});

    try {
      formSchema.parse({
        fullName: formData.fullName,
        phone: formData.phone,
        acresSpray: formData.acresSpray,
        preferredDate: formData.preferredDate,
        pincode: formData.pincode,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
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
        acresSpray: formData.acresSpray,
        preferredDate: formData.preferredDate?.toISOString(),
        pincode: formData.pincode.trim(),
        location: {
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
      },
    };

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.warn('Supabase configuration missing');
        // Fallback for demo/dev without env
        setIsSuccess(true);
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/requestBookingViaWhatssapV2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

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
          acresSpray: '',
          preferredDate: undefined,
          pincode: '',
          latitude: null,
          longitude: null,
        });
        setIsSuccess(false);
        fetchUserLocation();
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
    <>
      {/* Location Permission Dialog */}
      <AlertDialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Location Access Required
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <p>
                Location access is required to book our drone spray service. This helps us identify your field location accurately.
              </p>
              <p className="text-sm">
                <strong>To enable location access:</strong>
              </p>
              <ol className="text-sm list-decimal list-inside space-y-1 ml-2">
                <li>Click the location/lock icon in your browser's address bar</li>
                <li>Select "Allow" or "Always allow" for location access</li>
                <li>Refresh the page</li>
              </ol>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLocationDialog(false)}>
              I'll Enable It
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleOpenLocationSettings}>
              Got It
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card p-6 md:p-10">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
          Book Spray Service
        </h2>

        <div className="space-y-6">
          {/* Name - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={cn('h-12', errors.fullName && 'border-destructive')}
              disabled={isLoading}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          {/* Phone - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={cn('h-12', errors.phone && 'border-destructive')}
              disabled={isLoading}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Acres Spray & Date - 2 Columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* How much Acres Spray */}
            <div className="space-y-2">
              <Label htmlFor="acresSpray">
                How much Acers Spray? <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.acresSpray}
                onValueChange={(value) => setFormData({ ...formData, acresSpray: value })}
                disabled={isLoading}
              >
                <SelectTrigger className={cn('h-12', errors.acresSpray && 'border-destructive')}>
                  <SelectValue placeholder="1-2 Acers" />
                </SelectTrigger>
                <SelectContent>
                  {acresOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.acresSpray && (
                <p className="text-sm text-destructive">{errors.acresSpray}</p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>
                Date <span className="text-destructive">*</span>
              </Label>
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
                    onSelect={(date) => setFormData({ ...formData, preferredDate: date })}
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

          {/* Pincode - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="pincode">
              Pincode <span className="text-destructive">*</span>
            </Label>
            <Input
              id="pincode"
              type="text"
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFormData({ ...formData, pincode: value });
              }}
              className={cn('h-12', errors.pincode && 'border-destructive')}
              disabled={isLoading}
            />
            {errors.pincode && (
              <p className="text-sm text-destructive">{errors.pincode}</p>
            )}
          </div>

          {/* Latitude & Longitude - 2 Columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Latitude */}
            <div className="space-y-2">
              <Label htmlFor="latitude">
                Latitude <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="latitude"
                  type="text"
                  placeholder={isFetchingLocation ? 'Fetching...' : 'Auto-detected'}
                  value={formData.latitude !== null ? formData.latitude.toFixed(6) : ''}
                  readOnly
                  className={cn('h-12 pl-10', errors.latitude && 'border-destructive')}
                  disabled={isLoading}
                />
              </div>
              {errors.latitude && (
                <p className="text-sm text-destructive">{errors.latitude}</p>
              )}
            </div>

            {/* Longitude */}
            <div className="space-y-2">
              <Label htmlFor="longitude">
                Longitude <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="longitude"
                  type="text"
                  placeholder={isFetchingLocation ? 'Fetching...' : 'Auto-detected'}
                  value={formData.longitude !== null ? formData.longitude.toFixed(6) : ''}
                  readOnly
                  className={cn('h-12 pl-10', errors.longitude && 'border-destructive')}
                  disabled={isLoading}
                />
              </div>
              {errors.longitude && (
                <p className="text-sm text-destructive">{errors.longitude}</p>
              )}
            </div>
          </div>

          {/* Location Error Message */}
          {locationError && !isFetchingLocation && (
            <div className="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-destructive font-medium">{locationError}</p>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-destructive underline"
                  onClick={fetchUserLocation}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-6 border-t border-border">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading || isFetchingLocation}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : isFetchingLocation ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                Submit Booking
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
