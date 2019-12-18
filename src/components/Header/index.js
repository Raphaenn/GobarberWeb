import React from "react";
import { Link } from "react-router-dom";

import Notifications from "../../components/notifications";

import logoP from "../../assets/logo_purple.svg";
import { Container, Content, Profile } from "./styles";

export default function Header() {
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
                            <strong>Raphael Neves</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img src="https://api.adorable.io/avatars/50/abott@adorable.png" alt="Profile" />
                    </Profile>
                </aside>
            </Content>
        </Container>
    )
}

