import { Play } from "phosphor-react";
import { 
    CountDownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountDownButton, 
    TaskInput 
} from "./styles";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(5, "O valor deve ser no mínimo de 5 minutos").max(60, "O valor deve ser menor do que 60 minutos"),
})

/* interface NewCycleFormData{
    task: string;
    minutesAmount: number;
}
*/

/* dessa forma não precisamos criar uma interface, pois ele cria automaticamente com o zod */
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const {register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        /* Como boa prática, coloque sempre os defaultValues para a função reset funcionar corretamente */
        defaultValues:{
            task:'',
            minutesAmount:0,
        }
    });

    const task = watch('task');
    const isSubmitDisabled = !task;
    
    function handleCreateNewCycle(data: NewCycleFormData){
        console.log(data);
        reset();
    }

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')}
                    />
                    <datalist id="task-suggestions">
                        <option value={"projeto 1"} />
                        <option value={"projeto 2"} />
                        <option value={"projeto 3"} />
                        <option value={"projeto 4"} />
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>

                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}