import React, { useState, useRef } from 'react';
import { FaImage, FaPaperPlane, FaTimes } from 'react-icons/fa';
import api from '../../services/api';
import { parseJwt } from '../../utils/jwt';

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current user initial & name for avatar preview
  const userRaw = localStorage.getItem('thyrocarex_user');
  const currentUser = userRaw ? JSON.parse(userRaw) : null;
  let displayName = 'D';
  if (currentUser?.token) {
    const decoded = parseJwt(currentUser.token);
    displayName = decoded?.UserName || decoded?.userName || 'D';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('Content', content);
      if (image) {
        formData.append('ImagePost', image);
      }

      await api.post('/Community/Add-Post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setContent('');
      setImage(null);
      onPostCreated();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 mb-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary/80">
              <span className="font-bold">{displayName.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 transition-all duration-300 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 resize-none min-h-[100px] text-gray-700 placeholder-gray-400"
              placeholder="Share your medical insights or updates..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        {image && (
          <div className="relative inline-block mt-3 bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="max-h-48 object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              className="absolute top-2 right-2 p-1.5 bg-gray-900/60 text-white rounded-full hover:bg-gray-900 transition-colors"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-50">
          <div className="flex items-center space-x-2">
            <label className="flex items-center px-4 py-2 space-x-2 transition-all duration-300 rounded-lg cursor-pointer text-primary bg-primary/5 hover:bg-primary/10">
              <FaImage className="w-4 h-4" />
              <span className="text-sm font-medium">Photo</span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={(!content.trim() && !image) || submitting}
            className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md ${
              (content.trim() || image) && !submitting
                ? 'bg-primary text-white hover:bg-primaryHover hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaPaperPlane className="w-4 h-4" />
            <span>{submitting ? 'Posting...' : 'Post'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
