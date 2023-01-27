import { ActionTypes } from "./actions";
import { produce } from "immer";

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: ICyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      /* 
      return {
      ...state,
      cycles: [...state.cycles, action.payload.newCycle],
      activeCycleId: action.payload.newCycle.id,
      }; 
      
      Com o immer esse return vai ficar ainda mais simples
      */
      return produce(state, (draft) => {
        /*
        state -> informação que eu quero modificar
        draft -> "rascunho", aqui dentreo eu faço as modificações que eu quero fazer
        
        ********* O DRAFT TEM O MESMO FORMATO QUE DO MEU STATE, É UMA VARIÁVEL COM OS MESMOS VALORES DO MEU STATE. *********
        *** A diferença deles é que eu posso usar o draft como uma estrutura de dados mutável.

      */
        draft.cycles.push(action.payload.newCycle); // Assimm podemos usar o push, que é um método que não respeita a imutabilidade, pois a lib por baixo dos panos converte em alterações imutáveis.
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      /* return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      }; */

      /* crio essa variável p/ procurar o indice do ciclo que é igual o ciclo ativo */
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });
      if (currentCycleIndex < 0) {
        return state; /* Retorno zero, pois se o findIndex não encontrar nenhum ciclo ativo, ele retorna -1 */
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date(); //retorna a data atual.
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      /*  return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      }; */
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });
      if (currentCycleIndex < 0) {
        return state; /* Retorno zero, pois se o findIndex não encontrar nenhum ciclo ativo, ele retorna -1 */
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date(); //retorna a data atual.
      });
    }
    default:
      return state;
  }
}
