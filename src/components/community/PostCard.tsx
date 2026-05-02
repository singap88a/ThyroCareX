import React, { useState, useRef, useEffect } from 'react';
import {
  FaRegHeart, FaHeart, FaRegComment, FaShare,
  FaEllipsisH, FaTrash
} from 'react-icons/fa';
import api from '../../services/api';
import { parseJwt } from '../../utils/jwt';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const BASE_URL = 'https://thyrocarex.runasp.net';

interface Comment {
  commentId: number;
  doctorName: string;
  doctorImage: string | null;
  specialization: string;
  createdAt: string;
  content: string;
}

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

interface PostCardProps {
  post: Post;
  onPostDeleted: (postId: number) => void;
}

// format relative time
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}



function getCurrentUserName(): string {
  const userRaw = localStorage.getItem('thyrax_user');
  if (!userRaw) return '';
  const u = JSON.parse(userRaw);
  if (u?.token) {
    const decoded = parseJwt(u.token);
    return decoded?.UserName || decoded?.userName || '';
  }
  return '';
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostDeleted }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [commentText, setCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const currentUser = getCurrentUserName();
  const isOwner = currentUser === post.doctorName;

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load comments when section opens
  useEffect(() => {
    if (!showComments) return;
    fetchComments();
  }, [showComments]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await api.get(`/Community/PostId:${post.postId}/comments`);
      if (res.data?.succeeded) {
        setComments(res.data.data || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    // Optimistic update
    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      const formData = new FormData();
      formData.append('PostId', String(post.postId));
      await api.post('/Community/Add-Post-Like', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch {
      // Revert on failure
      setIsLiked(wasLiked);
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submittingComment) return;
    setSubmittingComment(true);
    try {
      const formData = new FormData();
      formData.append('PostId', String(post.postId));
      formData.append('Content', commentText);
      const res = await api.post('/Community/Add-Comment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.succeeded) {
        setCommentText('');
        setCommentsCount(prev => prev + 1);
        await fetchComments();
      }
    } catch {
      // silently fail
    } finally {
      setSubmittingComment(false);
    }
  };

  const openDeletePostModal = () => {
    setModalConfig({
      title: 'Delete Post?',
      message: 'Are you sure you want to delete this post? This action cannot be undone.',
      onConfirm: handleDeletePost,
    });
    setModalOpen(true);
    setShowMenu(false);
  };

  const handleDeletePost = async () => {
    setDeleting(true);
    try {
      await api.delete(`/Community/post/${post.postId}`);
      onPostDeleted(post.postId);
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to delete post", error);
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteCommentModal = (commentId: number) => {
    setModalConfig({
      title: 'Delete Comment?',
      message: 'Are you sure you want to delete this comment? This action cannot be undone.',
      onConfirm: () => handleDeleteComment(commentId),
    });
    setModalOpen(true);
  };

  const handleDeleteComment = async (commentId: number) => {
    setDeleting(true);
    try {
      await api.delete('/Community/DeleteComment', {
        params: { CommentId: commentId }
      });
      // Refresh comments after deletion
      await fetchComments();
      setCommentsCount(prev => Math.max(0, prev - 1));
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to delete comment", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/community`;
    const shareText = `Check out this post by Dr. ${post.doctorName}: "${post.content.substring(0, 100)}..."`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Thyrax Community Post', text: shareText, url: shareUrl });
      } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      } catch { /* fallback */ }
    }
  };

  const avatarUrl = (imgPath: string | null) =>
    imgPath ? (imgPath.startsWith('http') ? imgPath : `${BASE_URL}/${imgPath}`) : null;

  const postImageUrl = post.imagePost
    ? (post.imagePost.startsWith('http') ? post.imagePost : `${BASE_URL}/${post.imagePost}`)
    : null;

  return (
    <div className="mb-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-300 hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {avatarUrl(post.doctorImage) ? (
              <img
                src={avatarUrl(post.doctorImage)!}
                alt={post.doctorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary/10 border-2 border-primary/30">
                <span className="font-bold text-primary">{post.doctorName.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer">
              Dr. {post.doctorName}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {post.specialization} &bull; {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Three-dot menu — only for post owner */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
          >
            <FaEllipsisH className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-9 z-30 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-fade-in">
              {isOwner && (
                <button
                  onClick={openDeletePostModal}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                  <span>Delete Post</span>
                </button>
              )}
              <button
                onClick={() => { handleShare(); setShowMenu(false); }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FaShare className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Image */}
      {postImageUrl && (
        <div className="relative mt-2 overflow-hidden bg-gray-100">
          <img
            src={postImageUrl}
            alt="Post content"
            className="w-full max-h-[500px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-50">
        <div className="flex items-center space-x-1">
          <div className="flex items-center justify-center w-5 h-5 bg-primary/10 rounded-full text-[10px] text-primary">
            <FaHeart />
          </div>
          <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="hover:underline cursor-pointer"
        >
          {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
        </button>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-2 py-1 mx-2 mb-1 border-t border-gray-50">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className={`flex items-center justify-center flex-1 py-2 space-x-2 rounded-lg transition-all duration-300 ${
            isLiked ? 'text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {isLiked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
          <span className="text-sm font-medium">Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center flex-1 py-2 space-x-2 rounded-lg transition-all duration-300 ${
            showComments ? 'text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <FaRegComment className="w-4 h-4" />
          <span className="text-sm font-medium">Comment</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center flex-1 py-2 space-x-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
        >
          <FaShare className="w-4 h-4" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="px-4 pb-4 bg-gray-50/50 border-t border-gray-50 pt-4 animate-fade-in">
          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-bold text-primary">{currentUser.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={submittingComment}
                className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!commentText.trim() || submittingComment}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  commentText.trim() && !submittingComment ? 'text-primary hover:bg-primary/10' : 'text-gray-300'
                }`}
              >
                <FaShare className="w-3 h-3 rotate-[-45deg]" />
              </button>
            </div>
          </form>

          {/* Comment List */}
          {loadingComments ? (
            <div className="flex items-center justify-center py-6">
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
              {comments.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-4">No comments yet. Be the first!</p>
              ) : (
                comments.map((comment) => {
                  const commentAvatar = avatarUrl(comment.doctorImage);
                  return (
                    <div key={comment.commentId} className="flex space-x-3">
                      <div className="flex-shrink-0 pt-1">
                        {commentAvatar ? (
                          <img src={commentAvatar} alt={comment.doctorName} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                        ) : (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-200">
                            <span className="text-xs font-bold text-gray-400">{comment.doctorName.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative group/comment">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-gray-900">Dr. {comment.doctorName}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] text-gray-400">{timeAgo(comment.createdAt)}</span>
                            {currentUser === comment.doctorName && (
                              <button
                                onClick={() => openDeleteCommentModal(comment.commentId)}
                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover/comment:opacity-100 transition-all p-1"
                                title="Delete comment"
                              >
                                <FaTrash className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mb-1">{comment.specialization}</p>
                        <p className="text-sm text-gray-800 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}
      
      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        isLoading={deleting}
      />
    </div>
  );
};

export default PostCard;
