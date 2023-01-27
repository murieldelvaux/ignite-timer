import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCyclesAsFinishedAction,
} from "../reducers/cycles/actions";
import { ICycle, cyclesReducer } from "../reducers/cycles/reducerCycle";

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

/* vamos criar uma interface para utilizarmos em nosso contexto, para facilitar a tipagem */
interface ICyclesContextType {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCyclesAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface ICyclesContextProvider {
  children: ReactNode;
}

/* Criando um contexto para utilizar as propriedades no componente de forms e de countdown */
export const CyclesContext = createContext({} as ICyclesContextType);

export function CyclesContextProvider({ children }: ICyclesContextProvider) {
  const [cyclesState, dispatchCycles] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCyclesAsFinished() {
    /* Aqui será executado se meu ciclo chegar a zero */

    dispatchCycles(markCurrentCyclesAsFinishedAction());
  }

  function createNewCycle(data: ICreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatchCycles(addNewCycleAction(newCycle));
    /* eu preciso resetar o tempo que já passou p/ não gerar bugs */
    setAmountSecondsPassed(0);
    //reset();
  }

  function interruptCurrentCycle() {
    dispatchCycles(interruptCurrentCycleAction());
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCyclesAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        interruptCurrentCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
