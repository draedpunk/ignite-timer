import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartButton, StopButton } from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";


interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId);

    
    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        setCycles((state) => [...cycles, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);


        reset();
    }

    function handleInterruptCycle() {

        setCycles( state =>
            state.map((cycle) => {
                if (cycle.id == activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        );
        setActiveCycleId(null);

    }

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    // preenche uma string de tamanho especifico com um certo caracter; nesse caso, o 0 na frente para 
    // todos os numeros menores que 10
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
    }, [minutes, seconds, activeCycle]);

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <NewCycleForm />
                <Countdown />

                {activeCycle ? (
                    <StopButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopButton>

                ) : (
                    <StartButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartButton>
                )}
            </form>
        </HomeContainer>

    )
}