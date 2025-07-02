import React, { useState } from 'react';
import styles from './Post.module.css';
import Comment from '../Comment/Comment';
import Button from '../ui/Button/Button';

const Post = ({ post, onLike, onComment }) => {
    const [commentText, setCommentText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            onComment(commentText);
            setCommentText('');
        }
    };

    return (
        <div className={styles.postCard}>
            <div className={styles.postHeader}>
                <div className={styles.userAvatar}>
                    {post.user.avatar || post.user.name.charAt(0)}
                </div>
                <div>
                    <div className={styles.userName}>{post.user.name}</div>
                    <div className={styles.postTime}>{post.time}</div>
                </div>
            </div>

            <div className={styles.postContent}>
                {post.content}
            </div>

            <div className={styles.postStats}>
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
            </div>

            <div className={styles.postActions}>
                <Button variant="text" onClick={onLike}>
                    👍 Like
                </Button>
                <Button variant="text" onClick={() => setIsExpanded(!isExpanded)}>
                    💬 Comment
                </Button>
            </div>

            {isExpanded && (
                <div className={styles.commentsSection}>
                    {post.comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))}

                    <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <Button type="submit" variant="primary">Post</Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Post;