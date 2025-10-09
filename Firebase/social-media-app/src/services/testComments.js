import { addComment, getCommentsWithReplies } from './postService';

export const testCommentSystem = async (postId, currentUser) => {
    console.log('Testing comment system...');

    try {
        const testCommentData = {
            content: 'Test comment',
            authorId: currentUser.uid,
            authorName: currentUser.displayName || 'Test User'
        };

        const commentId = await addComment(postId, testCommentData);

        const comments = await getCommentsWithReplies(postId);

        return { success: true, commentId, comments };
    } catch (error) {
        console.error('Test failed:', error);
        return { success: false, error };
    }
};

if (typeof window !== 'undefined') {
    window.testCommentSystem = testCommentSystem;
}
