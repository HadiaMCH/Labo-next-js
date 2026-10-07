export default function Formations() {
  const programmes = [
    {
      id: 1,
      nom: "Techniques de l'informatique",
      description:
        "Apprentissage de la programmation, du Web, des bases de données et du développement logiciel.",
    },
    {
      id: 2,
      nom: "Administration",
      description:
        "Formation en gestion, finance, marketing et organisation des entreprises.",
    },
    {
      id: 3,
      nom: "Sciences",
      description:
        "Formation préparatoire aux études universitaires en sciences.",
    },
  ];

  return (
    <section className="formationsPage">

      <h1 className="formationsTitle">
        Nos formations
      </h1>

      <p className="formationsDescription">
        Découvrez les programmes offerts par notre collège.
      </p>

      <div className="formationsList">

        {programmes.map((programme) => (
          <article
            key={programme.id}
            className="formationCard"
          >

            <h2 className="formationTitle">
              {programme.nom}
            </h2>

            <p className="formationDescription">
              {programme.description}
            </p>

            <button className="formationButton">
              En savoir plus
            </button>

          </article>
        ))}

      </div>

    </section>
  );
}