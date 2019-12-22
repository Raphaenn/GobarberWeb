import styled from "styled-components";

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;

    header {
        display: flex;
        align-self: center; 
        align-items: center;

        button {
            border: 0;
            background: none;
        }

        strong {
            color: #FFF;
            font-size: 24px;
            margin: 0 15px;
        }
    }

    ul {
        display: grid; /* display em formato tabela */
        grid-template-columns: repeat(2, 1fr); /* Criar duas colunas com mesma largura */
        grid-gap: 15px; /* altura entre linhas */
        margin-top: 30px;
    }
`;

export const Time = styled.li`
    padding: 20px;
    border-radius: 4px;
    background: #fff;

    opacity: ${props => props.past ? 0.7 : 1};

    strong {
        display: block;
        color: ${props => props.available ? '#7159c1' : '#9E031E'};
        font-size: 20px;
        font-weight: normal;
    }

    span {
        display: block;
        margin-top: 3px;
        color: ${props => props.available ? '#666' : '#9E031E'};
    }
`;