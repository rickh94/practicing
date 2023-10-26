"use client";

import { type PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { api } from "~/trpc/react";
import { startRegistration } from "@simplewebauthn/browser";

export default function RegistrationComponent({
  webauthnData,
}: {
  webauthnData: PublicKeyCredentialCreationOptionsJSON;
}) {
  const {
    mutate,
    isLoading: registrationLoading,
    isSuccess: registrationSuccess,
    isError: registrationError,
  } = api.webauthn.handleRegister.useMutation();

  async function registerWebauthn() {
    if (!webauthnData) return;
    console.log(webauthnData);

    try {
      const registrationResponse = await startRegistration(webauthnData);
      mutate(registrationResponse);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex justify-center pt-4">
        <button
          onClick={registerWebauthn}
          disabled={registrationLoading}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline shadow transition hover:bg-white/20"
        >
          {registrationLoading ? "Registering..." : "Register a Passkey"}
        </button>
      </div>
      {registrationSuccess && (
        <p>
          Successfully registered a passkey. You can now log in using only this
          device!
        </p>
      )}
      {registrationError && (
        <p>Could not register your passkey, please try again.</p>
      )}
    </>
  );
}
