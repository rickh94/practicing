import { updateUserData, type UserInfo } from "~/lib/validators/user";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import directApi from "~/trpc/direct";
import { useRouter } from "next/navigation";
import { UserInfoSkeleton } from "~/app/_components/skeletons";
// TODO: reset email verified if email changes
// TODO: fix form buttons on different sizes

export default function UserInfoForm({
  stopEditing,
}: {
  stopEditing: () => void;
}) {
  const { control, handleSubmit, reset, clearErrors, formState } =
    useForm<UserInfo>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(updateUserData),
      defaultValues: async () => {
        const userInfo = await directApi.user.getUserInfo.query();
        return {
          name: userInfo.name ?? "",
          email: userInfo.email,
        };
      },
    });

  const router = useRouter();
  // TODO: add loader for update
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
      {formState.isLoading && <UserInfoSkeleton />}
      {!formState.isLoading && (
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
                      type="text"
                      id="name"
                      autoComplete="name"
                      placeholder="Enter your Name"
                      {...field}
                      className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600">
                        {error.message}
                      </p>
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
                      className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600">
                        {error.message}
                      </p>
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
              className={`focusable rounded-xl px-4 py-2 font-semibold text-neutral-800 transition duration-200 ${
                formState.isValid
                  ? "bg-emerald-700/10 hover:bg-emerald-700/20"
                  : "bg-neutral-700/50"
              }`}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="focusable rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
              onClick={stopEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
