import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountDownContainer, Separator } from "./styles";



export function Countdown(){
    const {
        activeCycle, 
        activeCycleId, 
        markCurrentCyclesAsFinished, 
        amountSecondsPassed, 
        setSecondsPassed
    } = useContext(CyclesContext)
   
    const totalSeconds = activeCycle? activeCycle.minutesAmount*60 : 0;

    /* Reduzindo o contador */
    useEffect(()=>{
        let interval:number;

        if(activeCycle){
            interval = setInterval(()=>{
                const secondsDifference = differenceInSeconds(
                    /* differenceInSeconds(data atual, data que o ciclo começou) */
                    new Date(), 
                    activeCycle.startDate
                )

                if(secondsDifference >= totalSeconds){
                    markCurrentCyclesAsFinished();
                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                }else{
                    setSecondsPassed(secondsDifference);
                }
            },1000)
        }

        //eu preciso de uma função que limpe os intervalos que não estou mais usando
        return()=>{
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCyclesAsFinished, setSecondsPassed])
    const currentSeconds = activeCycle? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds/60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2,'0'); // eu quero que meu minuto tenha 2 caracteres, caso ele não tenha ele terá 0 no inicio
    const seconds = String(secondsAmount).padStart(2,'0'); // eu quero que meu minuto tenha 2 caracteres, caso ele não tenha ele terá 0 no inicio
    
    /* toda vez que meus minutos e segundos mudarem, eu irei atualizar o titulo da página
        OU SEJA  -> vou ter o cronometro no titulo da aba do chrome por exemplo
    */
    useEffect(()=>{
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    })

    return(
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>

    )
}