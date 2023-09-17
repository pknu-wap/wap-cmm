export const getData = async () => {
  const res = await fetch('http://localhost:8080/api/users/me');
  return res.json();
};

const LoginPage = async () => {
  const data = await getData();

  return (
    <div>
      <div>Login Page</div>
      <div>{data.id}</div>
    </div>
  );
};

export default LoginPage;
