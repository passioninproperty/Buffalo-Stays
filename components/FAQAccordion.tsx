"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the deposit policy?",
    answer:
      "A standard security deposit equivalent to one month's rent is required to secure your booking. This deposit is fully refundable at the end of your stay, provided the property is returned in its original condition.",
  },
  {
    question: "How do I extend my stay?",
    answer:
      "We offer flexible rolling contracts. If you wish to extend your stay, simply contact your dedicated host via WhatsApp at least 14 days before your original checkout date, and we will happily arrange the extension.",
  },
  {
    question: "Are bills included in the monthly rate?",
    answer:
      "Yes, all bills including water, electricity, heating, and enterprise-grade internet are fully integrated into your single monthly payment. There are no hidden fees.",
  },
  {
    question: "What happens if I need to cancel my booking?",
    answer:
      "For long-term stays, we offer a flexible cancellation policy. Cancellations made at least 30 days prior to check-in receive a full refund. Please refer to your specific booking agreement for detailed terms.",
  },
  {
    question: "Do you offer cleaning services during the stay?",
    answer:
      "Yes! A weekly housekeeping service is included in your stay. This includes fresh linens, towels, and a thorough cleaning of the living spaces to ensure your continuous comfort.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`border border-black/5 rounded-2xl overflow-hidden transition-all duration-300 ${
            openIndex === index ? "bg-white shadow-md" : "bg-[#F9F7F3] hover:bg-white/50"
          }`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3]"
          >
            <span className="font-bold text-[#2D3142] text-lg pr-8">{faq.question}</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-in-out ${
                openIndex === index ? "bg-[#E07A5F] text-white rotate-180" : "bg-[#2D3142]/5 text-[#2D3142]"
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </button>
          
          <div
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-[#2D3142]/80 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
