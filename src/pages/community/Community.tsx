import React, { useState } from 'react';
import CreatePost from '../../components/community/CreatePost';
import PostCard from '../../components/community/PostCard';
import { FaSearch, FaUsers, FaHashtag, FaChartLine, FaBolt } from 'react-icons/fa';

const Community = () => {
  // Dummy data for posts
  const [posts] = useState([
    {
      id: 1,
      author: "Dr. Sarah Ahmed",
      role: "Endocrinologist",
      content: "Just observed a unique case of Hashimoto's thyroiditis with unusual presentation in a 25-year-old patient. The thyroid scans showed some interesting patterns that I'd like to discuss. Has anyone seen similar vascular patterns recently?",
      time: "2h ago",
      likes: 24,
      comments: 5,
      image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=2070",
    },
    {
      id: 2,
      author: "Dr. Michael Chen",
      role: "Radiologist",
      content: "Great news! Our AI diagnostic accuracy for thyroid nodules has reached 98% in our latest internal testing. This is a game-changer for early detection and treatment planning.",
      time: "5h ago",
      likes: 42,
      comments: 12,
    },
    {
      id: 3,
      author: "Dr. Elena Rodriguez",
      role: "General Surgeon",
      content: "Sharing an update on the latest minimally invasive thyroidectomy techniques. The recovery time is significantly reduced, and patient satisfaction is at an all-time high.",
      time: "1d ago",
      likes: 18,
      comments: 3,
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2070",
    }
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Navigation & Profile (Visible on LG) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-primary/10 p-1 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    D
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Dr. Singap</h2>
                <p className="text-sm text-gray-500 font-medium">Head Endocrinologist</p>
                
                <div className="w-full mt-6 pt-6 border-t border-gray-50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Post Views</span>
                    <span className="text-primary font-bold">1.2k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Connections</span>
                    <span className="text-primary font-bold">482</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-4 px-2">Community Explorer</h3>
              <nav className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium">
                  <FaUsers className="w-4 h-4" />
                  <span>Medical Feed</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <FaHashtag className="w-4 h-4" />
                  <span>Trending Topics</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <FaBolt className="w-4 h-4" />
                  <span>Research Hub</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content - Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header / Search (Mobile friendly) */}
            <div className="lg:hidden flex items-center justify-between mb-4">
               <h1 className="text-2xl font-bold text-gray-900">Community</h1>
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                 <FaUsers />
               </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="Search cases, doctors, or topics..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <CreatePost />

            <div className="space-y-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Suggestions & News */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-gray-900">Trending Now</h3>
                 <FaChartLine className="text-primary w-4 h-4" />
               </div>
               <div className="space-y-5">
                 {[
                   { tag: "#HashimotosInsights", posts: "24 post today" },
                   { tag: "#ThyroidAI", posts: "115 post this week" },
                   { tag: "#MinimallyInvasive", posts: "42 post today" }
                 ].map((trend, i) => (
                   <div key={i} className="group cursor-pointer">
                     <p className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">{trend.tag}</p>
                     <p className="text-xs text-gray-500 mt-0.5">{trend.posts}</p>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-6 py-2.5 text-sm font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
                 Show more
               </button>
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/10 shadow-sm p-6">
               <h3 className="text-base font-bold text-primary mb-2">Connect with Experts</h3>
               <p className="text-sm text-gray-600 mb-6">Join specialized groups and collaborate with doctors worldwide.</p>
               <button className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primaryHover transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20">
                 Explore Groups
               </button>
            </div>
            
            <div className="px-4 py-2 flex flex-wrap gap-x-4 gap-y-2">
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Privacy</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Terms</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Advertising</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">© 2025 THYROCAREX</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;
