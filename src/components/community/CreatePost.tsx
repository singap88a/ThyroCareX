import React, { useState } from 'react';
import { FaImage, FaPaperPlane, FaSmile } from 'react-icons/fa';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit post
    console.log('Post submitted:', content, image);
    setContent('');
    setImage(null);
  };

  return (
    <div className="p-4 mb-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary/80">
              <span className="font-bold">D</span>
            </div>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 transition-all duration-300 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 resize-none min-h-[100px] text-gray-700 placeholder-gray-400"
              placeholder="Share your medical insights or updates..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-50">
          <div className="flex items-center space-x-2">
            <label className="flex items-center px-4 py-2 space-x-2 transition-all duration-300 rounded-lg cursor-pointer text-primary bg-primary/5 hover:bg-primary/10">
              <FaImage className="w-4 h-4" />
              <span className="text-sm font-medium">Photo</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>
            <button type="button" className="p-2 transition-all duration-300 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/5">
              <FaSmile className="w-5 h-5" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!content.trim() && !image}
            className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md ${
              content.trim() || image 
                ? "bg-primary text-white hover:bg-primaryHover hover:shadow-lg" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaPaperPlane className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>
        
        {image && (
          <div className="relative inline-block mt-3 bg-gray-100 rounded-xl overflow-hidden">
            <img 
              src={URL.createObjectURL(image)} 
              alt="Preview" 
              className="max-h-48 object-cover rounded-xl"
            />
            <button 
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-gray-900/50 text-white rounded-full hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
