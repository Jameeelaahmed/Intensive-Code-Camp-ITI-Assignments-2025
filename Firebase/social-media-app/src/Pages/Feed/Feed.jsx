import React, { useState, useEffect } from 'react';
import styles from './Feed.module.css';
import Post from '../../components/Post/Post';
import CreateEditPost from '../../components/CreateEditPost/CreateEditPost';

import { useAuth } from '../../hooks/useAuth';
import { createPost, getPosts, formatTimestamp, toggleLike, addComment } from '../../services/postService';

const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const fetchedPosts = await getPosts();
            const transformedPosts = fetchedPosts.map(post => ({
                ...post,
                time: formatTimestamp(post.createdAt),
                user: {
                    name: post.authorName || 'Anonymous',
                    avatar: post.authorAvatar || null
                },
                likes: post.likesCount || 0,
                comments: []
            }));
            setPosts(transformedPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (content) => {
        if (!currentUser) {
            console.warn('Authentication Required: Please log in to create a post');
            return;
        }

        try {
            const postData = {
                content,
                authorId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email,
                authorAvatar: currentUser.photoURL || null
            };

            await createPost(postData);
            // Reload posts to show the new post
            loadPosts();
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    const handleLike = async (postId) => {
        if (!currentUser) {
            alert('Please log in to like posts');
            return;
        }

        try {
            await toggleLike(postId, currentUser.uid);
            loadPosts();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleComment = async (postId, text) => {
        if (!currentUser) {
            console.warn('Authentication Required: Please log in to comment');
            return;
        }

        try {
            const commentData = {
                content: text,
                authorId: currentUser.uid,
                authorName: currentUser.displayName || currentUser.email,
                authorAvatar: currentUser.photoURL || null
            };

            await addComment(postId, commentData);
            loadPosts();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handlePostUpdate = async (postId, updateData) => {
        try {
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, ...updateData }
                        : post
                )
            );
        } catch (error) {
            console.error('Error updating post in UI:', error);
        }
    };

    const handlePostDelete = async (postId) => {
        try {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error removing post from UI:', error);
        }
    };

    return (
        <div className={styles.feedContainer}>

            <div className={styles.mainContent}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarItem}>🏠 Home</div>
                </div>

                <div className={styles.feed}>
                    <CreateEditPost onCreate={handleCreatePost} />

                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <p>Loading posts...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className={styles.emptyContainer}>
                            <p>No posts yet. Be the first to share something!</p>
                        </div>
                    ) : (
                        posts.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                onLike={() => handleLike(post.id)}
                                onComment={(text) => handleComment(post.id, text)}
                                onPostUpdate={handlePostUpdate}
                                onPostDelete={handlePostDelete}
                            />
                        ))
                    )}
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.panelCard}>
                        <h3>Friends Activity</h3>
                        <div className={styles.activityItem}>
                            <div className={styles.activityAvatar}>S</div>
                            <p>Sam posted a new photo</p>
                        </div>
                        <div className={styles.activityItem}>
                            <div className={styles.activityAvatar}>T</div>
                            <p>Taylor liked your post</p>
                        </div>
                    </div>

                    <div className={styles.panelCard}>
                        <h3>Suggestions</h3>
                        <div className={styles.suggestionItem}>
                            <div className={styles.suggestionAvatar}>J</div>
                            <div>
                                <p>Jamie Smith</p>
                                <button className={styles.addButton}>Add Friend</button>
                            </div>
                        </div>
                        <div className={styles.suggestionItem}>
                            <div className={styles.suggestionAvatar}>R</div>
                            <div>
                                <p>Riley Johnson</p>
                                <button className={styles.addButton}>Add Friend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FeedPage;