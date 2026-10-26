"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFormation(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const description = String(
    formData.get("description") ?? ""
  ).trim();

  if (!nom || !description) {
    return;
  }

  await prisma.formation.create({
    data: {
      nom,
      description,
    },
  });

  revalidatePath("/gestion");
}

export async function updateFormation(
  id: number,
  formData: FormData
) {
  const nom = String(formData.get("nom") ?? "").trim();
  const description = String(
    formData.get("description") ?? ""
  ).trim();

  if (!nom || !description) {
    return;
  }

  await prisma.formation.update({
    where: {
      id,
    },
    data: {
      nom,
      description,
    },
  });

  revalidatePath("/gestion");
}

export async function deleteFormation(id: number) {
  await prisma.formation.delete({
    where: {
      id,
    },
  });

  revalidatePath("/gestion");
}