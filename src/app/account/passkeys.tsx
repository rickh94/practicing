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
    <div className="border-t-2 border-neutral-700 pt-2 sm:pt-4 md:border-l-2 md:border-t-0 md:pl-2 md:pt-0">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-neutral-900">
          Passkey Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-500">
          Manage your passkeys
        </p>
      </div>
      <dl className="divide-y divide-neutral-700 border-y border-neutral-700">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
