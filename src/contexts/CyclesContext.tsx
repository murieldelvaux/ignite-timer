import { createContext, ReactNode, useState } from "react";

interface CreateCycleData{
    task: string;
    minutesAmount: number;
}

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate ?: Date;
}

/* vamos criar uma interface para utilizarmos em nosso contexto, para facilitar a tipagem */
interface CyclesContextType{
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCyclesAsFinished:()=>void;
    setSecondsPassed: (seconds: number)=>void;
    createNewCycle:(data: CreateCycleData)=>void;
    interruptCurrentCycle:()=>void;
}

interface CyclesContextProvider{
    children: ReactNode;
}

/* Criando um contexto para utilizar as propriedades no componente de forms e de countdown */
export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({children}: CyclesContextProvider){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id ===activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }
    
    function markCurrentCyclesAsFinished(){
        /* Aqui será executado se meu ciclo chegar a zero */
        setCycles((state)=>
            state.map(cycle =>{
                if(cycle.id ===activeCycleId){
                    return{ ...cycle, finishedDate: new Date()}
                }else{
                    return cycle
                }
            }),
        )
    }

    function createNewCycle(data: CreateCycleData){
        const id = String(new Date().getTime());

        const newCycle: Cycle ={
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        /* eu preciso resetar o tempo que já passou p/ não gerar bugs */
        setAmountSecondsPassed(0);
        //reset();
    }
    

    function interruptCurrentCycle(){
        setCycles((state)=>
            state.map(cycle =>{
            if(cycle.id ===activeCycleId){
                return{ ...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        }),
        )
        setActiveCycleId(null)
    }
    return(
        <CyclesContext.Provider 
            value={{
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCyclesAsFinished, 
                amountSecondsPassed,
                setSecondsPassed,
                interruptCurrentCycle,
                createNewCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
