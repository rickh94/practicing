"use client";

import { type PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { api } from "~/trpc/react";
import { startRegistration } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { HappyButton } from "@ui/buttons";
import { FingerPrintIcon } from "@heroicons/react/20/solid";

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
      <HappyButton onClick={registerWebauthn} disabled={registrationLoading}>
        <FingerPrintIcon className="-ml-1 h-5 w-5" />
        {registrationLoading ? "Registering..." : "Register a Passkey"}
      </HappyButton>
    </>
  );
}
