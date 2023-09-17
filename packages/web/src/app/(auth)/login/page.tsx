import { cookies } from 'next/headers';

export async function getData() {
  const access_token = cookies().get('access_token')?.value;
  const refresh_token = cookies().get('refresh_token')?.value;

  const response = await fetch('http://localhost:8080/api/users/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `access_token=${access_token}; refresh_token=${refresh_token}`,
    },
  });

  const data = await response.json();
  return data;
}

export default async function LoginPage() {
  const data = await getData();
  return <div>{JSON.stringify(data)}</div>;
}
