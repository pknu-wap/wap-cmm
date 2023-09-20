'use client';

import PostAPI from '@/libs/api/post';

const CreatePostButton = () => {
  const create = async () => {
    await PostAPI.createPost();
  };

  return <button onClick={create}>Test</button>;
};

export default CreatePostButton;
