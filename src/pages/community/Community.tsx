import React, { useState, useEffect, useCallback } from 'react';
import CreatePost from '../../components/community/CreatePost';
import PostCard from '../../components/community/PostCard';
import { FaSearch, FaUsers, FaHashtag, FaChartLine, FaBolt } from 'react-icons/fa';
import api from '../../services/api';
import { parseJwt } from '../../utils/jwt';

interface Post {
  postId: number;
  doctorName: string;
  doctorImage: string | null;
  specialization: string;
  createdAt: string;
  content: string;
  imagePost: string | null;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

function getCurrentUserName(): string {
  const userRaw = localStorage.getItem('thyrocarex_user');
  if (!userRaw) return 'D';
  const u = JSON.parse(userRaw);
  if (u?.token) {
    const decoded = parseJwt(u.token);
    return decoded?.UserName || decoded?.userName || 'D';
  }
  return 'D';
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const displayName = getCurrentUserName();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/Community/Display-All-Posts');
      if (res.data?.succeeded) {
        setPosts(res.data.data || []);
        setFilteredPosts(res.data.data || []);
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filter posts based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredPosts(
        posts.filter(
          (p) =>
            p.content.toLowerCase().includes(q) ||
            p.doctorName.toLowerCase().includes(q) ||
            p.specialization.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, posts]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostDeleted = (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.postId !== postId));
    setFilteredPosts((prev) => prev.filter((p) => p.postId !== postId));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-primary/10 p-1 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Dr. {displayName}</h2>
                <p className="text-sm text-gray-500 font-medium">Medical Community</p>

                <div className="w-full mt-6 pt-6 border-t border-gray-50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Posts</span>
                    <span className="text-primary font-bold">{posts.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-4 px-2">Community Explorer</h3>
              <nav className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium">
                  <FaUsers className="w-4 h-4" /><span>Medical Feed</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <FaHashtag className="w-4 h-4" /><span>Trending Topics</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <FaBolt className="w-4 h-4" /><span>Research Hub</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Mobile header */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <FaUsers />
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search posts, doctors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            {/* Create Post */}
            <CreatePost onPostCreated={handlePostCreated} />

            {/* Posts feed */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Loading posts...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <p className="text-red-500 text-sm">{error}</p>
                <button
                  onClick={fetchPosts}
                  className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primaryHover transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaUsers className="w-8 h-8 text-primary/50" />
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  {searchQuery ? 'No posts match your search.' : 'No posts yet. Be the first to share!'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.postId}
                    post={post}
                    onPostDeleted={handlePostDeleted}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-900">Community Stats</h3>
                <FaChartLine className="text-primary w-4 h-4" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Posts</span>
                  <span className="text-sm font-bold text-primary">{posts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Likes</span>
                  <span className="text-sm font-bold text-primary">
                    {posts.reduce((sum, p) => sum + p.likesCount, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Comments</span>
                  <span className="text-sm font-bold text-primary">
                    {posts.reduce((sum, p) => sum + p.commentsCount, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/10 shadow-sm p-6">
              <h3 className="text-base font-bold text-primary mb-2">Connect with Experts</h3>
              <p className="text-sm text-gray-600 mb-6">
                Join specialized groups and collaborate with doctors worldwide.
              </p>
              <button className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primaryHover transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20">
                Explore Groups
              </button>
            </div>

            <div className="px-4 py-2 flex flex-wrap gap-x-4 gap-y-2">
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Privacy</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">Terms</span>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">&copy; 2025 THYROCAREX</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;
