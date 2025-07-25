import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaTimes } from "react-icons/fa";

const LOCAL_KEY = "cardence-cards";

const MyCards = () => {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_KEY);
        if (stored) {
            setCards(JSON.parse(stored));
        }
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this card?");
        if (!confirmDelete) return;

        const updated = cards.filter((card) => card.id !== id);
        setCards(updated);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    };

    const filteredCards = cards.filter((card) =>
        [card.name, card.title, card.company]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (cards.length === 0) {
        return (
            <section className="pt-24 px-6 text-center text-gray-600 dark:text-gray-300">
                <h2 className="text-2xl font-bold mb-2">No cards found</h2>
                <p className="mb-4">You haven't saved any digital business cards yet.</p>
                <Link to="/create" className="text-blue-500 hover:underline">
                    Create your first card
                </Link>
            </section>
        );
    }

    return (
        <section className="pt-28 px-6 bg-gray-100 min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <section className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Saved Cards</h2>
                    <div className="relative w-full sm:max-w-sm">
                        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, title, or company"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white focus:outline-none"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </div>

                {filteredCards.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">No matching cards found.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                       {[...filteredCards].reverse().map((card) => (
                            <div
                                key={card.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow flex flex-col justify-between"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    {card?.avatar ? (
                                        <img
                                            src={card?.avatar}
                                            alt={card?.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {card?.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{card?.title}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                    {card?.bio?.length > 50 ? card.bio.slice(0, 75) + '...' : card.bio}
                                </p>

                                <ul className="space-y-1 text-sm mb-4">
                                    {card?.email && (
                                        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 truncate">
                                            <span className="font-medium">Email:</span>
                                            <a
                                                href={`mailto:${card.email}`}
                                                className="truncate hover:underline text-blue-600 dark:text-blue-400"
                                            >
                                                {card.email}
                                            </a>
                                        </li>
                                    )}

                                    {card?.location && (
                                        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 truncate">
                                            <span className="font-medium">Location:</span>
                                            <span className="truncate" title={card.location}>
                                                {card.location.length > 35 ? `${card.location.slice(0, 35)}...` : card.location}
                                            </span>
                                        </li>
                                    )}
                                </ul>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleDelete(card?.id)}
                                        className="text-red-500 text-sm hover:underline mt-auto"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => navigate(`/card/${card?.id}`)}
                                        className="text-blue-500 text-sm hover:underline mt-auto"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => navigate(`/edit/${card?.id}`)}
                                        className="text-orange-500 text-sm hover:underline mt-auto"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
};

export default MyCards;
