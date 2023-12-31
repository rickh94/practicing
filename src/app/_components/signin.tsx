"use client";
import { signIn } from "next-auth/react";
import { type ChangeEvent, type KeyboardEventHandler, useState } from "react";
import directApi from "~/trpc/direct";
import { startAuthentication } from "@simplewebauthn/browser";
import { BasicButton } from "@ui/buttons";

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  // sign in with email
  async function signInWithEmail() {
    await signIn("email", { email });
  }

  async function handleSignIn() {
    try {
      await signInWithWebauthn();
    } catch (error) {
      await signInWithEmail();
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      void handleSignIn();
    }
  };

  function updateEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setIsValid(event.target.value.includes("@"));
  }

  async function signInWithWebauthn() {
    const options = await directApi.webauthn.startAuthentication.query(email);
    if (!options) {
      throw new Error("No options");
    }
    const credential = await startAuthentication(options);

    await signIn("webauthn", {
      id: credential.id,
      rawId: credential.rawId,
      type: credential.type,
      clientDataJSON: credential.response.clientDataJSON,
      authenticatorData: credential.response.authenticatorData,
      userHandle: credential.response.userHandle,
      clientExtensionResults: credential.clientExtensionResults,
      signature: credential.response.signature,
    });
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full flex-col gap-4 sm:w-72"
      >
        <div>
          <h1 className="text-4xl font-bold text-neutral-700">Log In</h1>
          <p className="py-2 text-neutral-700">
            Type your email to get started
          </p>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="home email"
          placeholder="Enter your email"
          value={email}
          onChange={updateEmail}
          onKeyDown={handleKeyDown}
          className="focusable rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
        />
        <BasicButton disabled={!isValid} onClick={handleSignIn}>
          Sign in
        </BasicButton>
      </form>
    </>
  );
}
