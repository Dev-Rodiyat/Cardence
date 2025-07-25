import { motion } from 'framer-motion';
import { FaIdBadge, FaShareAlt, FaUserShield } from 'react-icons/fa';
import CARD from './../assets/card.png'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <section className="min-h-[70vh] px-6 pt-10 bg-gray-100 dark:bg-gray-900 flex items-center text-gray-900 dark:text-white">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto h-full">

                    {/* Left: Text */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold mb-4"
                        >
                            Your Identity. Simplified.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0 mb-6"
                        >
                            Cardence is your modern digital business card – share who you are with a single link.
                        </motion.p>

                        <Link
                            to="/create"
                            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
                        >
                            Get Started
                        </Link>
                    </div>

                    <div className="flex-1 md:max-w-xl w-full">
                        <img
                            src={CARD}
                            alt="Card illustration"
                            className="w-full h-auto max-h-[500px] object-contain rounded-full"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 text-center bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
                <h2 className="text-3xl font-bold mb-10">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                    {[
                        {
                            title: 'Create Your Card',
                            desc: 'Customize your profile with your info, links, and branding.',
                            icon: <FaIdBadge size={32} />,
                        },
                        {
                            title: 'Share Anywhere',
                            desc: 'Send your card via QR code or shareable link.',
                            icon: <FaShareAlt size={32} />,
                        },
                        {
                            title: 'Stay in Control',
                            desc: 'Edit your card anytime. Always up-to-date.',
                            icon: <FaUserShield size={32} />,
                        },
                    ].map(({ title, desc, icon }, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg transition-colors duration-300"
                        >
                            <div className="mb-4 text-blue-500 dark:text-blue-400">{icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* <section className="max-w-5xl mx-auto mb-20">
                <h2 className="text-2xl font-semibold mb-6">Why Choose Cardence?</h2>
                <ul className="grid gap-6 md:grid-cols-2">
                    {[
                        "Share with a single link",
                        "Customizable profiles",
                        "Works across all devices",
                        "Privacy-first design",
                    ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded shadow">
                            <FaCheckCircle className="text-blue-500 mt-1" />
                            <span className="text-gray-800 dark:text-gray-200">{feature}</span>
                        </li>
                    ))}
                </ul>
            </section> */}

            {/* Features */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Cardence?</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {[
                        {
                            title: 'Theme Customization',
                            desc: 'Personalize your card with dark/light themes and styles that match your brand.',
                            direction: -40,
                        },
                        {
                            title: 'QR & Shareable Links',
                            desc: 'Instantly share your profile with a scannable code or custom link.',
                            direction: 40,
                        },
                        {
                            title: 'Mobile-Friendly',
                            desc: 'Built for mobile-first networking – perfect for conferences and quick intros.',
                            direction: -40,
                        },
                        {
                            title: 'Always Editable',
                            desc: 'Keep your info fresh with easy updates from your dashboard.',
                            direction: 40,
                        },
                    ].map(({ title, desc, direction }, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: direction }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className='flex items-center justify-center pb-12'>
                <Link to='/about'>
                    <button className="inline-flex items-center px-5 py-3 text-sm font-semibold dark:text-white border border-blue-600 hover:bg-blue-200 hover:text-black rounded-full shadow transition duration-300">
                        Read about our mission...
                    </button>
                </Link>
            </div>

            {/* CTA */}
            <section className="py-20 bg-blue-600 text-center text-white px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start building your digital card today</h2>
                <p className="mb-6 text-blue-100">No printing, no hassle. Just a smarter way to share who you are.</p>
                <a
                    href="/create"
                    className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
                >
                    Create Your Card
                </a>
            </section>
        </main>
    );
};

export default Home;
