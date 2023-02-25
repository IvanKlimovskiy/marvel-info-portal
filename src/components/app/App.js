import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../../pages'

const App = () => {


  return (

    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path={'/marvel-info-portal/'} element={<MainPage/>}/>
            <Route path={'/marvel-info-portal/comics/'} element={<ComicsPage/>}/>
            <Route path={'*'} element={<Page404/>}/>
            <Route path={'/marvel-info-portal/comics/:comicId'} element={<SingleComicPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>

  )
}

export default App;
