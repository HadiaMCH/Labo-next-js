import { prisma } from "@/lib/prisma";

import {
  createFormation,
  createCours,
  createEtudiant,
  createProfil,
} from "./actions";


export default async function GestionPage() {

  // ==========================
  // READ FORMATIONS
  // + leurs cours
  // + leurs étudiants
  // ==========================

  const formations =
    await prisma.formation.findMany({
      include: {
        cours: true,
        etudiants: true,
      },

      orderBy: {
        id: "desc",
      },
    });


  // ==========================
  // READ ETUDIANTS
  // + profil
  // + formations
  // ==========================

  const etudiants =
    await prisma.etudiant.findMany({
      include: {
        profil: true,
        formations: true,
      },

      orderBy: {
        id: "desc",
      },
    });


  return (
    <main>

      <h1>
        Gestion des formations
      </h1>


      {/* ==================================
          CREATE FORMATION
      ================================== */}

      <section>

        <h2>
          Ajouter une formation
        </h2>

        <form action={createFormation}>

          <div>

            <label htmlFor="nomFormation">
              Nom
            </label>

            <input
              id="nomFormation"
              name="nomFormation"
              type="text"
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
            />

          </div>


          <button type="submit">
            Ajouter la formation
          </button>

        </form>

      </section>



      {/* ==================================
          CREATE COURS
          Relation 1:n
      ================================== */}

      <section>

        <h2>
          Ajouter un cours
        </h2>

        <form action={createCours}>

          <div>

            <label htmlFor="titre">
              Titre du cours
            </label>

            <input
              id="titre"
              name="titre"
              type="text"
              required
            />

          </div>


          <div>

            <label htmlFor="formationId">
              Formation
            </label>

            <select
              id="formationId"
              name="formationId"
              required
            >

              <option value="">
                Choisir une formation
              </option>

              {formations.map(
                (formation) => (

                  <option
                    key={formation.id}
                    value={formation.id}
                  >

                    {formation.nom}

                  </option>

                )
              )}

            </select>

          </div>


          <button type="submit">
            Ajouter le cours
          </button>

        </form>

      </section>



      {/* ==================================
          CREATE ETUDIANT
          Relation n:n
      ================================== */}

      <section>

        <h2>
          Ajouter un étudiant
        </h2>

        <form action={createEtudiant}>

          <div>

            <label htmlFor="nomEtudiant">
              Nom
            </label>

            <input
              id="nomEtudiant"
              name="nomEtudiant"
              type="text"
              required
            />

          </div>


          <div>

            <label htmlFor="formations">
              Formations
            </label>

            <select
              id="formations"
              name="formations"
              multiple
            >

              {formations.map(
                (formation) => (

                  <option
                    key={formation.id}
                    value={formation.id}
                  >

                    {formation.nom}

                  </option>

                )
              )}

            </select>

          </div>


          <button type="submit">
            Ajouter l'étudiant
          </button>

        </form>

      </section>



      {/* ==================================
          CREATE PROFIL
          Relation 1:1
      ================================== */}

      <section>

        <h2>
          Ajouter un profil
        </h2>

        <form action={createProfil}>

          <div>

            <label htmlFor="etudiantId">
              Étudiant
            </label>

            <select
              id="etudiantId"
              name="etudiantId"
              required
            >

              <option value="">
                Choisir un étudiant
              </option>

              {etudiants
                .filter(
                  (etudiant) =>
                    !etudiant.profil
                )
                .map(
                  (etudiant) => (

                    <option
                      key={etudiant.id}
                      value={etudiant.id}
                    >

                      {etudiant.nom}

                    </option>

                  )
                )}

            </select>

          </div>


          <div>

            <label htmlFor="bio">
              Biographie
            </label>

            <textarea
              id="bio"
              name="bio"
            />

          </div>


          <button type="submit">
            Ajouter le profil
          </button>

        </form>

      </section>



      {/* ==================================
          READ FORMATIONS
          + COURS
          + ETUDIANTS
      ================================== */}

      <section>

        <h2>
          Formations
        </h2>


        {formations.length === 0 ? (

          <p>
            Aucune formation.
          </p>

        ) : (

          formations.map(
            (formation) => (

              <article
                key={formation.id}
              >

                <h3>
                  {formation.nom}
                </h3>


                <p>
                  {formation.description}
                </p>


                {/* 1:n */}

                <h4>
                  Cours
                </h4>

                {formation.cours.length === 0 ? (

                  <p>
                    Aucun cours.
                  </p>

                ) : (

                  <ul>

                    {formation.cours.map(
                      (cours) => (

                        <li key={cours.id}>
                          {cours.titre}
                        </li>

                      )
                    )}

                  </ul>

                )}


                {/* n:n */}

                <h4>
                  Étudiants inscrits
                </h4>

                {formation.etudiants.length === 0 ? (

                  <p>
                    Aucun étudiant.
                  </p>

                ) : (

                  <ul>

                    {formation.etudiants.map(
                      (etudiant) => (

                        <li key={etudiant.id}>
                          {etudiant.nom}
                        </li>

                      )
                    )}

                  </ul>

                )}

              </article>

            )
          )

        )}

      </section>



      {/* ==================================
          READ ETUDIANTS
          + PROFIL
          + FORMATIONS
      ================================== */}

      <section>

        <h2>
          Étudiants
        </h2>


        {etudiants.length === 0 ? (

          <p>
            Aucun étudiant.
          </p>

        ) : (

          etudiants.map(
            (etudiant) => (

              <article
                key={etudiant.id}
              >

                <h3>
                  {etudiant.nom}
                </h3>


                {/* 1:1 */}

                <p>
                  Profil :
                  {" "}
                  {
                    etudiant.profil?.bio
                    ?? "Aucun profil"
                  }
                </p>


                {/* n:n */}

                <h4>
                  Formations suivies
                </h4>


                {etudiant.formations.length === 0 ? (

                  <p>
                    Aucune formation.
                  </p>

                ) : (

                  <ul>

                    {etudiant.formations.map(
                      (formation) => (

                        <li key={formation.id}>
                          {formation.nom}
                        </li>

                      )
                    )}

                  </ul>

                )}

              </article>

            )
          )

        )}

      </section>

    </main>
  );
}