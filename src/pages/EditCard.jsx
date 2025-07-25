import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const LOCAL_KEY = 'cardence-cards';

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    phone: '',
    email: '',
    company: '',
    position: '',
    location: '',
    avatar: '',
    links: [''],
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    const found = stored.find((item) => item.id === id);
    if (found) setForm(found);
    else navigate('/my-cards');
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index, value) => {
    const updated = [...form.links];
    updated[index] = value;
    setForm({ ...form, links: updated });
  };

  const handleAddLink = () => {
    setForm({ ...form, links: [...form.links, ''] });
  };

  const handleRemoveLink = (index) => {
    const updated = form.links.filter((_, i) => i !== index);
    setForm({ ...form, links: updated });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, avatar: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    const updated = stored.map((item) => (item.id === id ? form : item));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    toast.success('Card edited successfully!')
    navigate(-1);
  };

  return (
    <section className="min-h-screen px-6 py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold mb-2">Edit Card</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          {form.avatar ? (
            <img src={form.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-2" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mb-2" />
          )}
          <input type="file" accept="image/*" onChange={handleAvatarUpload} className="text-sm" />
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input" />
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="input" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="input" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="input" />
          <input name="position" placeholder="Position" value={form.position} onChange={handleChange} className="input" />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="input" />
        </div>

        {/* Bio */}
        <textarea
          name="bio"
          placeholder="Short bio..."
          value={form.bio}
          onChange={handleChange}
          rows={4}
          className="w-full input"
        />

        {/* Links */}
        <div className="space-y-2">
          <p className="font-semibold text-sm">Links</p>
          {form.links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="https://..."
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className="input flex-1"
              />
              <button
                onClick={() => handleRemoveLink(index)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleAddLink}
            className="text-sm text-blue-500 hover:underline"
          >
            + Add Link
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary">Save</button>
        </div>
      </div>
    </section>
  );
};

export default EditCard;
