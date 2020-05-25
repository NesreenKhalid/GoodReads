import React from "react";
import { Link } from "react-router-dom";
// import UserService from "../../services/user.service";
import cat1 from '../../assets/cat1.jpg';
import cat2 from '../../assets/cat2.jpg';
import cat3 from '../../assets/cat3.jpg';
import cat4 from '../../assets/cat4.jpg';
import cat5 from '../../assets/cat5.png';
import cat6 from '../../assets/cat6.jpg';


export default function Catigories() {
    const [state, setstate] = React.useState([]);
    const [haserror, seterror] = React.useState(false);

    React.useEffect(() => {
        fetch('').then((respons)=>respons.json().then((resJson)=>{
            setstate(resJson)
        })).catch(err=>seterror(true))
    }, [])

    return (

        <div className="container">

            {/* {haserror ? <div> some thing wrong</div> :state.map(item=> */}
                <div>
                    <div className="row">
                        <div className="card" >
                            <img className="cat1 card-img-top" src={cat1} alt="econimics" />
                            <div className="card-body">
                                <h5 className="card-title">Econimics</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>

                            <div className="card-body">
                                <Link to="#" className="card-link">Card link</Link>

                            </div>
                        </div>

                        <div className="card" >
                            <img className="cat1 card-img-top" src={cat2} alt="society" />
                            <div className="card-body">
                                <h5 className="card-title">Society</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>

                            <div className="card-body">
                                <Link to="#" className="card-link">Card link</Link>

                            </div>
                        </div>

                        <div className="card" >
                            <img className="cat1 card-img-top" src={cat3} alt="econimics" />
                            <div className="card-body">
                                <h5 className="card-title">Horror</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>

                            <div className="card-body">
                                <Link to="#" className="card-link">Card link</Link>

                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="card" >
                            <img className="cat1 card-img-top" src={cat4} alt="econimics" />
                            <div className="card-body">
                                <h5 className="card-title">Fantasty</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>

                            <div className="card-body">
                                <Link to="#" className="card-link">Card link</Link>

                            </div>
                        </div>

                        <div className="card" >
                            <img className="cat1 card-img-top" src={cat5} alt="econimics" />
                            <div className="card-body">
                                <h5 className="card-title">Romance</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>

                            <div className="card-body">
                                <Link to="#" className="card-link">Card link</Link>

                            </div>
                        </div>

                        <div className="card" >
                            <img className="cat1 card-img-top" src={cat6} alt="econimics" />
                            <div className="card-body">
                                <h5 className="card-title">Fiction</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>

                            <div className="card-body">
                                <Link to="#" className="card-link">Card link</Link>

                            </div>
                        </div>

                    </div>
                </div>
                {/* )} */}
        </div>
    );

}