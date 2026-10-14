"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);

    event.currentTarget.reset();
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-600 to-indigo-700 px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Contact Us
          </p>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            We Would Love to
            <span className="block text-blue-200">Hear from You.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100">
            Have a question, suggestion, or feedback about SkyCast? Send us
            a message using the form below.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Get in Touch
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Let&apos;s Start a Conversation
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Your feedback helps us understand how we can make SkyCast more
              useful and easier to use.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Mail size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Email Support
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Use the contact form to send your questions and feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <MapPin size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Available Online
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Access the SkyCast website from your computer, tablet, or
                    mobile device.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <MessageCircle size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Feedback & Suggestions
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Share ideas that could improve your weather-checking
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <h2 className="text-2xl font-bold text-slate-900">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fill in the details below to prepare your message.
            </p>

            {submitted && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
              >
                <CheckCircle size={22} className="shrink-0" />

                <p className="text-sm leading-6">
                  Your form passed the client-side submission step. No
                  message has been sent yet because a backend submission
                  service has not been connected.
                </p>
              </div>
            )}

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  minLength={2}
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is your message about?"
                  required
                  minLength={3}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  minLength={10}
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
