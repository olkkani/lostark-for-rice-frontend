import { createBrowserRouter, RouterProvider} from "react-router-dom";
import GemChart from "@/pages/GemChart.tsx";
import './App.css'

const router = createBrowserRouter([
    {path: '/', element: <GemChart/> }
])
function App() {
    return <RouterProvider router={router}/>
}
//     const [gems, setGems] = useState<Item[]>(Items);

//
//
//     const {data, isLoading, isError, error} = useQuery({
//         queryKey: ["event"],
//         queryFn: getAllItems,
//         staleTime: 5000
//     });
//
//
//     if (isLoading) {
//         console.log("loading...");
//     }
//     if (isError) {
//         console.log(error)
//     }
//
//
//     if (data) {
//     }
//
//
//     const respone = getAllItems()
//     console.log(respone)
//
//     const selectedGem: Item = useMemo(() =>
//         gems.find(gem => gem.id === currentGem.id), [gems, currentGem.id]);
//
//
//     function handleItemClick(id) {
//         setCurrentGem(id)
//     }
//
//
//     return (
//         <Provider>
//             <div className="grid grid-cols-2">
//                 <main>
//                     <Header image={selectedGem.image} name={selectedGem.name} price={selectedGem.price}
//                             highPrice={selectedGem.highPrice} priceChange={selectedGem.priceChange}
//                             lowPrice={selectedGem.lowPrice}
//                             priceChangeRate={selectedGem.priceChangeRate}></Header>
//                     <ChartComponent data={selectedGem.priceRecords}></ChartComponent>
//                     {/*<PriceRecordsTable data={selectedGem.recentPriceTrends}></PriceRecordsTable>*/}
//                 </main>
//                 {/*<Aside></Aside>*/}
//             </div>
//         </Provider>
//     )
// }

export default App
