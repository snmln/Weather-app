import React from 'react';

const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards pt-4">
                <div className="row">
                    <div className=" col d-inline">
                        <div className="display-4 pb-2">{props.city}</div>
                        {props.lat && props.long ?
                            (<div>
                                <p>
                                    <div className=" d-inline pl-1">
                                        {props.lat}&deg;
                                        </div>
                                    <div className=" d-inline pl-1">
                                        {props.long}&deg;
                                            </div>
                                </p>
                            </div>) : null}

                        {props.temp_celsius ? (<div className="py-2 display-1">{props.temp_celsius}&deg;</div>) : null}
                        {/**show min and max temperature */}
                        {MinMaxTemp(props.temp_min, props.temp_max)}
                    </div>
                    <div className="col d-inline t px-5">
                        <div className="py-4">
                            <i className={`wi ${props.weatherIcon} display-1`} />
                        </div>
                        <h4 className="py-3">{props.description}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MinMaxTemp(min, max) {
    if (min && max) {
        return (<h3>
            <span className="pr-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>

        </h3>
        )
    }
}

export default Weather;