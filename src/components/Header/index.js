import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Notifications from "../../components/notifications";

import logoP from "../../assets/logo_purple.svg";
import { Container, Content, Profile } from "./styles";

export default function Header() {

    // exibir em tempo real as informações do usuário no header
    const profile = useSelector(state => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <img src={logoP} alt="Gobarber" />
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                <Notifications />
                
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img src={ profile.avatar.name || "https://api.adorable.io/avatars/50/abott@adorable.png"} alt="Profile" />
                    </Profile>
                </aside>
            </Content>
        </Container>
    )
}

