export default async function register(
  name: string,
  telephone: string,
  email: string,
  password: string,
  role: string
) {
  let bodyData = {
    name: name,
    telephone: telephone,
    email: email,
    password: password,
    role: role,
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed register");
  }
  return await response.json();
}
