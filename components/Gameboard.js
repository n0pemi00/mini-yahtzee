import React, {useEffect, useState, useCallback} from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../style/style";

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_NUM = 6;
const BONUSPOINTS = 63;

let board = [];
let dicearray = [];
let selectedarray = [];
let pointsarray = [];

export default function() {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [sum,SetSum] = useState(0);
    const [status, setStatus] = useState("");
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedNumbers, setSelectedNumbers] = useState(new Array(NBR_OF_NUM).fill(false));
    const [Bonuspoint,setBonuspoint] = useState(63);
    const [totalPoints,setTotalPoints] = useState(0);
    const [disableDice, setDisableDice] = useState(false);
    const [disableNum, setDisableNum] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    let points = 0;

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
        <Pressable disabled={disableDice} key={"row" + i} onPress={() => selectDice(i)}>
            <MaterialCommunityIcons name={board[i]} key={"row" + i} size={50} color={getDiceColor(i)}></MaterialCommunityIcons>
        </Pressable>
    );
 }

    const numb = [];
    for (let i = 0; i < NBR_OF_NUM; i++) {
        numb.push(
        <View style={styles.flex}>
            <Pressable disabled={disableNum} key={"numb" + i} onPress={() => selectNumbers(i)}>
                <MaterialCommunityIcons name={"numeric-" + (i + 1) + "-circle"} key={"num" + i} size={50} color={getNumberColor(i)}></MaterialCommunityIcons>
            </Pressable>
        </View>
    );
 }

    function getDiceColor(i) {
        return selectedDices[i] ? "#8E2705" : "#ED4E2C"
    }

    function getNumberColor(i) {
        return selectedNumbers[i] ? "#8E2705" : "#ED4E2C"
    }

    const throwDices = () => {
            setDisableDice(false)
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = "dice-" + randomNumber;
                dicearray[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
        if (dices[i] === true) {
            selectedarray.push(dicearray[i]);
            points = sum + dicearray[i]
            SetSum(points);
            } else if (dices[i] === false) {
            selectedarray.remove(dicearray[i])
            points = sum - dicearray[i]
            SetSum(points)
        } 
    };

    const selectNumbers = (i) => {
        let numbers = [...selectedNumbers];
        numbers[i] = selectedNumbers[i] ? false : true;
        setSelectedNumbers(numbers);

        if(i === 0) {
            selectedarray.remove(2,3,4,5,6)
        }
        if(i === 1) {
            selectedarray.remove(1,3,4,5,6)
        }
        if(i === 2) {
            selectedarray.remove(1,2,4,5,6)
        }
        if(i === 3) {
            selectedarray.remove(1,2,3,5,6)
        }
        if(i === 4) {
            selectedarray.remove(1,2,3,4,6)
        }
        if(i === 5) {
            selectedarray.remove(1,2,3,4,5)
        }

        if (!selectedNumbers[i]) {
            setSelectedNumbers[i] = true;
            let nbrOfDices = 0;
            for(let place = 0; place < selectedarray.length; place++) {
                if (selectedarray[place] === i){
                    nbrOfDices++;
                }
            }
        }else {
            setStatus('Tämä numero on jo käytetty');
            setSelectedNumbers[i] === false;
            disableNum[i] === true;
            return pointsarray[i];
        }

        selectedDices.fill(false);
        const start = 0
        const selectedsum = selectedarray.reduce((a, b) => a + b, start);
        SetSum(points)
        pointsarray.splice(i,1,selectedsum)
        SetSum(0)
        setDisableDice(true)
        setDisableButton(false)
        setSelectedDices(new Array (NBR_OF_DICES).fill(false))
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        const starting = 0
        const pointssum = pointsarray.reduce((x, y) => x + y, starting);
        setTotalPoints(pointssum)
        let newbonuspoint = BONUSPOINTS - pointssum
        setBonuspoint(newbonuspoint)
        selectedarray = [];
    };

    useEffect(() => {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus("heitä noppia")
            setDisableNum(true)
        }
        if (nbrOfThrowsLeft === 0) {
            setStatus("heitot loppuivat")
            setDisableNum(false)
            setDisableButton(true)
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(0)
            setDisableNum(true)
        }
        if (Bonuspoint <= 0) {
            setStatus("Bonus")
        }
        if (pointsarray.every(value => value && totalPoints < 63)) {
            setDisableButton(true)
            setDisableNum(true)
            setStatus("hävisit")
        }
        if (pointsarray.every(value => value && totalPoints >= 63)) {
            setStatus("Aloita peli alhaalta")
            setDisableNum(true)
            setDisableButton(true)
        }
    }, [nbrOfThrowsLeft]);

    const resetGame = () => {
        board = [];
        pointsarray = [0,0,0,0,0,0];
        selectedarray = [];
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setDisableButton(false)
        setDisableDice(false);
        setDisableNum(false);
        setSelectedNumbers(new Array(NBR_OF_NUM).fill(false));
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setTotalPoints(0);
        setStatus("heitä noppia");
        setBonuspoint(BONUSPOINTS);
        SetSum(0);
    }

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Heittoja jäljellä: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button} onPress={() => throwDices()} disabled={disableButton}>
                <Text style={styles.buttonText}>Heitä</Text>
            </Pressable>
            <Text style={styles.gameinfo}>Pisteesi: {totalPoints}</Text>
            <Text style={styles.gameinfo}>Pisteet bonuksesta: {Bonuspoint}</Text>
            <View style={styles.flex}>{numb}</View>
            <Pressable style={styles.button} onPress={() => resetGame()}>
            <Text style={styles.buttonText}>Aloita peli</Text>
            <Text style={styles.buttonText}>{}</Text>
            </Pressable>
        </View>
    )
}