import { createContext, ReactNode, useReducer, useState } from "react";

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

interface CyclesState{
    cycles: Cycle[];
    activeCycleId: string | null;
}

/* Criando um contexto para utilizar as propriedades no componente de forms e de countdown */
export const CyclesContext = createContext({} as CyclesContextType)


export function CyclesContextProvider({children}: CyclesContextProvider){
    const [cyclesState, dispatchCycles] = useReducer(
        (state: CyclesState,action:any)=>{

            switch(action.type){
                case 'ADD_NEW_CYCLE':
                    return{
                        ...state,
                        cycles: [...state.cycles, action.payload.newCycle],
                        activeCycleId: action.payload.newCycle.id,
                    }
                case 'INTERRUPT_CURRENT_CYCLE':
                    return{
                        ...state,
                        cycles: state.cycles.map((cycle) =>{
                            if(cycle.id === state.activeCycleId){
                                return{ ...cycle, interruptedDate: new Date()}
                            }else{
                                return cycle
                            }
                        }),
                        activeCycleId: null,
                    }
                case 'MARK_CURRENT_CYCLE_AS_FINISHED':
                    return{
                        ...state,
                        cycles: state.cycles.map(cycle =>{
                            if(cycle.id ===state.activeCycleId){
                                return{ ...cycle, finishedDate: new Date()}
                            }else{
                                return cycle
                            }
                        }),
                        activeCycleId: null,
                    }
                    default:
                        return state;
            }
        },
        {
            cycles:[],
            activeCycleId: null,
        },
    )
    const {cycles, activeCycleId} = cyclesState;

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle)=> cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }
    
    function markCurrentCyclesAsFinished(){
        /* Aqui será executado se meu ciclo chegar a zero */
       
        dispatchCycles({
            type:'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload:{
                activeCycleId,
            }
        })
    }

    function createNewCycle(data: CreateCycleData){
        const id = String(new Date().getTime());

        const newCycle: Cycle ={
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatchCycles({
            type:'ADD_NEW_CYCLE',
            payload:{
                newCycle,
            }
        })
        /* eu preciso resetar o tempo que já passou p/ não gerar bugs */
        setAmountSecondsPassed(0);
        //reset();
    }
    

    function interruptCurrentCycle(){
        
        dispatchCycles({
            type:'INTERRUPT_CURRENT_CYCLE',
            payload:{
                activeCycleId,
            }
        })
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
