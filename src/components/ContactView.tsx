import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Idol Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-widest text-orange-700">
          We are Here to Assist Your Puja
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-amber-950">
          Contact Eco Ganesh
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Have questions about idol sizes, Shadu clay composition, bulk society bookings, or home visarjan? Reach out to our master sculptors and support team.
        </p>
      </div>

      {/* 3 Contact Detail Cards: Phone, Email, Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <Phone className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-950">Phone & WhatsApp</h3>
            <p className="text-xs text-stone-500">Available Mon-Sun 8 AM to 9 PM</p>
            <p className="text-sm font-bold text-emerald-800 pt-1">+91 98200 12345</p>
            <p className="text-xs text-stone-600">+91 22 2430 9876 (Landline)</p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-950">Email Support</h3>
            <p className="text-xs text-stone-500">Fast 2-hour response time</p>
            <p className="text-sm font-bold text-amber-900 pt-1">support@ecoganpati.in</p>
            <p className="text-xs text-stone-600">orders@ecobappa.com</p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0 border border-orange-200">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-950">Studio & Workshop</h3>
            <p className="text-xs text-stone-500">Visit & witness clay sculpting</p>
            <p className="text-xs font-semibold text-stone-800 pt-1">
              Plot 42, Artisan Lane, Near Sena Bhavan, Dadar West, Mumbai, Maharashtra 400028
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Contact Form & Google Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-950">
              Send us a Message
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Our team will get back to you with guidance and order support.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-emerald-950 text-base">
                Message Received with Reverence!
              </h3>
              <p className="text-xs text-emerald-800">
                Thank you for reaching out. An eco-specialist from our Dadar studio will connect with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-emerald-900 underline"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditi Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aditi@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Topic of Inquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="Idol Inquiry">Idol Selection & Sizes</option>
                    <option value="Home Visarjan">Home Visarjan / Bucket Dissolution</option>
                    <option value="Bulk Order">Housing Society / Bulk Booking</option>
                    <option value="Packaging & Delivery">Safe Wooden Crate Delivery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Message / Specific Dimensions <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what size, posture, or delivery dates you need..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-105 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Google Map Section */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-950">
                Workshop & Studio Location
              </h2>
              <p className="text-xs text-stone-500">Dadar West, Mumbai (Near Shivaji Park & Sena Bhavan)</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Open Daily
            </span>
          </div>

          {/* Map Preview Container */}
          <div className="relative rounded-xl overflow-hidden border border-stone-300 aspect-16/10 bg-stone-100 shadow-inner">
            {/* Embedded Google Maps iFrame for Dadar, Mumbai */}
            <iframe
              title="Eco Ganesh Studio Google Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15088.139682570023!2d72.82885938472506!3d19.018151978255957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced4903e6205%3A0xbcae03be81a28a2b!2sDadar%20West%2C%20Dadar%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full grayscale-20 hover:grayscale-0 transition-all"
            />
          </div>

          {/* Directions and Visiting Tips */}
          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-amber-950 font-bold">
              <span>Visiting Instructions:</span>
              <span className="text-emerald-700">9:00 AM – 8:00 PM</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Located 5 minutes walk from Dadar Central & Western Railway stations. Free parking available for idol pickup. You can touch and inspect unbaked Shadu clay idols before ordering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
