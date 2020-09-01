import React from "react";
import { CLAVIER } from "../notes";
import "./Clavier.css";

export default function Clavier(props) {
  return (
    <div className="Clavier">
      <h2>Clavier</h2>
      <ul className="Clavier__touches">
        {CLAVIER.map((n) => (
          <li className="Clavier__touche" key={n.pos}>
            <button
              type="button"
              onClick={() => props.onNote(n)}
              data-num={n.pos}
              data-diez={n.diez ? 'true': 'false'}
              data-partition={n.partitionLine}
              className={
                n.diez ? "Clavier__touche-black" : "Clavier__touche-white"
              }
            >
              {n.solfegeName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
