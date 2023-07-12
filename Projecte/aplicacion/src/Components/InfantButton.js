
import React from "react";
import {Button} from "react-bootstrap";
import './InfantButton.css';

export default class InfantButton extends React.Component {

   render() {
       return (
           <div className="InfantButton">
               <Button onClick={this.props.onClick}>{this.props.name}</Button>
           </div>
       );
   }
}