import page404 from '../../resources/img/page404.png'
import {Link} from "react-router-dom";

const Page404 = () => {
  return (
    <div style={{width: '100%', maxWidth: 1100}}>
      <img style={{width: '100%'}} src={page404} alt="Page not found"/>
      <Link style={{fontSize: 50, marginTop: '30px', display: 'flex', justifyContent: "center"}} to={'/'}><span style={{color: '#9F0013', marginRight: 14}}>Back</span>to main page</Link>
    </div>
  )
}

export default Page404;
