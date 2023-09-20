import PostAPI from '@/libs/api/post';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function PostsPage() {
  const data = await PostAPI.getPosts();
  return (
    <div>
      <Suspense>
        {data.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            style={{
              width: '100px',
              height: '50px',
            }}
          >
            <div>
              {post.title} {post.body}
            </div>
          </Link>
        ))}
      </Suspense>
    </div>
  );
}
