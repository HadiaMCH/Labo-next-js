"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


// CREATE
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


// UPDATE
export async function updateFormation(formData: FormData) {
  const id = Number(formData.get("id"));

  const nom = String(
    formData.get("nom") ?? ""
  ).trim();

  const description = String(
    formData.get("description") ?? ""
  ).trim();

  if (!id || !nom || !description) {
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


// DELETE
export async function deleteFormation(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  await prisma.formation.delete({
    where: {
      id,
    },
  });

  revalidatePath("/gestion");
}