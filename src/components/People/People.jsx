import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const People = () => {
    const [people, setPeople] = useState({});
    const [homeworld, setHomeworld] = useState("");
    const [starships, setStarships] = useState([]);
    const [species, setSpecies] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // Obtener los datos de la persona
            axios
                .get(`https://swapi.dev/api/people/${id}`)
                .then((res) => {
                    const personData = res.data;
                    setPeople(personData);

                    // Obtener el nombre del planeta
                    if (personData.homeworld) {
                        axios
                            .get(personData.homeworld)
                            .then((res) => {
                                setHomeworld(res.data.name);
                            })
                            .catch((err) => console.log(err));
                    }

                    // Obtener los nombres de las naves espaciales
                    if (personData.starships.length > 0) {
                        Promise.all(
                            personData.starships.map((url) =>
                                axios.get(url).then((res) => res.data.name)
                            )
                        )
                            .then((names) => {
                                setStarships(names);
                            })
                            .catch((err) => console.log(err));
                    } else {
                        setStarships(["N/A"]);
                    }

                    // Obtener los nombres de las especies
                    if (personData.species.length > 0) {
                        Promise.all(
                            personData.species.map((url) =>
                                axios.get(url).then((res) => res.data.name)
                            )
                        )
                            .then((names) => {
                                setSpecies(names);
                            })
                            .catch((err) => console.log(err));
                    } else {
                        setSpecies(["Human"]); // Si no hay especies, asumimos que es humano
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    return (
        <div>
            <h2>{people.name}</h2>
            <ul>
                <li>Home Planet: {homeworld}</li>
                <li>Starships: {starships.join(", ")}</li>
                <li>Height: {people.height} cm</li>
                <li>Species: {species.join(", ")}</li>
            </ul>
        </div>
    );
};

export default People;
