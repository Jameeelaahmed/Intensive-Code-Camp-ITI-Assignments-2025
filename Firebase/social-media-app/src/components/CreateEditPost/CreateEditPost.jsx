import { useState } from 'react';
import styles from './CreateEditPost.module.css';
import Button from '../ui/Button/Button';

const CreateEditPost = ({ onCreate, postToEdit }) => {
    const [content, setContent] = useState(postToEdit?.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onCreate(content);
            setContent('');
        }
    };

    return (
        <div className={styles.createPostCard}>
            <h3>{postToEdit ? 'Edit Post' : 'Create Post'}</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    rows={3}
                />
                <div className={styles.actions}>
                    <Button type="submit" variant="primary">
                        {postToEdit ? 'Update' : 'Post'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditPost;