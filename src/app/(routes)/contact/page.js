import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  Clock,
  MessageCircle,
  Headphones
} from "lucide-react";
import Link from "next/link";
import { phoneNumber } from "@/utilis/data";

export const metadata = {
  title: 'Contact Triveni Cabs | 24/7 Customer Support | Book Taxi Online',
  description: 'Contact Triveni Cabs for taxi booking, customer support, and inquiries. Available 24/7 across 14+ cities. Call +91-7668570551 or email cabstriveni@gmail.com',
  keywords: 'contact Triveni Cabs, taxi booking support, cab service contact, customer care number, 24/7 cab support, taxi helpline India',
  openGraph: {
    title: 'Contact Triveni Cabs - 24/7 Customer Support',
    description: 'Get in touch with Triveni Cabs for reliable taxi services across India. Professional support team available 24/7.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: {
    index: true,
    follow: true,
  }
}

// Contact information data
const contactInfo = [
  {
    icon: Phone,
    title: "24/7 Booking Hotline",
    content: `+91 ${phoneNumber}`,
    subContent: "Available round the clock",
    action: `tel:+91${phoneNumber}`,
    actionText: "Call Now",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    icon: Mail,
    title: "Email Support",
    content: "cabstriveni@gmail.com",
    subContent: "Response within 2 hours",
    action: "mailto:cabstriveni@gmail.com",
    actionText: "Send Email",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Booking",
    content: `+91 ${phoneNumber}`,
    subContent: "Quick booking & support",
    action: `https://wa.me/${phoneNumber}`,
    actionText: "WhatsApp",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  }
];

// Business hours data
const businessHours = [
  { day: "Monday - Sunday", hours: "24/7 Available", highlight: true },
  { day: "Office Hours", hours: "9:00 AM - 6:00 PM", highlight: false },
  { day: "Emergency Support", hours: "24/7 Available", highlight: true }
];

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section - Optimized for mobile */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-32"
        style={{
          backgroundImage: "url('/images/about/about_banner.jpg')",
        }}
        aria-labelledby="contact-hero-title"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex justify-center items-center space-x-1 md:space-x-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 hover:text-yellow-300 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-200" />
              <li className="text-yellow-300 font-medium" aria-current="page">
                Contact Us
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
            
            {/* Quick Contact CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href={`tel:+91${phoneNumber}`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                aria-label={`Call Triveni Cabs at ${phoneNumber}`}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {phoneNumber}
              </Link>
              <Link
                href={`https://wa.me/${phoneNumber}`}
                className="bg-black hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                aria-label="Contact Triveni Cabs on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards - Mobile-optimized */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {contactInfo.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${item.bgColor} p-4 rounded-full mb-4`}>
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
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors"
                  aria-label={`${item.actionText} - ${item.content}`}
                >
                  {item.actionText}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form - Enhanced */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <header className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Have a question about our cab services? Fill out the form below and we&apos;ll respond quickly.
              </p>
            </header>

            <form className="space-y-5" aria-label="Contact form">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="firstName"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="Enter your first name"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="your@email.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="serviceType"
                >
                  Service Type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                >
                  <option value="">Select a service</option>
                  <option value="outstation">Outstation Cab Booking</option>
                  <option value="local">Local Taxi Service</option>
                  <option value="airport">Airport Transfer</option>
                  <option value="wedding">Wedding Car Rental</option>
                  <option value="corporate">Corporate Transportation</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="subject"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  placeholder="How can we help you?"
                  aria-required="true"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="message"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 resize-vertical text-sm md:text-base"
                  placeholder="Please describe your inquiry or booking requirements..."
                  aria-required="true"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                aria-label="Send message to Triveni Cabs"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
              </p>
            </form>
          </div>

          {/* Right Column - Map and Info */}
          <div className="space-y-6">
            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
                  Our Location
                </h3>
              </div>
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.070065346594!2d78.03222671511287!3d27.162790483020315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974724c3a85754b%3A0x69b6e3cf6cb66d4f!2s366%2C%20Dandupura%2C%20Tajganj%2C%20Agra%2C%20Uttar%20Pradesh%20282006%2C%20India!5e0!3m2!1sen!2sin!4v1701234567890!5m2!1sen!2sin"
                  className="w-full h-[250px] md:h-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Triveni Cabs Office Location in Agra"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-lg">
              
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                Service Hours
              </h3>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                      schedule.highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
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

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-2 rounded-full">
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
                      className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300 justify-center"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </Link>
                    <Link
                      href={`https://wa.me/${phoneNumber}`}
                      className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas Quick Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Our Service Cities
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Book reliable taxi services in these cities:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                {[
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
                ].map((city, index) => (
                  <Link
                    key={index}
                    href={city.href}
                    className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors duration-200 p-2 rounded-lg hover:bg-yellow-50 group"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 group-hover:bg-yellow-600 transition-colors"></div>
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
          </div>
        </div>
      </section>
    </div>
  );
}