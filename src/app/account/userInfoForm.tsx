import { updateUserData } from "~/lib/validators/user";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// TODO: reset email verified if email changes

type UserInfo = z.infer<typeof updateUserData>;

export default function UserInfoForm({
  initialUserInfo,
  stopEditing,
}: {
  initialUserInfo: { name?: string | null; email: string };
  stopEditing: () => void;
}) {
  const { control, handleSubmit, reset, clearErrors, formState } =
    useForm<UserInfo>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(updateUserData),
      defaultValues: {
        email: initialUserInfo.email,
        name: initialUserInfo.name ?? "",
      },
    });

  const router = useRouter();
  const { mutate, isLoading: isUpdating } = api.user.updateUserInfo.useMutation(
    {
      onSuccess: () => {
        router.refresh();
        clearErrors();
        reset();
        stopEditing();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Could not update user info");
        }
      },
    },
  );

  function onSubmit(data: UserInfo) {
    mutate(data);
  }
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="divide-y divide-neutral-700  border-y border-neutral-700">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div className="flex h-full w-full items-center">
                  <label
                    className="text-sm font-medium leading-6 text-neutral-900"
                    htmlFor="name"
                  >
                    Full name
                  </label>
                </div>
                <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="name"
                    id="name"
                    placeholder="Enter your Name"
                    {...field}
                    className="focusable rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              </div>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div className="flex h-full w-full items-center">
                  <label
                    className="text-sm font-medium leading-6 text-neutral-900"
                    htmlFor="email"
                  >
                    Email
                  </label>
                </div>
                <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="email"
                    id="email"
                    autoComplete="home email"
                    placeholder="Enter your email"
                    {...field}
                    className="focusable rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <div className="flex justify-start gap-4 py-4">
          <button
            disabled={!formState.isValid}
            type="submit"
            className={`focusable rounded-xl px-4 py-2 font-semibold text-neutral-800 transition duration-200 ${formState.isValid
                ? "bg-emerald-700/10 shadow hover:bg-emerald-700/20"
                : "bg-neutral-700/50"
              }`}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="focusable rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800 shadow transition duration-200 hover:bg-amber-700/20"
            onClick={stopEditing}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
