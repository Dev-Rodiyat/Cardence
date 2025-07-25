import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultUserData = {
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    position: '',
    avatar: '',
    links: [],
};

const CreateCard = () => {
    const { userData, setUserData } = useUser();
    const navigate = useNavigate();

    const LOCAL_KEY = "cardence-cards";

    //     useEffect(() => {
    //     resetUserData(); // optional reset when component mounts
    // }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const storedCards = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
        const newCard = { ...userData, id: crypto.randomUUID() };
        localStorage.setItem(LOCAL_KEY, JSON.stringify([...storedCards, newCard]));
        navigate('/my-cards');
        setUserData(defaultUserData);
        navigate('/my-cards');
        toast.success('Card created successfully!')
    };

    return (
        <section className="pt-24 pb-20 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 md:px-12 rounded-xl shadow-md">
                <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Create Your Digital Card</h1>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-sm">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={userData.title}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="Software Engineer"
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                    <label className="block mb-1 font-medium text-sm">Bio</label>
                    <textarea
                        name="bio"
                        rows="3"
                        value={userData.bio}
                        onChange={handleChange}
                        className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                        placeholder="Tell us about yourself..."
                    />
                </div>

                {/* Contact Section */}
                <h2 className="text-lg font-semibold mt-8 mb-3">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="johndoe@example.com"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="08012345678"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-sm">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="Lagos, Nigeria"
                        />
                    </div>
                </div>

                {/* Work Section */}
                <h2 className="text-lg font-semibold mt-8 mb-3">Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-sm">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={userData.company}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="Company Inc."
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={userData.position}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="Product Designer"
                        />
                    </div>
                </div>

                {/* Avatar + Links */}
                {/* <h2 className="text-lg font-semibold mt-8 mb-3">Avatar & Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-sm">Avatar URL</label>
                        <input
                            type="text"
                            name="avatar"
                            value={userData.avatar}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Links (comma-separated)</label>
                        <input
                            type="text"
                            name="links"
                            value={userData.links.join(', ')}
                            onChange={(e) =>
                                setUserData({ ...userData, links: e.target.value.split(',').map(link => link.trim()) })
                            }
                            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-gray-700"
                            placeholder="https://"
                        />
                    </div>
                </div> */}
                {/* Avatar + Links */}
                <h2 className="text-lg font-semibold mt-8 mb-3">Avatar & Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setUserData({ ...userData, avatar: reader.result });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }
                            }}
                            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
                        />
                        {userData.avatar && (
                            <div className="mt-3">
                                <img
                                    src={userData.avatar}
                                    alt="Avatar Preview"
                                    className="w-20 h-20 rounded-full object-cover border"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Links</label>
                        {userData.links.map((link, index) => (
                            <div key={index} className="flex items-center mb-2 gap-2">
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => {
                                        const updatedLinks = [...userData.links];
                                        updatedLinks[index] = e.target.value;
                                        setUserData({ ...userData, links: updatedLinks });
                                    }}
                                    className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
                                    placeholder="https://..."
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedLinks = userData.links.filter((_, i) => i !== index);
                                        setUserData({ ...userData, links: updatedLinks });
                                    }}
                                    className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => setUserData({ ...userData, links: [...userData.links, ''] })}
                            className="mt-2 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Add Link
                        </button>
                    </div>

                </div>

                <button
                    onClick={handleSave}
                    className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-200"
                >
                    Save Card
                </button>
            </div>
        </section>
    );
};

export default CreateCard;
