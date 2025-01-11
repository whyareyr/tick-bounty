"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { accountProfilePath } from "@/paths";

export const updateUser = async (
  userId: string,
  updatedFields: { username?: string; email?: string }
) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (user.id !== userId) {
      return toActionState("ERROR", "Not authorized to update this user");
    }

    await prisma.user.update({
      where: { id: userId },
      data: updatedFields,
    });

    revalidatePath(accountProfilePath());

    return toActionState("SUCCESS", "User details updated");
  } catch (error) {
    return fromErrorToActionState(error);
  }
};
