import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, setSeconds, setMilliseconds ,setHours, setMinutes, isBefore, isEqual, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import api from "../../services/api";

import { Container, Time } from "./styles";
import { utcToZonedTime } from 'date-fns-tz';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Dashboard() {

    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        async function loadSchedule() {
             const response = await api.get('schedule', { 
                 params: { date },
              });
              // pegar time zone do usuário logado
              const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              
              const data = range.map(hour => {
                    const CheckDate = setMilliseconds(setSeconds(setMinutes(setHours(date, hour),0),0),0);
                    const compareDate = utcToZonedTime(CheckDate, timezone);

                    // comparar as datas atuais e de agendamento
                    //indica se agendamento já passou
                    return {
                        time: `${hour}:00h`,
                        past: isBefore(compareDate, new Date()),
                        appointments: response.data.find(a => 
                            isEqual(parseISO(a.date), compareDate)
                        ),
                    }
              });
              setSchedule(data);
         }
         loadSchedule();
     }, [date]);

    // formatar data
    const dataFormatted = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }), 
        [date]
);

    function hadlePrevDate() {
        setDate(subDays(date, 1))
    };

    function handleNextDate() {
        setDate(addDays(date, 1))
    };



    return (
        <Container>
            <header>
                <button type="button" onClick={hadlePrevDate}>
                    <MdChevronLeft size={30} color="#fff"/>
                </button>
                <strong>{dataFormatted}</strong>
                <button type="button" onClick={handleNextDate}>
                        <MdChevronRight size={30} color="#fff"/>
                    </button>
            </header>
{console.log(schedule)}
            <ul>
                {schedule.map(sch => (
                    <Time key={sch.time} past={sch.past} available={!sch.appointments}>
                    <strong> {sch.time} </strong>
                    <span>{sch.appointments ? sch.appointments.user.name : 'Em aberto'}</span>
                </Time>
                ))}
            </ul>
        </Container>
    )
}