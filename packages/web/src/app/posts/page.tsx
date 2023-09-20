export async function getData() {
  const response = await fetch('https://localhost:8080/api/posts');
  const data = await response.json();

  return data;
}

export default async function PostsPage() {
  const data = await getData();
  return <div>{JSON.stringify(data)}</div>;
}
