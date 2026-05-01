import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { logAppEvent } from '../firebase';

const faqs = [
  {
    question: "Do I need to bring ID to the polls?",
    answer: "In most states, yes. It's best to bring a valid, unexpired photo ID such as a driver's license or passport. If you don't have one, some states allow you to cast a provisional ballot."
  },
  {
    question: "How do I know if I'm registered?",
    answer: "You can check your voter registration status online through your state's official election website. It usually only takes a few minutes using your name and date of birth."
  },
  {
    question: "Can I vote by mail?",
    answer: "Yes, you can request an absentee or mail-in ballot. Make sure to check your state's deadline for requesting and returning the ballot, as they vary."
  },
  {
    question: "What happens if I make a mistake on my ballot?",
    answer: "If you are voting in person, you can ask a poll worker for a replacement ballot. If you are voting by mail, contact your local election office immediately for instructions."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening) {
      logAppEvent('faq_opened', { question: faqs[index].question });
    }
  };

  return (
    <div className="card">
      <h2 className="mb-4">Frequently Asked Questions</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div key={index} className={`accordion-item ${openIndex === index ? 'open' : ''}`}>
            <button 
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index}
            >
              {faq.question}
              <ChevronDown className="chevron" size={20} />
            </button>
            <div className="accordion-content">
              <p className="mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
