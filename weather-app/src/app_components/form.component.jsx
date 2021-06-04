import React from 'react';
import "./form.style.css"




const Form = props => {
    return (
        <div className="container ">
            <div>{props.error ? error():null}</div>
            
            <form onSubmit={props.loadweather}>
            <div className="row d-flex justify-content-center">
                <div className="col-md-3  py-4">
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        autoComplete="off"
                        placeholder="City"
                    />
                </div>
                <div className="col-md-3 py-4">
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        autoComplete="off"
                        placeholder="Country"
                    />

                </div>
                <div className="col-md-3 mt-md-0 py-4 text-md-left">
                    <button name="submit" className="btn">
                        Get Weather
                    </button>
                </div>
            </div>
            </form>
        </div>
    );
};

function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">Please enter city and country</div>
    )
}

export default Form;