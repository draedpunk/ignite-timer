import { Play } from "phosphor-react";
import { Colon, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, StartButton, TaskInput } from "./styles";

export function Home(){
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" list="task-suggestions" placeholder="Informe o nome do seu projeto"/>

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

                <StartButton disabled type="submit">
                    <Play size={24}/>
                    Começar
                </StartButton>
            </form>
        </HomeContainer>

    )
}