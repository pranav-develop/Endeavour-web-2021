//jshint esversion: 8
import React, { useState } from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import closeIcon from "./../../../assets/img/icons/cancel.png";
import {isAuthenticated, registerEvent} from "../../../auth/helper/index";
function EventPopup(props){

    const [userData, setUserData] = useState({
        endvrId2: "",
        endvrId3: ""
    });

    function handleChange(event){
        const {name, value} = event.target;
        setUserData(prevState => {
            if(name === "endvrId2"){
                return {
                    ...prevState,
                    endvrId2: value
                }
            } else if(name === "endvrId3"){
                return {
                    ...prevState,
                    endvrId3: value
                }
            }
        });
    }

    function startHidePopup(){
        props.hidePopup();
    }

    function register(event){
        event.preventDefault();
        registerEvent(props.eventId, userData);
    }

    const showSlowly = {
        opacity: "1",
        zIndex: "100",
        width: "auto",
        height:"auto",
        transition: "all ease-in",
        transitionDuration: "0.5s",
    };

    const hideSlowly = {
        opacity: "0",
        zIndex: "-1",
        width: "0px !important",
        height: "0px !important",
        transition: "all ease-out",
        transitionDuration:" 0.5s",
    };
    
    return (
        <div className="event-popup container w-50 h-100 position-fixed m-auto p-0 top-0" style={props.showSlowly ? showSlowly : hideSlowly}>
            <div className="position-relative p-5 color-white overflow-auto">
                <div className="position-absolute right-0 px-5">
                    <button onClick={startHidePopup} className="close-button bg-transparent border-0">
                        <img src={closeIcon} width="20px" height="20px" alt="cancel button" />
                    </button>
                </div>
                <div className="popup-heading fs-5 px-5 py-3 fw-bold ls-1"> 
                    Hackathon
                </div>

                <form className="px-5 py-3" method="POST" >
                <div className="row py-2 ls-1 fs-6 my-2">
                    <div className="col-lg-3">
                            <label for="Username">EndvrId 2: </label>
                        </div>
                        <div className="col-lg-9">
                            <input onChange={handleChange} className="form-control p-3 border-0" type="text" name="endvrId2" autoComplete="off" value={userData.endvrid2} />
                        </div>
                    </div>

                    {
                        props.memberCount.toString() === "3" ? 
                        <div className="row py-2 ls-1 fs-6 my-2">
                            <div className="col-lg-3">
                                <label for="Username">EndvrId 3: </label>
                            </div>
                            <div className="col-lg-9">
                                <input onChange={handleChange} className="form-control p-3 border-0" type="text" name="endvrId3" autoComplete="off" value={userData.endvrid3} />
                            </div>
                        </div>
                        : 
                        null
                    }
                {
                    isAuthenticated() && (
                        <React.Fragment>
                            <div className="register-button py-3">
                                <button onclick={register} className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Register</button>
                            </div>
                        </React.Fragment>
                    )
                }
                </form>
            </div>
        </div>
    );
}

export default EventPopup;