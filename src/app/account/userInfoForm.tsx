import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserInfoSkeleton } from "~/app/_components/skeletons";
import { type UserInfo, updateUserData } from "~/lib/validators/user";
import directApi from "~/trpc/direct";
import { api } from "~/trpc/react";
import { AngryButton, HappyButton } from "@ui/buttons";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function UserInfoForm({
  stopEditing,
  setNeedsReverify,
}: {
  stopEditing: () => void;
  setNeedsReverify: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleSubmit, reset, clearErrors, formState, register } =
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
      onSuccess: (data) => {
        router.refresh();
        clearErrors();
        reset();
        stopEditing();
        if (!data[0]?.emailVerified) {
          setNeedsReverify(true);
          toast.success(
            "Updated! You’ll need to sign out and back in to verify your email",
          );
        } else {
          toast.success("User info updated");
        }
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
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col justify-between"
        >
          <div className="divide-y divide-neutral-700  border-y border-neutral-700">
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
                  {...register("name")}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {formState.errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>
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
                  {...register("email")}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {formState.errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 py-4">
            <HappyButton disabled={!formState.isValid} type="submit" grow>
              <CheckIcon className="-ml-1 h-5 w-5" />
              {isUpdating ? "Saving..." : "Save"}
            </HappyButton>
            <AngryButton grow onClick={stopEditing}>
              <XMarkIcon className="-ml-1 h-5 w-5" />
              Cancel
            </AngryButton>
          </div>
        </form>
      )}
    </>
  );
}
