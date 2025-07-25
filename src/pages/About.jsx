import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus } from 'react-icons/fi';

const faqs = [
    {
        question: "What is Cardence?",
        answer: "Cardence is a digital business card platform that lets you share your identity and contact details with a single link."
    },
    {
        question: "How do I create my card?",
        answer: "Fill in the card details, and your card will be ready to share in minutes."
    },
    {
        question: "Is Cardence free?",
        answer: "Yes! We offer a free tier with all the core features."
    }
];

const About = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="px-6 py-12 text-gray-900 dark:text-white pt-28 bg-gray-100 dark:bg-gray-900">
            <section className="max-w-5xl mx-auto text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-4"
                >
                    About Cardence
                </motion.h1>
                <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Cardence is a modern digital business card platform designed to simplify personal and professional networking.
                </p>
            </section>

            {/* What is a Digital Business Card */}
            <section className="max-w-5xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold mb-4">What Is a Digital Business Card?</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    A <strong>digital business card</strong> is a modern, convenient, and eco-friendly alternative to traditional paper business cards.
                    It allows you to <strong>share your professional identity and contact information</strong> with anyone, anytime - all from your phone, computer, or a QR code.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Whether you're networking at an event, connecting online, or just want to make a great first impression, a digital business card lets you easily showcase:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-1">
                    <li>Your <strong>name and profession</strong></li>
                    <li>Your <strong>company or organization</strong></li>
                    <li>Your <strong>bio or personal summary</strong></li>
                    <li>Contact details like <strong>email</strong>, <strong>phone number</strong>, or <strong>location</strong></li>
                    <li>Links to your <strong>portfolio, LinkedIn, social media</strong>, and more</li>
                    <li>Your <strong>profile photo or avatar</strong></li>
                    <li>A <strong>QR code</strong> others can scan to instantly view your card</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Unlike paper cards, you can <strong>update your card anytime</strong> without reprinting, and share it in seconds via a link or QR code.
                    It's perfect for freelancers, professionals, students, entrepreneurs - <strong>anyone who wants to network smarter</strong>.
                </p>

                <h3 className="text-xl font-semibold mb-2">Why Use a Digital Business Card?</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-6">
                    <li>🌍 <strong>Eco-Friendly</strong> - No paper waste or printing costs</li>
                    <li>⚡ <strong>Instant Sharing</strong> - Send via link, email, or QR code</li>
                    <li>🔄 <strong>Editable Anytime</strong> - Update your info without reprinting</li>
                    <li>📱 <strong>Accessible Anywhere</strong> - Always available on your device</li>
                    <li>🧩 <strong>Customizable</strong> - Add links, images, and personal branding</li>
                </ul>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <em>Digital cards are the future of networking — and with platforms like <strong>Cardence</strong>, creating and sharing yours is effortless.</em>
                </p>
            </section>

            <section className="max-w-5xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our mission is to redefine how people connect by making digital identity simple, beautiful, and universally accessible.
                    With Cardence, you never have to worry about printing cards again.
                </p>
            </section>

            <section className="max-w-5xl mx-auto mb-8">
                <h2 className="text-2xl font-semibold mb-6">FAQs</h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;

                        return (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-800 p-4 rounded shadow"
                            >
                                <button
                                    onClick={() => toggleFAQ(i)}
                                    className="w-full flex items-center justify-between text-left font-medium text-lg focus:outline-none"
                                >
                                    <span>{faq.question}</span>
                                    {isOpen ? (
                                        <FiMinus className="text-blue-500 text-xl shrink-0" />
                                    ) : (
                                        <FiPlus className="text-blue-500 text-xl shrink-0" />
                                    )}
                                </button>

                                {isOpen && (
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};

export default About;

