import './App.css'
import {FormEvent, useState} from "react";
import {createLink, fetchLinkByUrl,} from "./store/linkThunk.ts";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {isCreat, url} from "./store/linkSlice.ts";
import Spinner from "./components/UI/Spinner/Spinner.tsx";


const initialState = {
    shortUrl: '',
    originalUrl: '',
}

const App = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useAppDispatch();
    const create = useAppSelector(isCreat);

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
        setForm(initialState);
    };

    const redirectHandler = async () => {
        if (original) {
            await dispatch(fetchLinkByUrl(original.shortUrl))
        }
    }

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
                <button type="submit" disabled={create}>Shorten</button>
            </form>

            {create ? (
                <Spinner />
            ) : (
                original && (
                    <>
                        <p>Your link now looks like this:</p>
                        <a
                            href={original.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={redirectHandler}
                        >
                            http://localhost:8000/{original.shortUrl}
                        </a>
                    </>
                )
            )}
        </div>
    )
};

export default App
