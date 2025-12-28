import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaRegComment, FaShare, FaEllipsisH } from 'react-icons/fa';

interface PostProps {
  post: {
    id: number;
    author: string;
    role: string;
    avatar?: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    time: string;
  };
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: "Dr. James Wilson", role: "Oncologist", text: "Excellent observation, Sarah. I've seen similar patterns in a few cases recently.", time: "1h ago" },
    { id: 2, author: "Dr. Maria Garcia", role: "Endocrinologist", text: "The vascular pattern is indeed interesting. Looking forward to more details.", time: "30m ago" }
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: "Dr. Singap",
      role: "Head Endocrinologist",
      text: commentText,
      time: "Just now"
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div className="mb-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-300 hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {post.avatar ? (
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary/10 border-2 border-primary/30">
                <span className="font-bold text-primary">{post.author.charAt(0)}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 hover:text-primary transition-colors cursor-pointer">
              {post.author}
            </h3>
            <p className="text-xs text-gray-500 font-medium">{post.role} • {post.time}</p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
          <FaEllipsisH className="w-4 h-4" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative mt-2 overflow-hidden bg-gray-100">
          <img 
            src={post.image} 
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
          <span>{likesCount} likes</span>
        </div>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="hover:underline cursor-pointer"
        >
          {comments.length} comments
        </button>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-2 py-1 mx-2 mb-1 border-t border-gray-50">
        <button 
          onClick={handleLike}
          className={`flex items-center justify-center flex-1 py-2 space-x-2 rounded-lg transition-all duration-300 ${
            isLiked ? "text-primary bg-primary/5" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {isLiked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
          <span className="text-sm font-medium">Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center flex-1 py-2 space-x-2 rounded-lg transition-all duration-300 ${
            showComments ? "text-primary bg-primary/5" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <FaRegComment className="w-4 h-4" />
          <span className="text-sm font-medium">Comment</span>
        </button>
        <button className="flex items-center justify-center flex-1 py-2 space-x-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300">
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
                <span className="text-xs font-bold text-primary">A</span>
              </div>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button 
                type="submit"
                disabled={!commentText.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  commentText.trim() ? "text-primary hover:bg-primary/10" : "text-gray-300"
                }`}
              >
                <FaShare className="w-3 h-3 rotate-[-45deg]" />
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-shrink-0 pt-1">
                   <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-gray-100 border border-gray-200">
                    <span className="text-xs font-bold text-gray-400">{comment.author.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm relative group">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-gray-900">{comment.author}</h4>
                    <span className="text-[10px] text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium mb-1">{comment.role}</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
