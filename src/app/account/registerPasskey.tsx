"use client";

import { type PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { api } from "~/trpc/react";
import { startRegistration } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RegistrationPasskey({
  webauthnData,
}: {
  webauthnData: PublicKeyCredentialCreationOptionsJSON;
}) {
  const { mutate, isLoading: registrationLoading } =
    api.webauthn.handleRegister.useMutation();

  const router = useRouter();

  async function registerWebauthn() {
    if (!webauthnData) return;

    try {
      const registrationResponse = await startRegistration(webauthnData);
      mutate(registrationResponse, {
        onSuccess: () => {
          toast.success("Passkey Registered!");
          router.refresh();
        },
        onError: () => {
          toast.error("Could not register passkey");
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setInterval(
      () => {
        router.refresh();
      },
      5 * 60 * 1000,
    );
  }, [router]);

  return (
    <>
      <button
        type="button"
        onClick={registerWebauthn}
        disabled={registrationLoading}
        className="focusable rounded-xl bg-emerald-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 hover:bg-emerald-700/20"
      >
        {registrationLoading ? "Registering..." : "Register a Passkey"}
      </button>
    </>
  );
}
