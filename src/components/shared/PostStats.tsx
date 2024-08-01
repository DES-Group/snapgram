import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    useDeleteSavedPost,
    useGetCurrentUser,
    useLikePost,
    useSavePost
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import Loader from "./Loader";

type PostStatsProps = {
    post: Models.Document | undefined;
    userId: string;
};

const PostStats: React.FC<PostStatsProps> = ({ post, userId }) => {
    const initialLikes = useMemo(() => post?.likes.map((user: Models.Document) => user.$id), [post?.likes]);
    const [likes, setLikes] = useState<string[]>(initialLikes);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();
    
    const { data: currentUser } = useGetCurrentUser();

    const savedPostRecord = useMemo(() => currentUser?.save.find((record: Models.Document) =>
        record.post.$id === post?.$id), [currentUser, post?.$id]);

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [savedPostRecord]);

    const handleLikePost = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();

        setLikes((prevLikes) => {
            const newLikes = prevLikes.includes(userId)
                ? prevLikes.filter((id) => id !== userId)
                : [...prevLikes, userId];

            likePost({ postId: post?.$id || '', likeArray: newLikes });
            return newLikes;
        });
    }, [likePost, post?.$id, userId]);

    const handleSavedPost = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();

        if (isSaved && savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id);
        } else {
        
            savePost({ postId:post?.$id || '', userId });

            setIsSaved(true);
        }
    }, [deleteSavedPost, isSaved, savePost, savedPostRecord, post?.$id, userId]);

    return (
        <div className="flex justify-between items-center z-20">
            {/** Like */}
            <div className="flex gap-2 mr-5">
                <img
                    src={checkIsLiked(likes, userId)
                        ? "/assets/icons/liked.svg"
                        : "/assets/icons/like.svg"}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>
            
            {/** Saves */}
            <div className="flex gap-2">
                {isSavingPost || isDeletingSavedPost ? <Loader /> : (
                    <img
                        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                        alt="save"
                        width={20}
                        height={20}
                        onClick={handleSavedPost}
                        className="cursor-pointer"
                    />
                )}
            </div>
        </div>
    );
}

export default PostStats;
