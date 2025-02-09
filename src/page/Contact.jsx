import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaPinterest } from "react-icons/fa";
import { IoIosFlower } from "react-icons/io";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9+-]+$/, "Invalid phone number"),
  subject: yup.string().required("Please select a subject"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters")
});

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-heading font-heading text-foreground mb-8 flex items-center">
                <IoIosFlower className="text-primary mr-2" />
                Contact Us
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-accent mb-2">
                    <FaUser className="mr-2" /> Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-accent mb-2">
                    <FaEnvelope className="mr-2" /> Email Address
                  </label>
                  <input
                    {...register("email")}
                    className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-accent mb-2">
                    <FaPhone className="mr-2" /> Phone Number (Optional)
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-accent mb-2">
                    <IoIosFlower className="mr-2" /> Subject
                  </label>
                  <select
                    {...register("subject")}
                    className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="consultation">Orchid Care Consultation</option>
                    <option value="workshop">Workshop Registration</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-accent mb-2">
                    <IoIosFlower className="mr-2" /> Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                >
                  Send Message
                </button>

                {isSubmitted && (
                  <div className="bg-chart-2 text-white p-4 rounded-sm animate-fade-in">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-secondary p-8 rounded-sm">
              <h3 className="text-heading font-heading text-foreground mb-6">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Visit Us</h4>
                    <p className="text-accent">123 Orchid Gardens,<br />Botanical Street,<br />Garden City, GC 12345</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-accent">contact@orchidgarden.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Call Us</h4>
                    <p className="text-accent">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-accent hover:text-primary transition-colors">
                      <FaInstagram size={24} />
                    </a>
                    <a href="#" className="text-accent hover:text-primary transition-colors">
                      <FaFacebookF size={24} />
                    </a>
                    <a href="#" className="text-accent hover:text-primary transition-colors">
                      <FaPinterest size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;