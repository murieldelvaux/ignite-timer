import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";

export function History(){
    const {cycles} = useContext(CyclesContext)
    
    return(
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cycles.map((data)=>{
                                console.log(data.finishedDate)
                                return(
                                    <tr key={data.id}>
                                        <td>{data.task}</td>
                                        <td>{data.minutesAmount}</td>
                                        <td>{formatDistanceToNow(data.startDate,{
                                            addSuffix: true,
                                            locale: ptBR
                                        })}</td>
                                        <td>
                                            {
                                               data.finishedDate &&  <Status statusCollor="green">Concluído</Status>
                                            }
                                            {
                                               data.interruptedDate &&  <Status statusCollor="red">Interrompido</Status>
                                            }
                                            {
                                               (!data.interruptedDate && !data.finishedDate) &&  <Status statusCollor="yellow">Em Andamento</Status>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}