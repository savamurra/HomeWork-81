import './App.css'
import {FormEvent, useState} from "react";
import {createLink, fetchLink,} from "./store/linkThunk.ts";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {url} from "./store/linkSlice.ts";


const initialState = {
    shortUrl: '',
    originalUrl: '',
}

const App = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useAppDispatch();

    const original = useAppSelector(url);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prevState) => ({
            ...prevState,
            shortUrl: form.shortUrl,
            [name]: value,
        }));
    };

    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(createLink(form));
        await dispatch(fetchLink())
        setForm(initialState);
    };


    console.log(original);



    return (
        <div>
            <h1>Shorten your link!</h1>
            <form className="form-short" onSubmit={submitFormHandler}>
                <div className="text-field">
                    <label className="text-field__label" htmlFor="login">Ссылка</label>
                    <input onChange={inputHandler} value={form.originalUrl} className="text-field__input" type="text"
                           name="originalUrl"
                           id="originalUrl" placeholder="Enter your URL here"/>
                </div>
                <button type="submit">Shorten</button>
            </form>


            <p>Your link now looks like this:</p>
            {/*<a*/}
            {/*    href={original[0].originalUrl}*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*>*/}
            {/*    http://localhost:8000/{original.[]}*/}
            {/*</a>*/}

        </div>
    )
};

export default App
