"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


// ==========================
// CREATE FORMATION
// ==========================

export async function createFormation(
  formData: FormData
) {
  const nom = String(
    formData.get("nomFormation") ?? ""
  ).trim();

  const description = String(
    formData.get("description") ?? ""
  ).trim();

  if (!nom) {
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


// ==========================
// CREATE COURS
// Relation 1:n
// ==========================

export async function createCours(
  formData: FormData
) {
  const titre = String(
    formData.get("titre") ?? ""
  ).trim();

  const formationId = Number(
    formData.get("formationId")
  );

  if (!titre || !formationId) {
    return;
  }

  await prisma.cours.create({
    data: {
      titre,
      formationId,
    },
  });

  revalidatePath("/gestion");
}


// ==========================
// CREATE ETUDIANT
// Relation n:n
// ==========================

export async function createEtudiant(
  formData: FormData
) {
  const nom = String(
    formData.get("nomEtudiant") ?? ""
  ).trim();

  const formationIds = formData
    .getAll("formations")
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id));

  if (!nom) {
    return;
  }

  await prisma.etudiant.create({
    data: {
      nom,

      formations: {
        connect: formationIds.map(
          (id) => ({
            id,
          })
        ),
      },
    },
  });

  revalidatePath("/gestion");
}


// ==========================
// CREATE PROFIL
// Relation 1:1
// ==========================

export async function createProfil(
  formData: FormData
) {
  const bio = String(
    formData.get("bio") ?? ""
  ).trim();

  const etudiantId = Number(
    formData.get("etudiantId")
  );

  if (!etudiantId) {
    return;
  }

  await prisma.profil.create({
    data: {
      bio,
      etudiantId,
    },
  });

  revalidatePath("/gestion");
}