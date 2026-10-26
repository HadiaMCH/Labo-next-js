import { prisma } from "@/lib/prisma";

import {
  createFormation,
  updateFormation,
  deleteFormation,
} from "./actions";

export default async function GestionPage() {
  const formations = await prisma.formation.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main>
      <h1>Gestion des formations</h1>

      {/* CREATE */}
      <section>
        <h2>Ajouter une formation</h2>

        <form action={createFormation}>
          <div>
            <label htmlFor="nom">
              Nom
            </label>

            <input
              id="nom"
              name="nom"
              type="text"
              placeholder="Nom de la formation"
              required
            />
          </div>

          <div>
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Description"
              required
            />
          </div>

          <button type="submit">
            Ajouter
          </button>
        </form>
      </section>

      {/* READ */}
      <section>
        <h2>Formations enregistrées</h2>

        {formations.length === 0 ? (
          <p>Aucune formation enregistrée.</p>
        ) : (
          <div>
            {formations.map((formation) => {
              const updateAction =
                updateFormation.bind(
                  null,
                  formation.id
                );

              const deleteAction =
                deleteFormation.bind(
                  null,
                  formation.id
                );

              return (
                <article key={formation.id}>
                  <h3>{formation.nom}</h3>

                  <p>
                    {formation.description}
                  </p>

                  {/* UPDATE */}
                  <form action={updateAction}>
                    <div>
                      <label>
                        Nom
                      </label>

                      <input
                        type="text"
                        name="nom"
                        defaultValue={
                          formation.nom
                        }
                        required
                      />
                    </div>

                    <div>
                      <label>
                        Description
                      </label>

                      <textarea
                        name="description"
                        defaultValue={
                          formation.description
                        }
                        required
                      />
                    </div>

                    <button type="submit">
                      Modifier
                    </button>
                  </form>

                  {/* DELETE */}
                  <form action={deleteAction}>
                    <button type="submit">
                      Supprimer
                    </button>
                  </form>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}