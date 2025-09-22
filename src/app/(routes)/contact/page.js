'use client';

import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  Clock,
  MessageCircle,
  Headphones,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { phoneNumber } from "@/utilis/data";

// Static data constants
const CONTACT_INFO = [
  {
    icon: Phone,
    title: "24/7 Booking Hotline",
    content: `+91 ${phoneNumber}`,
    subContent: "Available round the clock",
    action: `tel:+91${phoneNumber}`,
    actionText: "Call Now",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    priority: true
  },
  {
    icon: Mail,
    title: "Email Support",
    content: "cabstriveni@gmail.com",
    subContent: "Response within 2 hours",
    action: "mailto:cabstriveni@gmail.com",
    actionText: "Send Email",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    priority: false
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Booking",
    content: `+91 ${phoneNumber}`,
    subContent: "Quick booking & support",
    action: `https://wa.me/${phoneNumber}`,
    actionText: "WhatsApp",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    priority: true
  }
];

const BUSINESS_HOURS = [
  { day: "Monday - Sunday", hours: "24/7 Available", highlight: true },
  { day: "Office Hours", hours: "9:00 AM - 6:00 PM", highlight: false },
  { day: "Emergency Support", hours: "24/7 Available", highlight: true }
];

const SERVICE_CITIES = [
  { name: 'Delhi', href: '/delhi' },
  { name: 'Agra', href: '/agra' },
  { name: 'Jaipur', href: '/jaipur' },
  { name: 'Chandigarh', href: '/chandigarh' },
  { name: 'Shimla', href: '/shimla' },
  { name: 'Manali', href: '/manali' },
  { name: 'Amritsar', href: '/amritsar' },
  { name: 'Dehradun', href: '/dehradun' },
  { name: 'Rishikesh', href: '/rishikesh' },
  { name: 'Haridwar', href: '/haridwar' },
  { name: 'Jodhpur', href: '/jodhpur' },
  { name: 'Udaipur', href: '/udaipur' },
  { name: 'Ayodhya', href: '/ayodhya' },
  { name: 'Ahmedabad', href: '/ahmedabad' }
];

const SERVICE_TYPES = [
  { value: "", label: "Select a service" },
  { value: "outstation", label: "Outstation Cab Booking" },
  { value: "local", label: "Local Taxi Service" },
  { value: "airport", label: "Airport Transfer" },
  { value: "wedding", label: "Wedding Car Rental" },
  { value: "corporate", label: "Corporate Transportation" },
  { value: "other", label: "Other Inquiry" }
];

// Optimized form validation
const validateForm = (data) => {
  const errors = {};
  
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email is invalid";
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.length < 10) errors.message = "Message must be at least 10 characters";
  
  return errors;
};

// Lazy loading map component with error handling
const LazyMap = () => {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoaded && !hasError) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, [isLoaded, hasError]);

  const handleMapError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div ref={mapRef} className="relative">
      {isLoaded && !hasError ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.070065346594!2d78.03222671511287!3d27.162790483020315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974724c3a85754b%3A0x69b6e3cf6cb66d4f!2s366%2C%20Dandupura%2C%20Tajganj%2C%20Agra%2C%20Uttar%20Pradesh%20282006%2C%20India!5e0!3m2!1sen!2sin!4v1701234567890!5m2!1sen!2sin"
          className="w-full h-[250px] md:h-[300px] transition-opacity duration-300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Triveni Cabs Office Location in Agra"
          onError={handleMapError}
        />
      ) : hasError ? (
        <div className="w-full h-[250px] md:h-[300px] bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Unable to load map</p>
            <p className="text-xs text-gray-500">366, Dandupura, Tajganj, Agra</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[250px] md:h-[300px] bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm">
        <span className="text-sm font-medium text-gray-800">Agra Office</span>
      </div>
    </div>
  );
};

// Optimized ContactCard with loading states
const ContactCard = ({ item, index }) => (
  <article
    className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:shadow-xl"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex flex-col items-center text-center">
      <div className={`${item.bgColor} p-4 rounded-full mb-4 transition-transform duration-300 hover:scale-110`}>
        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
      </div>
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
        {item.title}
      </h2>
      <p className="text-gray-700 font-medium mb-1 text-sm md:text-base">
        {item.content}
      </p>
      <p className="text-xs md:text-sm text-gray-500 mb-4">
        {item.subContent}
      </p>
      <Link
        href={item.action}
        className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-all duration-300 hover:gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-md px-2 py-1"
        aria-label={`${item.actionText} - ${item.content}`}
        {...(item.priority ? {} : { prefetch: false })}
      >
        {item.actionText}
        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300" />
      </Link>
    </div>
  </article>
);

// Input component with better accessibility
const FormInput = ({ label, name, type = "text", required = false, placeholder, value, onChange, error, autoComplete, rows }) => {
  const inputId = `form-${name}`;
  const errorId = `${inputId}-error`;
  
  const baseClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
    error ? 'border-red-300 bg-red-50' : 'border-gray-200'
  }`;
  
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor={inputId}
      >
        {label} {required && <span className="text-red-500" aria-label="required">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`${baseClasses} resize-vertical`}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          rows={rows}
        />
      ) : type === 'select' ? (
        <select
          id={inputId}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={baseClasses}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
        >
          {SERVICE_TYPES.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={inputId}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={baseClasses}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          autoComplete={autoComplete}
        />
      )}
      
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

// Main Contact component
export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const submitTimeoutRef = useRef(null);

  // Memoized form validation
  const formErrors = useMemo(() => validateForm(formData), [formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorField = document.getElementById(`form-${Object.keys(validationErrors)[0]}`);
      firstErrorField?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);
    
    try {
      // Simulate API call with timeout for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would add your actual form submission logic
      console.log('Form submitted:', formData);
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceType: '',
        subject: '',
        message: ''
      });
      
      setSubmitStatus('success');
      
      // Auto-hide success message after 5 seconds
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  // Memoized components
  const ContactCards = useMemo(() => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {CONTACT_INFO.map((item, index) => (
          <ContactCard key={`contact-${index}`} item={item} index={index} />
        ))}
      </div>
    </section>
  ), []);

  const BusinessHoursCard = useMemo(() => (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-yellow-500" />
        Service Hours
      </h3>
      <div className="space-y-3">
        {BUSINESS_HOURS.map((schedule, index) => (
          <div
            key={`hours-${index}`}
            className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
              schedule.highlight 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span className="text-gray-700 font-medium text-sm md:text-base">
              {schedule.day}
            </span>
            <span className={`text-sm md:text-base font-semibold ${
              schedule.highlight ? 'text-green-600' : 'text-gray-800'
            }`}>
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  ), []);

  const ServiceCitiesCard = useMemo(() => (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Our Service Cities
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Book reliable taxi services in these cities:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
        {SERVICE_CITIES.map((city) => (
          <Link
            key={city.name}
            href={city.href}
            className="flex items-center text-gray-700 hover:text-yellow-600 transition-all duration-200 p-2 rounded-lg hover:bg-yellow-50 group focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            prefetch={false}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 group-hover:bg-yellow-600 transition-colors flex-shrink-0" />
            <span className="text-sm font-medium">{city.name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          ✨ 24/7 service available in all cities
        </p>
      </div>
    </div>
  ), []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section - Optimized with better image handling */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        aria-labelledby="contact-hero-title"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/about/about_banner.jpg"
            alt="Contact Triveni Cabs - Professional taxi service"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb with schema markup */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex justify-center items-center space-x-1 md:space-x-3 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link
                  href="/"
                  className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 focus:outline-none focus:text-yellow-300"
                  itemProp="item"
                  prefetch={false}
                >
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-200" />
              <li className="text-yellow-300 font-medium" aria-current="page" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">Contact Us</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="text-center">
            <h1 id="contact-hero-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Contact <span className="text-yellow-400">Triveni Cabs</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              24/7 customer support for all your taxi booking needs across 14+ cities
            </p>
            
            {/* Quick Contact CTA - Optimized with better accessibility */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href={`tel:+91${phoneNumber}`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-lg"
                aria-label={`Call Triveni Cabs at +91 ${phoneNumber}`}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {phoneNumber}
              </Link>
              <Link
                href={`https://wa.me/91${phoneNumber}`}
                className="bg-black hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 shadow-lg"
                aria-label="Contact Triveni Cabs on WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      {ContactCards}

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form - Enhanced with better validation and UX */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <header className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Have a question about our cab services? Fill out the form below and we&apos;ll respond quickly.
              </p>
            </header>

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-green-800 font-medium">Message sent successfully!</p>
                  <p className="text-green-700 text-sm">We&apos;ll get back to you within 2 hours.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <div>
                  <p className="text-red-800 font-medium">Failed to send message</p>
                  <p className="text-red-700 text-sm">Please try again or call us directly.</p>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  required
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  autoComplete="email"
                />
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  autoComplete="tel"
                />
              </div>

              {/* Service Type */}
              <FormInput
                label="Service Type"
                name="serviceType"
                type="select"
                value={formData.serviceType}
                onChange={handleInputChange}
                error={errors.serviceType}
              />

              {/* Subject */}
              <FormInput
                label="Subject"
                name="subject"
                required
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleInputChange}
                error={errors.subject}
              />

              {/* Message */}
              <FormInput
                label="Message"
                name="message"
                type="textarea"
                required
                placeholder="Please describe your inquiry or booking requirements..."
                value={formData.message}
                onChange={handleInputChange}
                error={errors.message}
                rows={5}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(formErrors).length > 0}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 shadow-lg"
                aria-label="Send message to Triveni Cabs"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
              </p>
            </form>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Map Section - Lazy loaded with error handling */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
                  Our Location
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  366, Dandupura, Tajganj, Agra, UP 282006
                </p>
              </div>
              <LazyMap />
            </div>

            {BusinessHoursCard}

            {/* Emergency Contact - Enhanced with better visual hierarchy */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                  <Headphones className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Our customer support team is available 24/7 to help you with bookings, 
                    cancellations, or any travel emergencies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`tel:+91${phoneNumber}`}
                      className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300 justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </Link>
                    <Link
                      href={`https://wa.me/91${phoneNumber}`}
                      className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 justify-center focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {ServiceCitiesCard}
          </div>
        </div>
      </section>

      {/* Additional Contact Information - Schema markup for SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="bg-yellow-400 bg-opacity-20 p-3 rounded-full w-fit mx-auto">
                <Phone className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold">Call Us</h4>
              <p className="text-gray-300 text-sm">24/7 Support</p>
            </div>
            <div className="space-y-2">
              <div className="bg-blue-400 bg-opacity-20 p-3 rounded-full w-fit mx-auto">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold">Email Us</h4>
              <p className="text-gray-300 text-sm">Quick Response</p>
            </div>
            <div className="space-y-2">
              <div className="bg-green-400 bg-opacity-20 p-3 rounded-full w-fit mx-auto">
                <MessageCircle className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold">WhatsApp</h4>
              <p className="text-gray-300 text-sm">Instant Booking</p>
            </div>
            <div className="space-y-2">
              <div className="bg-purple-400 bg-opacity-20 p-3 rounded-full w-fit mx-auto">
                <MapPin className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold">Visit Us</h4>
              <p className="text-gray-300 text-sm">Agra Office</p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Triveni Cabs",
            "description": "Professional taxi and cab services across India with 24/7 customer support",
            "telephone": `+91-${phoneNumber}`,
            "email": "cabstriveni@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "366, Dandupura, Tajganj",
              "addressLocality": "Agra",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "282006",
              "addressCountry": "IN"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "serviceArea": SERVICE_CITIES.map(city => ({
              "@type": "City",
              "name": city.name
            })),
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": `+91-${phoneNumber}`,
              "contactType": "customer service",
              "availableLanguage": ["English", "Hindi"],
              "hoursAvailable": "Mo-Su 00:00-23:59"
            }
          })
        }}
      />
    </div>
  );
}