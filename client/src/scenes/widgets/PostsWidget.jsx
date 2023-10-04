import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/index";
import PostWidget from "./PostWidget";
import { useNavigate } from "react-router-dom";
import { host } from "utils/APIRoutes";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${host}/posts`, {
      method: "GET",
      // headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${host}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    isProfile ? getUserPosts() : getPosts();
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            onClick={() => navigate(`/post/${userId}/${_id}`)}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
