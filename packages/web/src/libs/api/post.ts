export interface Post {
  id: number;
  title: string;
  body: string;
}

const parseJson = async (response: Response) => {
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const PostAPI = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch('http://localhost:8080/api/posts');
    const data = await parseJson(response);
    return data;
  },
  getPostById: async (id: string): Promise<Post | undefined> => {
    const response = await fetch(`http://localhost:8080/api/posts/${id}`);
    const data = await parseJson(response);
    return data;
  },
};

export default PostAPI;
