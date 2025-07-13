import { Play } from "phosphor-react";
import { Colon, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, StartButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';

export function Home(){

    const { register, handleSubmit, watch } = useForm();

    function handleCreateNewCycle(data){
        console.log(data)
    }

    const task = watch('task');
    const isSubmitDisabled= !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        list="task-suggestions" 
                        placeholder="Informe o nome do seu projeto"
                        {...register('task')}

                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />

                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        step={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                        
                    />
                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Colon>:</Colon>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartButton>
            </form>
        </HomeContainer>

    )
}