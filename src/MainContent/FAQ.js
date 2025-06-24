import React, { useState, useRef, useEffect } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqRef = useRef(null);

  const faqs = [
    { question: "What services do you offer?", answer: "We provide various services including web development, mobile apps, and digital marketing." },
    { question: "How can I contact support?", answer: "You can contact us via email at support@example.com or call our helpline." },
    { question: "What are your working hours?", answer: "Our working hours are Monday to Friday, 9 AM to 6 PM." },
    { question: "Do you offer refunds?", answer: "Yes, we offer a 30-day money-back guarantee on all services." },
    { question: "How secure is my data?", answer: "We use state-of-the-art encryption to protect your data." },
    { question: "Can I request a custom service?", answer: "Yes, we offer customized solutions based on client needs." },
    { question: "How long does a project take?", answer: "Project timelines vary but typically range from 2 to 8 weeks." },
    { question: "What payment methods do you accept?", answer: "We accept credit/debit cards, PayPal, and bank transfers." }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (activeIndex !== null && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeIndex]);

  return (
    <div style={{ padding: "50px 20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Times New Roman" }}>
     <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px" }}>
  Frequently Asked Questions
</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {faqs.map((faq, index) => (
          <div key={index} ref={activeIndex === index ? faqRef : null} style={{ textAlign: "left" }}>
            <div
              onClick={() => toggleFAQ(index)}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: activeIndex === index ? "#007bff" : "#333"
              }}
            >
              {faq.question}
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div style={{ fontSize: "16px", padding: "10px", color: "#555", transition: "all 0.3s ease-in-out" }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
