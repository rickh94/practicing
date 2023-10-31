import { api } from "~/trpc/server";
import RegisterPasskey from "./registerPasskey";
import DeletePasskeys from "./deletePasskeys";

export default async function PasskeyManagement() {
  const data = (await api.user.getPasskeyCount.query())[0];
  const registrationData = await api.webauthn.handlePreRegister.query();
  function passkeyCount() {
    if (data?.count) {
      return data.count;
    } else {
      return 0;
    }
  }

  return (
    <div className="h-72 rounded-xl bg-neutral-700/5 p-4 sm:h-64">
      <div className="px-4 pb-1 sm:px-0">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          Passkey Information
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500">
          Manage your passkeys
        </p>
      </div>
      <dl className="divide-y divide-neutral-700 border-t border-neutral-700">
        <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Number of Passkeys
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            {passkeyCount()}
          </dd>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="flex items-center text-sm font-medium leading-6 text-neutral-900">
            <span>Register a Passkey</span>
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <RegisterPasskey webauthnData={registrationData} />
          </dd>
        </div>
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="flex items-center text-sm font-medium leading-6 text-neutral-900">
            <span>Delete Your Passkeys</span>
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <DeletePasskeys />
          </dd>
        </div>
      </dl>
    </div>
  );
}
