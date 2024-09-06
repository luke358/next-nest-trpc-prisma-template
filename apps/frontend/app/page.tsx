'use client'
import { trpc } from "../trpc/Provider";

export default function Home() {
  const hello = trpc.user.list.useQuery();
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{JSON.stringify(hello.data)}</p>
    </div>
  );

}
