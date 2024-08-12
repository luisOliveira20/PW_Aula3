import { useForm } from "react-hook-form";
import './PlayersForm.css';
import config from "../../config";
import { response } from "express";

const PlayersForm = () => {
    const {register, handleSubmit} = useform();
    const onSubmit = (data) => postPlayer(buildPlayers(data));

    const postPlayer = (data) => {
        fetch("/team/players", {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": config.token,
            },
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                alert('Player duplicate');
            }
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
    };
    const buildPlayers = (data) => {
        return {...data, hobbies: [{name: data.hobbies}] };
    };
    return (
        <>
            <h2> Players Form </h2>
            <form className="form-Players" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label> Name: </label>
                    <input name="name" {...register("name")} />
                </div>
                <div className="field">
                    <label> Hobbies: </label>
                    <select name="hobbies" {...register("hobbies")}>
                        <option value="Football"> Football </option>
                        <option value="Tennis"> Tennis </option>
                        <option value="Golf"> Golf </option>
                    </select>
                </div>
                <input className="submit" type="submit" />
            </form>
        </>
    );
};

export default PlayersForm;