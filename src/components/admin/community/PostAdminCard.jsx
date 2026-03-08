import React, { useState, useEffect } from 'react';
import { 
  Trash2, MessageSquare, Heart, Clock, User, 
  ChevronDown, ChevronUp, MessageCircle, ShieldCheck,
  MoreVertical, Share2, CornerDownRight, X, AlertCircle, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';
import adminService from '../../../services/adminService';
import DeleteConfirmationModal from '../../community/DeleteConfirmationModal';
import { toast } from 'react-hot-toast';

const BASE_URL = 'https://thyrocarex.runasp.net';

const PostAdminCard = ({ post, onDelete }) => {
  const { isDarkMode } = useAdminTheme();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: 'post', // 'post' or 'comment'
    data: null
  });

  const postImageUrl = post.imagePost
    ? (post.imagePost.startsWith('http') ? post.imagePost : `${BASE_URL}/${post.imagePost}`)
    : null;

  const doctorImageUrl = post.doctorImage
    ? (post.doctorImage.startsWith('http') ? post.doctorImage : `${BASE_URL}/${post.doctorImage}`)
    : null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const response = await adminService.getPostComments(post.postId);
      if (response && response.succeeded && Array.isArray(response.data)) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch comments for admin", error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const handleDeleteClick = (type, data) => {
    setDeleteModal({
      isOpen: true,
      type,
      data
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.type === 'post') {
      setDeletingPost(true);
      try {
        await adminService.deletePost(post.postId);
        toast.success("Post deleted");
        onDelete(post.postId);
      } catch (error) {
        toast.error("Failed to delete post");
      } finally {
        setDeletingPost(false);
        setDeleteModal({ ...deleteModal, isOpen: false });
      }
    } else {
      setDeletingCommentId(deleteModal.data.commentId);
      try {
        await adminService.deleteComment(deleteModal.data.commentId);
        toast.success("Comment deleted");
        setComments(prev => prev.filter(c => c.commentId !== deleteModal.data.commentId));
      } catch (error) {
        toast.error("Failed to delete comment");
      } finally {
        setDeletingCommentId(null);
        setDeleteModal({ ...deleteModal, isOpen: false });
      }
    }
  };

  return (
    <motion.div
      layout
      className={`relative overflow-hidden border transition-all duration-300 rounded-3xl shadow-sm mb-6
        ${isDarkMode 
          ? 'bg-admin-dark-card border-admin-dark-border text-admin-dark-text' 
          : 'bg-white border-slate-200 text-admin-light-text'}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    {doctorImageUrl ? (
                        <img 
                            src={doctorImageUrl} 
                            alt={post.doctorName} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                            {post.doctorName?.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className={`font-bold text-base leading-none mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Dr. {post.doctorName}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{post.specialization}</span>
                        <span className="text-[10px] text-slate-400 font-medium italic">{formatDate(post.createdAt)}</span>
                    </div>
                </div>
            </div>
            
            <button 
                onClick={() => handleDeleteClick('post')}
                className={`p-2.5 rounded-xl transition-all
                    ${isDarkMode ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
            >
                <Trash2 size={18} />
            </button>
        </div>

        {/* Content */}
        <div className="mb-4">
            <p className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {post.content}
            </p>
        </div>

        {/* Image - Forced Aspect Ratio */}
        {postImageUrl && (
            <div className="mb-4 overflow-hidden rounded-2xl aspect-video border border-slate-100 bg-slate-50">
                <img 
                    src={postImageUrl} 
                    alt="Post media" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
        )}

        {/* Stats & Actions */}
        <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400">
                <Heart size={16} className="text-red-500 fill-red-500" />
                <span className="text-xs font-bold">{post.likesCount}</span>
            </div>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 transition-colors
                ${showComments ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
            >
                <MessageCircle size={16} fill={showComments ? 'currentColor' : 'none'} />
                <span className="text-xs font-bold">{post.commentsCount}</span>
                {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
        </div>
      </div>

      {/* Simplified Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`border-t ${isDarkMode ? 'bg-black/10 border-slate-800' : 'bg-slate-50 border-slate-100'}`}
          >
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {loadingComments ? (
                <div className="flex items-center justify-center py-6">
                  <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : comments.length === 0 ? (
                <p className="text-center text-xs text-slate-400 font-bold italic py-4">No comments yet</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.commentId} className="flex gap-3 relative group">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                        {comment.doctorImage ? (
                            <img src={`${BASE_URL}/${comment.doctorImage}`} className="w-full h-full object-cover" alt="" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-primary">
                                {comment.doctorName?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className={`flex-1 p-3 rounded-2xl relative
                        ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-primary">Dr. {comment.doctorName}</span>
                            <button 
                                onClick={() => handleDeleteClick('comment', comment)}
                                className="text-slate-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {comment.content}
                        </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title={deleteModal.type === 'post' ? 'Delete Post?' : 'Delete Comment?'}
        message="Are you sure you want to remove this content? This action cannot be undone."
        isLoading={deletingPost || deletingCommentId !== null}
      />
    </motion.div>
  );
};

export default PostAdminCard;
