import Sidebar from "../Sidebar/Sidebar";
import Filters from "../Filters/Filters";
// import './Body.scss'

export default function Body(){
  return (
    <div className='body-wrapper'>
      <Sidebar></Sidebar>
      <Filters></Filters>
    </div>
  )
}