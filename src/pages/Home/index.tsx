import { HandPalm, Play } from "phosphor-react";
import {  
    HomeContainer, 
    StartCountDownButton, 
    StopCountDownButton,
} from "./styles";

import {useForm, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useContext} from "react";

import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1, "O valor deve ser no mínimo de 1 minuto").max(60, "O valor deve ser menor do que 60 minutos"),
})

/* dessa forma não precisamos criar uma interface, pois ele cria automaticamente com o zod */
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home(){
    /* utilizando o contexto que criamos na pasta context */
    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        /* Como boa prática, coloque sempre os defaultValues para a função reset funcionar corretamente */
        defaultValues:{
            task:'',
            minutesAmount:0,
        }
    });
    // desestruturando newCycleForm para pegar as funções {register, handleSubmit, watch, reset }
    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data);
        reset();
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
               
                {
                    activeCycle?(
                        <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
                            <HandPalm size={24} />
                            Interromper
                        </StopCountDownButton>
                    ):(
                        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24} />
                            Começar
                        </StartCountDownButton>
                    )
                }
                
            </form>
        </HomeContainer>
    )
}