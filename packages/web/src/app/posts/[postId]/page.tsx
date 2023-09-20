const PostsDetailPage = ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  return <div>PostsDetailPage {params.postId}</div>;
};

export default PostsDetailPage;
