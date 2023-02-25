import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import RandomChar from "../../components/randomChar/RandomChar";
import CharList from "../../components/charList/CharList";
import CharInfo from "../../components/charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import {useState} from "react";


const MainPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const onSelectedCharacter = (id) => {
    setSelectedCharacter(id)
  }

  return (
    <>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onSelectedCharacter={onSelectedCharacter}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo characterId={selectedCharacter}/>
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;
