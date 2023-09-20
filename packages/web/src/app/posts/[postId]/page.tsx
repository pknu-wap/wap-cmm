import PostAPI from '@/libs/api/post';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

const PostsDetailPage = async ({
  params,
}: {
  params: {
    postId: string;
  };
}) => {
  const post = await PostAPI.getPostById(params.postId);
  if (!post) {
    notFound();
  }
  return (
    <div>
      <Suspense>
        <div>
          <div>{post.id}</div>
          <div>
            {post.title} {post.body}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default PostsDetailPage;
