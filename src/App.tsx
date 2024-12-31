import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header.tsx";
import ChartComponent from "./components/ChartComponent.tsx";
import items from "@/model/item.ts";

// import {Item} from './model/item.ts';
function App() {
    const [count, setCount] = useState(0);

    // const [selectedItemId, setSelectedItemId] = useState(null);










    const initialData = [
        {time: '2018-12-22', value: 32.51},
        {time: '2018-12-23', value: 31.11},
        {time: '2018-12-24', value: 27.02},
        {time: '2018-12-25', value: 27.32},
        {time: '2018-12-26', value: 25.17},
        {time: '2018-12-27', value: 28.89},
        {time: '2018-12-28', value: 25.46},
        {time: '2018-12-29', value: 23.92},
        {time: '2018-12-30', value: 22.68},
        {time: '2018-12-31', value: 22.67},
    ]


    // const itemClickHandler = () => {
    //
    // }

    return (
        <>
            <Header image={items[5].image} name={items[5].name}></Header>
            <ChartComponent data={initialData}></ChartComponent>


            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
