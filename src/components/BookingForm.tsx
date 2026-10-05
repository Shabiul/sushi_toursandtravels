'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Mail,
  Users,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { bookingSchema, BookingData } from '@/lib/validations';
import { getWhatsAppUrl } from '@/lib/contact';
import { trackLeadFormConversion } from '@/lib/gtag';

interface BookingFormVehicle {
  id: string;
  type: string;
  name: string;
  priceDisplay?: string;
  ratePerKm?: number;
  ratePerKmAc?: number;
  ratePerKmNonAc?: number;
}

export default function BookingForm() {
  const [vehiclesList, setVehiclesList] = useState<BookingFormVehicle[]>([]);

  useEffect(() => {
    fetch('/api/fleet')
      .then((res) => res.json())
      .then((data) => {
        if (data.vehicles) setVehiclesList(data.vehicles);
      })
      .catch((err) => console.error('Error fetching fleet in booking:', err));
  }, []);
  const searchParams = useSearchParams();
  const compulsoryParam = searchParams.get('compulsory') === 'true';
  const isCustomRouteParam = searchParams.get('customRoute') === 'true';
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Pre-fill query parameters if present
  const defaultPickup = searchParams.get('pickup') || '';
  const defaultDrop = searchParams.get('drop') || '';
  const defaultVehicle = searchParams.get('vehicle') || '';
  const defaultTripType = searchParams.get('type') || 'One Way';

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickupLocation: defaultPickup,
      dropLocation: defaultDrop,
      tripType: (defaultTripType === 'Round Trip' || defaultTripType === 'Local Package' || defaultTripType === 'One Way' ? defaultTripType : 'One Way') as BookingData['tripType'],
      date: '',
      time: '',
      returnDate: '',
      vehicleType: defaultVehicle,
      fullName: '',
      mobile: '',
      email: '',
      passengers: 1,
      specialRequests: '',
    },
  });

  const selectedTripType = watch('tripType');

  // Sync parameters if they update dynamically
  useEffect(() => {
    if (defaultPickup) setValue('pickupLocation', defaultPickup);
    if (defaultDrop) setValue('dropLocation', defaultDrop);
    if (defaultVehicle) setValue('vehicleType', defaultVehicle);
    const typeParam = searchParams.get('type');
    if (typeParam === 'One Way' || typeParam === 'Round Trip' || typeParam === 'Local Package') {
      setValue('tripType', typeParam);
    }
  }, [defaultPickup, defaultDrop, defaultVehicle, searchParams, setValue]);

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof BookingData)[] = [];
    if (step === 1) {
      fieldsToValidate = [
        'pickupLocation',
        'dropLocation',
        'tripType',
        'date',
        'time',
        'vehicleType',
      ];
    } else if (step === 2) {
      fieldsToValidate = ['fullName', 'mobile', 'email', 'passengers'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (step === 2) {
        // Generate booking ID if not set
        const randomId = bookingId || `ST-${Math.floor(10000 + Math.random() * 90000)}`;
        setBookingId(randomId);

        try {
          const currentValues = getValues();
          const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...currentValues,
              bookingId: randomId
            })
          });
          if (response.ok) {
            // Track Google Ads lead creation conversion
            trackLeadFormConversion({
              lead_step: 'booking_lead_created',
              booking_id: randomId
            });
          } else {
            console.error('Failed to create booking database entry');
          }
        } catch (error) {
          console.error('Error calling booking creation API:', error);
        }
      }
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmitForm = (data: BookingData) => {
    console.log('Sushi Travels - Booking confirmed!', data, 'Booking ID:', bookingId);
    
    // Google Ads: Event snippet for Submit lead form conversion
    trackLeadFormConversion({
      lead_step: 'booking_form_confirmed',
      booking_id: bookingId,
      vehicle_type: data.vehicleType,
      trip_type: data.tripType,
    });

    // Auto-redirect to WhatsApp detailed booking confirmation link in a new tab
    const waUrl = getWhatsAppDetailedBookingUrl();
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
    
    setShowModal(true);
  };

  const values = getValues();

  // Create WhatsApp message link based on current form inputs
  const getWhatsAppBookingUrl = () => {
    const waPickup = watch('pickupLocation') || 'Bangalore';
    const waDrop = watch('dropLocation') || 'Ooty';
    const waVehicle = watch('vehicleType') || 'SUV';
    const waDate = watch('date') || 'Select Date';
    
    // Resolve vehicle name
    const matchedVehicle = vehiclesList.find(
      (v) => v.id === waVehicle || v.type.toLowerCase() === waVehicle.toLowerCase()
    );
    const vehicleName = matchedVehicle ? matchedVehicle.name : waVehicle;

    const text = `Hello Sushi Travels, I would like to book a ride:\n- *Pickup:* ${waPickup}\n- *Drop:* ${waDrop}\n- *Trip Type:* ${selectedTripType}\n- *Vehicle:* ${vehicleName}\n- *Date:* ${waDate}`;
    return getWhatsAppUrl(text);
  };

  // Detailed WhatsApp booking message for checkout confirmation
  const getWhatsAppDetailedBookingUrl = () => {
    const currentValues = getValues();
    
    // Resolve vehicle name
    const matchedVehicle = vehiclesList.find(
      (v) => v.id === currentValues.vehicleType || v.type.toLowerCase() === currentValues.vehicleType?.toLowerCase()
    );
    const vehicleName = matchedVehicle ? matchedVehicle.name : currentValues.vehicleType;

    const text = `Hello Sushi Travels,\n\nI have just placed a booking request on your website. Here are my details:\n\n*Booking ID:* ${bookingId}\n*Lead Passenger:* ${currentValues.fullName}\n*Mobile:* ${currentValues.mobile}\n*Email:* ${currentValues.email}\n*Trip Type:* ${currentValues.tripType}\n*Route:* ${currentValues.pickupLocation} ➔ ${currentValues.dropLocation}\n*Date & Time:* ${currentValues.date} at ${currentValues.time}\n${currentValues.returnDate ? `*Return Date:* ${currentValues.returnDate}\n` : ''}*Vehicle:* ${vehicleName}\n*Passengers:* ${currentValues.passengers}\n${currentValues.specialRequests ? `*Special Request:* ${currentValues.specialRequests}\n` : ''}\nThank you!`;
    return getWhatsAppUrl(text);
  };

  // Resolve preselected category type from vehicle parameter query
  const preselectedType = vehiclesList.some(v => v.type.toLowerCase() === defaultVehicle.toLowerCase())
    ? vehiclesList.find(v => v.type.toLowerCase() === defaultVehicle.toLowerCase())?.type
    : null;

  const displayedTypes = preselectedType
    ? [preselectedType]
    : Array.from(new Set(vehiclesList.map((v) => v.type).filter(Boolean)));

  return (
    <div className="w-full">
      {/* Progress Tracker */}
      <div className="mb-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-navy-light/10 -translate-y-1/2 -z-10" />
          
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 relative z-10 ${
                  step === num
                    ? 'bg-primary border-primary text-white scale-110 shadow-md shadow-primary/30'
                    : step > num
                    ? 'bg-navy border-navy text-white'
                    : 'bg-white border-navy-light/20 text-navy-light'
                }`}
              >
                {step > num ? '✓' : num}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-navy mt-2.5">
                {num === 1 ? 'Trip Details' : num === 2 ? 'Passengers' : 'Confirmation'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout: Form and Live Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-navy-light/10 pb-4">
                  <h2 className="font-serif font-bold text-2xl text-navy">Enter Trip Details</h2>
                  <p className="text-xs text-navy-light">Tell us where and when you need your chauffeur-driven vehicle</p>
                </div>

                {isCustomRouteParam && (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start space-x-3 text-navy">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <h4 className="font-bold text-navy mb-0.5">Custom Route Inquiry Notice</h4>
                      <p className="text-navy-light leading-relaxed">
                        You are booking a custom route: <strong>{watch('pickupLocation')} ➔ {watch('dropLocation')}</strong>. The fare shown below is a standard baseline estimate. The agency will review your booking and send the final verified quote via SMS/WhatsApp.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Trip Type */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                      Trip Type {compulsoryParam && <span className="text-[10px] text-primary-dark/95 lowercase italic font-normal ml-1">(compulsory for this route)</span>}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['One Way', 'Round Trip', 'Local Package'].map((t) => {
                        const isSelected = selectedTripType === t;
                        const isDisabled = compulsoryParam && !isSelected;
                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => setValue('tripType', t as BookingData['tripType'])}
                            className={`py-3 px-3 text-center rounded-xl text-xs font-bold border transition-all ${
                              isSelected
                                ? 'bg-navy border-navy text-white shadow-sm'
                                : isDisabled
                                ? 'bg-cream border-navy-light/5 text-navy-light/40 cursor-not-allowed opacity-50'
                                : 'bg-cream border-navy-light/10 text-navy hover:bg-cream-warm'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div className="relative">
                    <label htmlFor="booking-pickup" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Pickup Location
                    </label>
                    <input
                      id="booking-pickup"
                      type="text"
                      {...register('pickupLocation')}
                      placeholder="e.g. Bangalore Airport, MG Road"
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                    {errors.pickupLocation && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.pickupLocation.message}
                      </span>
                    )}
                  </div>

                  {/* Drop Location */}
                  <div className="relative">
                    <label htmlFor="booking-drop" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Drop Location
                    </label>
                    <input
                      id="booking-drop"
                      type="text"
                      {...register('dropLocation')}
                      placeholder="e.g. Mysore Palace, Ooty Homestay"
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                    {errors.dropLocation && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.dropLocation.message}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <label htmlFor="booking-date" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Pickup Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      {...register('date')}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                    {errors.date && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.date.message}
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <div className="relative">
                    <label htmlFor="booking-time" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <Clock className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Pickup Time
                    </label>
                    <input
                      id="booking-time"
                      type="time"
                      {...register('time')}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                    {errors.time && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.time.message}
                      </span>
                    )}
                  </div>

                  {/* Return Date - only relevant for Round Trip */}
                  {selectedTripType === 'Round Trip' && (
                    <div className="relative">
                      <label htmlFor="booking-return-date" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                        <Calendar className="w-3.5 h-3.5 text-primary mr-1.5" />
                        Return Date (Optional)
                      </label>
                      <input
                        id="booking-return-date"
                        type="date"
                        {...register('returnDate')}
                        min={watch('date') || new Date().toISOString().split('T')[0]}
                        className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                      />
                    </div>
                  )}

                  {/* Vehicle Type Dropdown */}
                  <div className="sm:col-span-2 relative">
                    <label htmlFor="booking-vehicle" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <Car className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Select Vehicle Model
                    </label>
                    <select
                      id="booking-vehicle"
                      {...register('vehicleType')}
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition appearance-none"
                    >
                      <option value="">-- Choose Vehicle --</option>
                      {displayedTypes.map((type) => (
                        <optgroup key={type} label={type}>
                          {vehiclesList
                            .filter((v) => v.type === type)
                            .map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.name} {compulsoryParam ? '' : `(${v.priceDisplay || (v.ratePerKmNonAc && v.ratePerKmAc ? `₹${v.ratePerKmNonAc} (Non-AC) / ₹${v.ratePerKmAc} (AC)` : `₹${v.ratePerKm}/km`)})`}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.vehicleType && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.vehicleType.message}
                      </span>
                    )}
                  </div>

                </div>

                {/* Next Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-navy hover:bg-primary text-white font-semibold rounded-full px-8 py-3 transition shadow-md"
                  >
                    Continue to Passengers
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Passenger Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-navy-light/10 pb-4">
                  <h2 className="font-serif font-bold text-2xl text-navy">Passenger & Contact Info</h2>
                  <p className="text-xs text-navy-light">Provide your contact details so our driver can reach you</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Full Name */}
                  <div className="relative">
                    <label htmlFor="booking-fullname" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <User className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Full Name
                    </label>
                    <input
                      id="booking-fullname"
                      type="text"
                      {...register('fullName')}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                    {errors.fullName && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="relative">
                    <label htmlFor="booking-mobile" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <Phone className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Mobile Number
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-navy-light/15 bg-cream-warm/40 text-sm text-navy font-bold">
                        +91
                      </span>
                      <input
                        id="booking-mobile"
                        type="text"
                        {...register('mobile')}
                        placeholder="9876543210"
                        className="w-full bg-cream border border-navy-light/15 rounded-r-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                      />
                    </div>
                    {errors.mobile && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.mobile.message}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="booking-email" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <Mail className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Email Address
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      {...register('email')}
                      placeholder="rahul@example.com"
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                    {errors.email && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Number of Passengers */}
                  <div className="relative">
                    <label htmlFor="booking-passengers" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <Users className="w-3.5 h-3.5 text-primary mr-1.5" />
                      No. of Passengers
                    </label>
                    <input
                      id="booking-passengers"
                      type="number"
                      {...register('passengers', { valueAsNumber: true })}
                      min="1"
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                    {errors.passengers && (
                      <span className="text-xs text-primary-dark font-medium flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.passengers.message}
                      </span>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div className="sm:col-span-2 relative">
                    <label htmlFor="booking-requests" className="block text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center">
                      <MessageSquare className="w-3.5 h-3.5 text-primary mr-1.5" />
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="booking-requests"
                      {...register('specialRequests')}
                      rows={3}
                      placeholder="e.g. Carrier for extra luggage, child safety seat, quiet driver..."
                      className="w-full bg-cream border border-navy-light/15 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-primary transition"
                    />
                  </div>

                </div>

                {/* Back / Next Buttons */}
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="border border-navy-light text-navy font-semibold rounded-full px-8 py-3 hover:bg-cream transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-navy hover:bg-primary text-white font-semibold rounded-full px-8 py-3 transition shadow-md"
                  >
                    Continue to Summary
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation Summary */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="border-b border-navy-light/10 pb-4">
                  <h2 className="font-serif font-bold text-2xl text-navy">Review & Confirm</h2>
                  <p className="text-xs text-navy-light">Verify your details before placing the reservation</p>
                </div>

                <div className="bg-cream rounded-xl p-6 border border-navy-light/10 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-navy">
                    <div>
                      <span className="text-[10px] text-navy-light uppercase font-bold block">Pickup Location</span>
                      <p className="font-semibold">{values.pickupLocation}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-navy-light uppercase font-bold block">Drop Location</span>
                      <p className="font-semibold">{values.dropLocation}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-navy-light uppercase font-bold block">Trip Details</span>
                      <p className="font-semibold">
                        {values.tripType} | {values.vehicleType}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-navy-light uppercase font-bold block">Schedule</span>
                      <p className="font-semibold">
                        {values.date} at {values.time}
                      </p>
                    </div>
                    {values.returnDate && (
                      <div>
                        <span className="text-[10px] text-navy-light uppercase font-bold block">Return Date</span>
                        <p className="font-semibold">{values.returnDate}</p>
                      </div>
                    )}
                    <div className="border-t border-navy-light/10 pt-3 md:col-span-2">
                      <span className="text-[10px] text-navy-light uppercase font-bold block">Lead Passenger</span>
                      <p className="font-semibold">
                        {values.fullName} ({values.mobile})
                      </p>
                      <p className="text-xs text-navy-light mt-0.5">{values.email}</p>
                    </div>
                    {values.specialRequests && (
                      <div className="border-t border-navy-light/10 pt-3 md:col-span-2">
                        <span className="text-[10px] text-navy-light uppercase font-bold block">Special Request</span>
                        <p className="text-xs italic text-navy-light">&quot;{values.specialRequests}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-navy-light">
                  <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>By confirming, you agree to receive SMS/WhatsApp driver details 2 hours before trip.</span>
                </div>

                {/* Back / Submit Buttons */}
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="border border-navy-light text-navy font-semibold rounded-full px-8 py-3 hover:bg-cream transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-bold rounded-full px-10 py-3.5 transition-all duration-200 shadow-sm"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            )}

          </form>
        </div>

        {/* Right Column: Booking & Support Sidebar */}
        <div className="space-y-6">
          {/* Quick WhatsApp Banner */}
          <div className="bg-[#E7F7EF] border border-[#25D366]/20 rounded-2xl p-6 text-navy">
            <h3 className="font-bold text-sm text-[#128C7E] flex items-center mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] mr-2 animate-pulse" />
              Prefer Booking via WhatsApp?
            </h3>
            <p className="text-xs text-navy-light leading-relaxed mb-4">
              Get an instant quote and book with our operator in under 2 minutes. Free cancellation.
            </p>
            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat with Sushi Travels on WhatsApp for Instant Booking Quote"
              className="inline-flex items-center justify-center space-x-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-full py-3 shadow-sm transition"
            >
              <span>Click to Chat on WhatsApp →</span>
            </a>
          </div>
        </div>

      </div>

      {/* Booking Success Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={() => {
                setShowModal(false);
                setStep(1);
              }}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative z-10 shadow-2xl border border-navy-light/10 text-center text-navy"
            >
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-10 h-10 text-teal-500" />
              </div>

              <h3 className="font-serif font-bold text-2xl mb-2">Booking Confirmed!</h3>
              
              <div className="inline-block bg-cream border border-navy-light/10 rounded-full px-4 py-1.5 text-xs font-bold mb-4 text-navy-light">
                Booking ID: <span className="text-primary">{bookingId}</span>
              </div>

              <p className="text-sm text-navy-light leading-relaxed mb-6">
                Thank you for choosing <strong>Sushi Travels</strong>. Your booking details have been successfully recorded and sent to WhatsApp. Our support team will confirm your voucher details shortly.
              </p>

              <div className="bg-cream rounded-xl p-4 text-left border border-navy-light/5 text-xs text-navy-light space-y-2 mb-6">
                <div className="flex justify-between font-medium text-navy">
                  <span>Lead Passenger:</span>
                  <span>{values.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Date:</span>
                  <span>{values.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle Category:</span>
                  <span>{values.vehicleType}</span>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="mb-5">
                <a
                  href={getWhatsAppDetailedBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Send Booking Request Details to Sushi Travels on WhatsApp"
                  className="inline-flex items-center justify-center space-x-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold rounded-full py-3.5 shadow-md transition hover:scale-[1.02]"
                >
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.799-4.382 9.802-9.77.001-2.61-1.01-5.063-2.859-6.915C16.368 2.067 13.92 1.05 11.332 1.05 6.225 1.05 2.072 5.19 2.07 10.293c-.001 1.57.418 3.101 1.214 4.467l-.101.488-.636 2.327 2.383-.624.48-.114zM16.598 13.7c-.26-.13-1.532-.756-1.77-.84-.23-.087-.4-.13-.568.13-.168.256-.648.81-.795.975-.147.168-.294.188-.553.058-1.282-.64-2.115-1.066-2.953-2.51-.219-.38.22-.35.63-1.168.065-.13.032-.244-.016-.34-.049-.1-.4-.967-.548-1.327-.144-.349-.29-.302-.4-.302-.1-.003-.217-.003-.332-.003-.115 0-.304.043-.462.211-.158.169-.604.59-.604 1.44 0 .85.618 1.67.705 1.787.087.115 1.216 1.856 2.946 2.602.413.178.734.284.985.364.415.13.792.11 1.09.066.33-.05 1.006-.412 1.148-.811.143-.399.143-.74.1-.81-.044-.07-.159-.112-.42-.24z" />
                  </svg>
                  <span>Send on WhatsApp (Required)</span>
                </a>
                <p className="text-[10px] text-primary-dark font-bold mt-2">
                  * Note: Sending the WhatsApp message is required to finalize and confirm your booking request.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setStep(1);
                }}
                className="w-full border border-navy-light text-navy font-semibold rounded-full py-3 text-sm hover:bg-cream transition"
              >
                Return to Site
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
