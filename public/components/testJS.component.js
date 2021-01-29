import React, { useState, useEffect } from 'react';
import logo from '../Pictures/logo.gif';

const TestJS = () => {
    
    // WEBSITE
    let input = 'https://www.cll-fws-kiel.de/umfrage-klassen.html';
    let methode = input.replace(/^(https?:\/\/www\.)/, '@');
    let input2 = 'http://www.cll-fws-kiel.de/umfrage-klassen.html';
    let methode2 = input2.replace(/^(https?:\/\/www\.)/, '@');

    // ITERATE OBJECTS
    const pupils = [{name: 'Oskar', surname: 'Matzerath', age: 15}, {name: 'Marie', surname: 'Antoniette', age: 12}, {name: 'Pelle', surname: 'Melle', age: 16}]
    function iteratePupils() {
        for (let [key, value] of Object.entries(pupils)) {
            console.log(key, value);
        }
    }
    // iteratePupils();

    // CANVAS 
    useEffect(() => {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText("Hello World", canvas.width/2, canvas.height/2); 
    }, []);

    // DRAG AND DROP
    function allowDrop(e) {
        e.preventDefault();
    } 
    function drag(e) {
        e.dataTransfer.setData("text", e.target.id);
    }
    function drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
    }
    // RENDER
    return (
        <div className='w3-container'>
            <h3>this is the testing playground</h3>
            <h1>RegEx</h1>
            <h2>Website</h2>
            <p><b>https:</b> {methode}</p>
            <p><b>http:</b> {methode2}</p>
            <h1>Objects</h1>
            <div>
                {pupils.map(pupil => (
                    <p>Schueler*in: {pupil.surname}, {pupil.name}, Alter: {pupil.age}</p>
                ))}
            </div>
            <h1>SVG</h1>
            <svg height="70" width="50">
                <text x="0" y="15" fill="green" transform="rotate(90 10,10)">Praedikat</text>
            </svg>
            
            <h1>Canvas</h1>
            <div className='w3-container'>
                <canvas id="myCanvas" width="200" height="100">
                </canvas>
            </div>

            <h1>Drag & Drop</h1>
            <h2>allgemein</h2>
            <div id="div1" ondrop={e => drop(e)} ondragover={e => allowDrop(e)}>
                <img alt='logo' src={logo} draggable="true" ondragstart={e => drag(e)} id="drag1" width="88" height="31" />
            </div>
            <div id="div2" ondrop={e=> drop(e)} ondragover={e => allowDrop(e)}></div>
            <h2>Test SVG</h2>
            <svg viewbox="0 0 30 20"></svg>
        </div>
    )
}

export default TestJS;
