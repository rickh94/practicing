import { api } from "~/trpc/server";

export default async function UserInfoDisplay() {
  const userInfo = await api.user.getUserInfo.query();
  return (
    <dl className="divide-y divide-neutral-700 border-y border-neutral-700">
      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-neutral-900">
          Full name
        </dt>
        <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
          {userInfo.name ?? "No name"}
        </dd>
      </div>
      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-neutral-900">
          Email
        </dt>
        <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
          {userInfo.email}
        </dd>
      </div>
    </dl>
  );
}
