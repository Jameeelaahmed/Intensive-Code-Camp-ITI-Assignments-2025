import React, { useState } from 'react';
import styles from './Feed.module.css';
import Post from '../../components/Post/Post';
import CreateEditPost from '../../components/CreateEditPost/CreateEditPost';

const FeedPage = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: { name: 'Alex Johnson', avatar: null },
            content: 'Just visited the new art exhibition downtown. Amazing works!',
            time: '2h ago',
            likes: 24,
            comments: [
                { id: 1, user: 'Sam Wilson', text: 'Wish I could go!', time: '1h ago' },
                { id: 2, user: 'Taylor Kim', text: 'The modern section was incredible', time: '45m ago' }
            ]
        },
        // More sample posts...
    ]);

    const handleCreatePost = (content) => {
        const newPost = {
            id: posts.length + 1,
            user: { name: 'Current User', avatar: null },
            content,
            time: 'Just now',
            likes: 0,
            comments: []
        };
        setPosts([newPost, ...posts]);
    };

    return (
        <div className={styles.feedContainer}>
            <header className={styles.header}>
                <h1>Socialize</h1>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search..." />
                </div>
                <div className={styles.userActions}>
                    {/* Add user avatar and logout button */}
                </div>
            </header>

            <div className={styles.mainContent}>
                <div className={styles.sidebar}>
                    {/* Navigation sidebar */}
                </div>

                <div className={styles.feed}>
                    <CreateEditPost onCreate={handleCreatePost} />

                    {posts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onLike={() => console.log('Like post', post.id)}
                            onComment={(text) => console.log('Add comment:', text)}
                        />
                    ))}
                </div>

                <div className={styles.rightPanel}>
                    {/* Friends suggestion panel */}
                </div>
            </div>
        </div>
    );
};

export default FeedPage;