'use client';

import { useState } from 'react';
import { useBookingService } from '@/lib/useBookingService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function BookingForm({ serviceId, providerId, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    service: serviceId || '',
    date: new Date(),
    time: '',
    address: '',
    notes: '',
  });
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  
  const { createBooking, isLoading, error } = useBookingService();

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
    setSelectedTime(time);
    setIsTimePickerOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format date for API
    const formattedDate = format(formData.date, 'yyyy-MM-dd');
    
    try {
      // Create booking with formatted data
      const bookingData = {
        ...formData,
        date: formattedDate,
        service: serviceId,
      };
      
      const result = await createBooking(bookingData);
      
      if (result) {
        onSuccess && onSuccess(result);
        onClose();
      }
    } catch (error) {
      console.error('Booking creation failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book a Service</DialogTitle>
          <DialogDescription>
            Fill in the details below to book this service.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="flex items-center">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={handleDateChange}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select
                value={formData.time}
                onValueChange={(value) => handleTimeChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions or requirements"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm py-2">
              {error}
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Booking...' : 'Book Now'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
