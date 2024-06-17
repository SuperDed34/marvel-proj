import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Pages from '../pages/index'
import NotFound from "../pages/404";


const App = () =>  {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Pages.MainPage />}/>
                        <Route path="/comics" element={<Pages.ComicsPage />}/>
                        <Route path="/comics/:comicId" element={<Pages.SingleComic/>}/>
                        <Route path="*" element = {<NotFound/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;