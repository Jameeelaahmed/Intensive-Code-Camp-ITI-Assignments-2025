import { useState, useRef } from 'react';
import styles from './Comment.module.css';
import { useAuth } from '../../hooks/useAuth';
import { Dropdown, DropdownItem } from '../ui/Dropdown/Dropdown';
import ConfirmModal from '../ui/ConfirmModal/ConfirmModal';

import { formatTimestamp, updateComment, deleteComment } from '../../services/postService';

const Comment = ({
    comment,
    onReply,
    onLike,
    onCommentUpdate,
    onCommentDelete,
    level = 0
}) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content || '');
    const { currentUser } = useAuth();

    // Modal refs
    const confirmModalRef = useRef();


    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || !currentUser) return;

        setIsSubmitting(true);
        try {
            await onReply(comment.id, replyText.trim());
            setReplyText('');
            setIsReplying(false);
        } catch (error) {
            console.error('Error submitting reply:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = () => {
        if (!currentUser) {
            console.warn('Login Required: Please log in to like comments');
            return;
        }
        onLike && onLike(comment.id);
    };

    const handleEditComment = async () => {
        if (!editedContent.trim()) {
            console.warn('Invalid Content: Comment content cannot be empty');
            return;
        }

        try {
            await updateComment(comment.id, { content: editedContent.trim() });
            setIsEditing(false);
            onCommentUpdate && onCommentUpdate(comment.id, { content: editedContent.trim() });
            console.log('Updated! Comment updated successfully');
        } catch (error) {
            console.error('Error updating comment:', error);
            console.error('Update Failed:', error.message || 'Failed to update comment');
        }
    };

    const handleDeleteComment = async () => {
        confirmModalRef.current?.open(
            async () => {
                try {
                    await deleteComment(comment.id);
                    onCommentDelete && onCommentDelete(comment.id);
                    console.log('Deleted: Comment deleted successfully');
                } catch (error) {
                    console.error('Delete Failed:', error.message || 'Failed to delete comment');
                }
            }
        );
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(comment.content || '');
    };

    const isOwner = currentUser && currentUser.uid === comment.authorId;
    const isLiked = comment.likes && comment.likes.includes(currentUser?.uid);
    const likesCount = comment.likes ? comment.likes.length : 0;

    console.log('🔍 Comment ownership debug:', {
        commentId: comment.id,
        currentUserId: currentUser?.uid,
        commentAuthorId: comment.authorId,
        isOwner: isOwner,
        commentContent: comment.content?.substring(0, 20) + '...'
    });

    return (
        <div className={styles.comment}>
            <div className={styles.commentAvatar}>
                {comment.authorName ? comment.authorName.charAt(0).toUpperCase() : 'A'}
            </div>

            <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                    <span className={styles.commentUser}>
                        {comment.authorName || 'Anonymous'}
                    </span>
                    <span className={styles.commentTime}>
                        {formatTimestamp(comment.createdAt)}
                    </span>
                </div>

                {isEditing ? (
                    <div className={styles.commentEdit}>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className={styles.editTextarea}
                        />
                        <div className={styles.editActions}>
                            <button
                                onClick={handleEditComment}
                                className={styles.saveButton}
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.commentText}>
                        {comment.content}
                    </div>
                )}

                <div className={styles.commentActions}>
                    <button
                        className={`${styles.commentAction} ${isLiked ? styles.liked : ''}`}
                        onClick={handleLike}
                    >
                        👍 {likesCount > 0 && likesCount}
                    </button>

                    {level < 2 && ( // Limit nesting to 2 levels
                        <button
                            className={styles.commentAction}
                            onClick={() => setIsReplying(!isReplying)}
                        >
                            Reply
                        </button>
                    )}

                    {isOwner && !isEditing && (
                        <Dropdown trigger={<span>⋮</span>} position="right">
                            <DropdownItem onClick={() => setIsEditing(true)}>
                                ✏️ Edit
                            </DropdownItem>
                            <DropdownItem onClick={handleDeleteComment} variant="danger">
                                🗑️ Delete
                            </DropdownItem>
                        </Dropdown>
                    )}
                </div>

                {isReplying && (
                    <form onSubmit={handleReplySubmit} className={styles.replyInput}>
                        <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            disabled={!replyText.trim() || isSubmitting}
                        >
                            ➤
                        </button>
                    </form>
                )}

                {comment.replies && comment.replies.length > 0 && (
                    <div className={styles.replies}>
                        {comment.replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                onReply={onReply}
                                onLike={onLike}
                                onCommentUpdate={onCommentUpdate}
                                onCommentDelete={onCommentDelete}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
                ref={confirmModalRef}
                title="Delete Comment"
                message="Are you sure you want to delete this comment? This action cannot be undone and will also delete all replies."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
};

export default Comment;
