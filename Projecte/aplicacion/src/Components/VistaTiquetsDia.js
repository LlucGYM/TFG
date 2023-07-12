import React from "react";

export default class LlistaTiquets extends React.Component {


    askPagat = (tiquet) => {
        if(tiquet.Pagat === "1") {
            return " Pagat"
        }else {
            return "";
        }
    }

    render() {
        return (<li className={"row Tiquet" + this.askPagat(this.props.tiquet)}>
                <p className="col">{this.props.tiquet.IDTiquet}</p>
                <p className="col">{this.props.tiquet.IDAlumno.Nom + " " + this.props.tiquet.IDAlumno.Congnom}</p>
                {this.props.tiquet.Pagat === "1" ? <p className="col">Pagat</p> : <p className="col">No Pagat</p>}
                <p className="col">{this.props.tiquet.IDTipus_Menu}</p>
            </li>
        )
    }
}