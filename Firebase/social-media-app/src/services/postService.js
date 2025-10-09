import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    serverTimestamp,
    orderBy,
    query,
    where,
    increment,
    getDoc,
    deleteDoc
} from 'firebase/firestore';
import { auth, db } from '../firebase';
const POSTS_COLLECTION = 'posts';
const COMMENTS_COLLECTION = 'comments';

export const createPost = async (postData) => {
    try {
        const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
            ...postData,
            createdAt: serverTimestamp(),
            likes: [],
            likesCount: 0,
            commentsCount: 0
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const posts = [];

        querySnapshot.forEach((doc) => {
            posts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return posts;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

export const toggleLike = async (postId, userId) => {
    try {
        const postRef = doc(db, POSTS_COLLECTION, postId);
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
            const postData = postDoc.data();
            const likes = postData.likes || [];

            if (likes.includes(userId)) {
                // Remove like
                await updateDoc(postRef, {
                    likes: arrayRemove(userId),
                    likesCount: increment(-1)
                });
            } else {
                // Add like
                await updateDoc(postRef, {
                    likes: arrayUnion(userId),
                    likesCount: increment(1)
                });
            }
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
    }
};

export const addComment = async (postId, commentData) => {
    try {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }

        const content = commentData.content || commentData.text || '';

        if (!content.trim()) {
            throw new Error('Comment content cannot be empty');
        }

        const cleanCommentData = {
            postId: postId,
            content: content.trim(),
            authorId: commentData.authorId,
            authorName: commentData.authorName,
            createdAt: serverTimestamp(),
            likes: [],
            likesCount: 0
        };

        const commentRef = await addDoc(collection(db, COMMENTS_COLLECTION), cleanCommentData);

        const postRef = doc(db, POSTS_COLLECTION, postId);
        await updateDoc(postRef, {
            commentsCount: increment(1)
        });

        return commentRef.id;
    } catch (error) {
        console.error('addComment failed:', {
            error: error,
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        throw error;
    }
};

export const getCommentsForPost = async (postId) => {
    try {
        const q = query(
            collection(db, COMMENTS_COLLECTION),
            where('postId', '==', postId),
            orderBy('createdAt', 'asc')
        );

        const querySnapshot = await getDocs(q);
        const comments = [];

        querySnapshot.forEach((doc) => {
            comments.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return comments;
    } catch (error) {

        if (error.code === 'failed-precondition' && error.message.includes('index')) {
            console.error('FIRESTORE INDEX REQUIRED!');
            console.error('You need to create a composite index for this query.');
            console.error('Click this link to create it:', error.message.match(/https:\/\/[^\s]+/)?.[0]);
        }

        throw error;
    }
};

export const getCommentsForPostNoIndex = async (postId) => {
    try {
        const q = query(
            collection(db, COMMENTS_COLLECTION),
            where('postId', '==', postId)
        );

        const querySnapshot = await getDocs(q);
        const comments = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            comments.push({
                id: doc.id,
                ...data,
                createdAtDate: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
            });
        });

        comments.sort((a, b) => {
            const dateA = a.createdAtDate || new Date(0);
            const dateB = b.createdAtDate || new Date(0);
            return dateA - dateB;
        });

        return comments;
    } catch (error) {
        console.error('Error getting comments (no index):', error);
        throw error;
    }
};

export const toggleCommentLike = async (commentId, userId) => {
    try {
        const commentRef = doc(db, COMMENTS_COLLECTION, commentId);
        const commentDoc = await getDoc(commentRef);

        if (!commentDoc.exists()) {
            throw new Error('Comment not found');
        }

        const commentData = commentDoc.data();
        const likes = commentData.likes || [];
        const isLiked = likes.includes(userId);

        if (isLiked) {
            await updateDoc(commentRef, {
                likes: arrayRemove(userId)
            });
        } else {
            await updateDoc(commentRef, {
                likes: arrayUnion(userId)
            });
        }

        return !isLiked;
    } catch (error) {
        console.error('Error toggling comment like:', error);
        throw error;
    }
};

export const addReplyToComment = async (parentCommentId, replyData) => {
    try {
        const replyRef = await addDoc(collection(db, COMMENTS_COLLECTION), {
            ...replyData,
            parentId: parentCommentId,
            createdAt: serverTimestamp(),
            likes: []
        });

        return replyRef.id;
    } catch (error) {
        console.error('Error adding reply:', error);
        throw error;
    }
};

export const getCommentsWithReplies = async (postId) => {
    try {

        let allComments = [];

        try {
            const q = query(
                collection(db, COMMENTS_COLLECTION),
                where('postId', '==', postId),
                orderBy('createdAt', 'asc')
            );
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const commentData = {
                    id: doc.id,
                    ...doc.data()
                };
                console.log('Found comment:', commentData);
                allComments.push(commentData);
            });
        } catch (indexError) {
            if (indexError.code === 'failed-precondition' && indexError.message.includes('index')) {
                console.warn('Index not found, falling back to client-side sorting');
                allComments = await getCommentsForPostNoIndex(postId);
            } else {
                throw indexError;
            }
        }

        const topLevelComments = allComments.filter(comment => !comment.parentId);
        const replies = allComments.filter(comment => comment.parentId);

        topLevelComments.forEach(comment => {
            comment.replies = replies.filter(reply => reply.parentId === comment.id);
        });

        return topLevelComments;
    } catch (error) {
        console.error('Error getting comments with replies:', error);
        throw error;
    }
};

export const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';

    try {
        const now = new Date();
        let postTime;

        if (timestamp && typeof timestamp.toDate === 'function') {
            postTime = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            postTime = timestamp;
        } else {
            return 'Just now';
        }

        const diffInSeconds = Math.floor((now - postTime) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch (error) {
        console.error('Error formatting timestamp:', error);
        return 'Just now';
    }
};

export const updatePost = async (postId, updateData) => {
    try {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }

        const postRef = doc(db, POSTS_COLLECTION, postId);
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) {
            throw new Error('Post not found');
        }

        const postData = postDoc.data();

        if (postData.authorId !== auth.currentUser.uid) {
            throw new Error('You can only edit your own posts');
        }

        await updateDoc(postRef, {
            ...updateData,
            updatedAt: serverTimestamp()
        });

        return postId;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }

        const postRef = doc(db, POSTS_COLLECTION, postId);
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) {
            throw new Error('Post not found');
        }

        const postData = postDoc.data();
        if (postData.authorId !== auth.currentUser.uid) {
            throw new Error('You can only delete your own posts');
        }

        const commentsQuery = query(
            collection(db, COMMENTS_COLLECTION),
            where('postId', '==', postId)
        );
        const commentsSnapshot = await getDocs(commentsQuery);

        const deletePromises = [];
        commentsSnapshot.forEach((commentDoc) => {
            deletePromises.push(deleteDoc(doc(db, COMMENTS_COLLECTION, commentDoc.id)));
        });

        if (deletePromises.length > 0) {
            await Promise.all(deletePromises);
        }

        await deleteDoc(postRef);
        return postId;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

export const updateComment = async (commentId, updateData) => {
    try {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }

        const commentRef = doc(db, COMMENTS_COLLECTION, commentId);
        const commentDoc = await getDoc(commentRef);

        if (!commentDoc.exists()) {
            throw new Error('Comment not found');
        }

        const commentData = commentDoc.data();

        if (commentData.authorId !== auth.currentUser.uid) {
            throw new Error('You can only edit your own comments');
        }

        await updateDoc(commentRef, {
            ...updateData,
            updatedAt: serverTimestamp()
        });

        return commentId;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }

        const commentRef = doc(db, COMMENTS_COLLECTION, commentId);
        const commentDoc = await getDoc(commentRef);

        if (!commentDoc.exists()) {
            throw new Error('Comment not found');
        }

        const commentData = commentDoc.data();

        if (commentData.authorId !== auth.currentUser.uid) {
            throw new Error('You can only delete your own comments');
        }

        const postId = commentData.postId;

        const repliesQuery = query(
            collection(db, COMMENTS_COLLECTION),
            where('parentId', '==', commentId)
        );
        const repliesSnapshot = await getDocs(repliesQuery);

        const deletePromises = [];
        repliesSnapshot.forEach((replyDoc) => {
            deletePromises.push(deleteDoc(doc(db, COMMENTS_COLLECTION, replyDoc.id)));
        });

        if (deletePromises.length > 0) {
            await Promise.all(deletePromises);
            console.log(`🗑️ Deleted ${deletePromises.length} replies for comment ${commentId}`);
        }

        await deleteDoc(commentRef);

        const postRef = doc(db, POSTS_COLLECTION, postId);
        await updateDoc(postRef, {
            commentsCount: increment(-(1 + deletePromises.length)) // Subtract comment + replies
        });

        return commentId;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};
