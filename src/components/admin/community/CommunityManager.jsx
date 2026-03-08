import React, { useState, useEffect, useMemo } from 'react';
import { Search, MessageSquare, Trash2, RefreshCcw, Heart, Users, LayoutGrid, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import adminService from '../../../services/adminService';
import PostAdminCard from './PostAdminCard';
import toast from 'react-hot-toast';

const CommunityManager = () => {
    const { isDarkMode } = useAdminTheme();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await adminService.getAllPosts();
            if (response && response.succeeded && Array.isArray(response.data)) {
                setPosts(response.data);
            } else if (Array.isArray(response)) {
                setPosts(response);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error("Failed to fetch community posts:", error);
            toast.error("Failed to load community posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const stats = useMemo(() => {
        const totalLikes = posts.reduce((sum, p) => sum + p.likesCount, 0);
        const totalComments = posts.reduce((sum, p) => sum + p.commentsCount, 0);
        return [
            { label: 'Posts', value: posts.length, icon: MessageSquare, color: 'text-blue-500' },
            { label: 'Interactions', value: totalLikes, icon: Heart, color: 'text-red-500' },
            { label: 'Comments', value: totalComments, icon: MessageCircle, color: 'text-purple-500' },
        ];
    }, [posts]);

    const filteredPosts = posts.filter(post => 
        post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20 max-w-7xl mx-auto">
            {/* Simple Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                        <LayoutGrid className="text-white" size={20} />
                    </div>
                    <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Community <span className="text-primary font-medium italic lowercase">manager</span>
                    </h1>
                </div>
                
                <button 
                    onClick={fetchPosts}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all font-bold text-sm
                        ${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 shadow-sm'}`}
                >
                    <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {/* Clean Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`p-5 rounded-3xl border flex items-center gap-4 transition-all
                            ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-slate-100 shadow-sm'}`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                            <stat.icon size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="text-xl font-black text-slate-800 dark:text-white leading-none">{stat.value}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Search Bar - Not Sticky */}
            <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search posts, doctors, or topics..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-14 pr-6 py-4 rounded-3xl border-2 outline-none transition-all font-bold
                        ${isDarkMode 
                            ? 'bg-slate-800 border-slate-700 text-white focus:border-primary/50' 
                            : 'bg-white border-slate-100 text-slate-800 focus:border-primary/30 shadow-sm focus:shadow-md'}`}
                />
            </div>

            {/* Post Feed */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic animate-pulse">Syncing Feed...</p>
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-32 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
                    <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
                    <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No content found</h3>
                    <p className="text-sm text-slate-400 font-medium italic">Adjust your filters to see more results</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredPosts.map(post => (
                            <PostAdminCard 
                                key={post.postId} 
                                post={post} 
                                onDelete={(postId) => setPosts(prev => prev.filter(p => p.postId !== postId))} 
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default CommunityManager;
