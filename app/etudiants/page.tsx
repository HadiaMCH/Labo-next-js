export default function Etudiants() {
  const etudiants = [
    {
      id: 1,
      nom: "Amine",
      programme: "Informatique",
    },
    {
      id: 2,
      nom: "Sophie",
      programme: "Administration",
    },
    {
      id: 3,
      nom: "Lucas",
      programme: "Sciences",
    },
  ];

  return (
    <section className="studentsPage">

      <h1 className="studentsTitle">
        Nos étudiants
      </h1>

      <p className="studentsDescription">
        Voici quelques étudiants inscrits au Collège ABC.
      </p>

      <div className="studentsCards">

        {etudiants.map((etudiant) => (
          <div
            className="studentCard"
            key={etudiant.id}
          >

            <div className="studentAvatar">
              {etudiant.nom.charAt(0)}
            </div>

            <h2>{etudiant.nom}</h2>

            <p>
              Programme :
              <strong> {etudiant.programme}</strong>
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}