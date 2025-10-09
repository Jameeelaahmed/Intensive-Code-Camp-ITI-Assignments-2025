import React, { useState, useEffect, useRef } from 'react';
import styles from './Post.module.css';
import Button from '../ui/Button/Button';
import Comment from '../Comment/Comment';
import { Dropdown, DropdownItem } from '../ui/Dropdown/Dropdown';
import ConfirmModal from '../ui/ConfirmModal/ConfirmModal';

import { useAuth } from '../../hooks/useAuth';
import {
    addComment,
    getCommentsWithReplies,
    toggleCommentLike,
    addReplyToComment,
    updatePost,
    deletePost
} from '../../services/postService';

const Post = ({ post, onLike, onComment, onPostUpdate, onPostDelete }) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [loadingComments, setLoadingComments] = useState(false);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content || '');
    const { currentUser } = useAuth();

    const confirmModalRef = useRef();

    useEffect(() => {
        const loadCommentsEffect = async () => {
            if (showComments && post.id) {
                try {
                    setLoadingComments(true);
                    const fetchedComments = await getCommentsWithReplies(post.id);
                    setComments(fetchedComments);
                } catch (error) {
                    console.error('Error loading comments:', error);
                } finally {
                    setLoadingComments(false);
                }
            }
        };

        loadCommentsEffect();
    }, [showComments, post.id]);

    const loadComments = async () => {
        try {
            setLoadingComments(true);
            const fetchedComments = await getCommentsWithReplies(post.id);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error loading comments:', error);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) {
            console.warn('Invalid Input: Please enter a comment');
            return;
        }

        if (!currentUser) {
            console.warn('Authentication Required: Please log in to comment');
            return;
        }

        if (!post.id) {
            console.error('Post ID is missing:', post);
            console.error('Error: Cannot add comment: Post ID is missing');
            return;
        }

        console.log('Submitting comment:', {
            postId: post.id,
            commentText: commentText.trim(),
            currentUser: {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName
            }
        });

        setIsSubmittingComment(true);
        try {
            const commentData = {
                content: commentText.trim(),
                postId: post.id,
                authorId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous'
            };

            console.log('Comment data being sent:', commentData);
            const commentId = await addComment(post.id, commentData);
            console.log('Comment successfully added with ID:', commentId);

            setCommentText('');

            if (showComments) {
                await loadComments();
            }
            onComment && onComment(commentText.trim());
        } catch (error) {
            console.error('Detailed error submitting comment:', {
                error: error,
                message: error.message,
                code: error.code,
                stack: error.stack
            });
            console.error('Comment Failed', `Failed to post comment: ${error.message || 'Unknown error'}`);
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleCommentLike = async (commentId) => {
        if (!currentUser) return;

        try {
            await toggleCommentLike(commentId, currentUser.uid);
            await loadComments();
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleReply = async (parentCommentId, replyContent) => {
        if (!currentUser) return;

        try {
            const replyData = {
                content: replyContent,
                postId: post.id,
                authorId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous'
            };

            await addReplyToComment(parentCommentId, replyData);
            await loadComments();
        } catch (error) {
            console.error('Error adding reply:', error);
            throw error;
        }
    };

    const toggleCommentsVisibility = () => {
        setShowComments(!showComments);
    };

    const handleEditPost = async () => {
        if (!editedContent.trim()) {
            console.warn('Invalid Content: Post content cannot be empty');
            return;
        }

        try {
            await updatePost(post.id, { content: editedContent.trim() });
            setIsEditing(false);
            onPostUpdate && onPostUpdate(post.id, { content: editedContent.trim() });
            console.log('Success! Post updated successfully');
        } catch (error) {
            console.error('Error updating post:', error);
            console.error('Update Failed:', error.message || 'Failed to update post');
        }
    };

    const handleDeletePost = async () => {
        confirmModalRef.current?.open(
            async () => {
                try {
                    await deletePost(post.id);
                    onPostDelete && onPostDelete(post.id);
                    console.log('Deleted: Post deleted successfully');
                } catch (error) {
                    console.error('Error deleting post:', error);
                    console.error('Delete Failed:', error.message || 'Failed to delete post');
                }
            }
        );
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(post.content || '');
    };

    const handleCommentUpdate = async (commentId, updateData) => {
        try {
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId
                        ? { ...comment, ...updateData }
                        : comment
                )
            );
        } catch (error) {
            console.error('Error updating comment in UI:', error);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            console.log('🗑️ Handling comment deletion in UI for commentId:', commentId);

            setComments(prevComments => {
                const removeCommentAndReplies = (comments, idToRemove) => {
                    return comments.filter(comment => {
                        // Remove the comment itself
                        if (comment.id === idToRemove) {
                            return false;
                        }
                        // Remove any replies to this comment
                        if (comment.replies) {
                            comment.replies = removeCommentAndReplies(comment.replies, idToRemove);
                        }
                        return true;
                    });
                };

                return removeCommentAndReplies(prevComments, commentId);
            });

            setTimeout(() => {
                loadComments();
            }, 500);
        } catch (error) {
            console.error('Error removing comment from UI:', error);
        }
    };

    const isOwner = currentUser && currentUser.uid === post.authorId;

    return (
        <div className={styles.postCard}>
            <div className={styles.postHeader}>
                <div className={styles.userAvatar}>
                    {post.user.name.charAt(0)}
                </div>
                <div>
                    <div className={styles.userName}>{post.user.name}</div>
                    <div className={styles.postTime}>{post.time}</div>
                </div>
            </div>

            <div className={styles.postContent}>
                {isEditing ? (
                    <div className={styles.editPost}>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className={styles.editTextarea}
                        />
                        <div className={styles.editActions}>
                            <Button onClick={handleEditPost} disabled={isSubmittingComment}>
                                {isSubmittingComment ? 'Saving...' : 'Save'}
                            </Button>
                            <Button onClick={handleCancelEdit} variant="text">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>{post.content}</div>
                )}
            </div>

            <div className={styles.postStats}>
                <span>{post.likes} likes</span>
                <span>{post.commentsCount || 0} comments</span>
            </div>

            <div className={styles.postActions}>
                <Button variant="text" onClick={onLike}>
                    👍 Like
                </Button>
                <Button variant="text" onClick={toggleCommentsVisibility}>
                    💬 {showComments ? 'Hide Comments' : 'Comment'}
                </Button>
                <Button variant="text">
                    ↗️ Share
                </Button>
                {isOwner && (
                    <Dropdown trigger={<span>⋮</span>} position="right">
                        <DropdownItem onClick={() => setIsEditing(true)}>
                            ✏️ Edit Post
                        </DropdownItem>
                        <DropdownItem onClick={handleDeletePost} variant="danger">
                            🗑️ Delete Post
                        </DropdownItem>
                    </Dropdown>
                )}
            </div>

            {showComments && (
                <div className={styles.commentsSection}>
                    <div className={styles.addComment}>
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className={styles.commentInput}
                            disabled={isSubmittingComment}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleCommentSubmit();
                                }
                            }}
                        />
                        <Button
                            variant="text"
                            onClick={handleCommentSubmit}
                            disabled={!commentText.trim() || isSubmittingComment}
                        >
                            {isSubmittingComment ? 'Posting...' : 'Post'}
                        </Button>
                    </div>

                    <div className={styles.commentsList}>
                        {loadingComments ? (
                            <div className={styles.loadingText}>Loading comments...</div>
                        ) : comments.length > 0 ? (
                            comments.map(comment => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    onReply={handleReply}
                                    onLike={handleCommentLike}
                                    onCommentUpdate={handleCommentUpdate}
                                    onCommentDelete={handleCommentDelete}
                                />
                            ))
                        ) : (
                            <div className={styles.noComments}>No comments yet. Be the first to comment!</div>
                        )}
                    </div>
                </div>
            )}

            <ConfirmModal
                ref={confirmModalRef}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone and will also delete all comments."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default Post;