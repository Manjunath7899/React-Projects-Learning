import './App.css'
import { ImageSlider } from './components/ImageSlider'
// import { Accordion } from './components/Accordion'
// import { StartRating } from './components/StartRating';

function App() {

  return (
    <div className='App'>
      {/* <Accordion /> */}
      {/* <h1>Start Rating Component</h1> */}
      {/* <StartRating noOfStars={10}/> */}

      <ImageSlider url={"https://picsum.photos/v2/list"} page={1} limit={10}/>

    </div>
  )
}

export default App
