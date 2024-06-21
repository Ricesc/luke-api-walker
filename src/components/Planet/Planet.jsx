import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Planet = () => {
    const [planet, setPlanet] = useState({});
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios
                .get(`https://swapi.dev/api/planets/${id}`)
                .then((res) => {
                    setPlanet(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    return (
        <div>
            <h2>{planet.name}</h2>
            <ul>
                <li>Gravity: {planet.gravity}</li>
                <li>Terrain: {planet.terrain}</li>
                <li>Climate: {planet.climate}</li>
                <li>Population: {planet.population}</li>
            </ul>
        </div>
    );
};

export default Planet;
