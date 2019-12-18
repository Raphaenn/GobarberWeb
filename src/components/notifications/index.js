import React, { useState, useEffect, useMemo } from "react";
import { MdNotifications } from "react-icons/md";
import { parseISO, formatDistance } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "../../services/api";

import { Container, Badge, NotificationList, Scroll, Notification } from "./styles";

export default function Notifications() {

    const [ visible, setVisible] = useState(false);
    const [ notifications, setNotificatios ] = useState([]);

    // chance ball notification - percorrer array para achar um read = false e retornar true or false através dos !!
    const hasUnread = useMemo(
        () => !!notifications.find(notification => notification.read === false),
        [notifications]
    );

    // conectar a api para pegar as notificações e adicionar o tempo das mais recentes
    useEffect(() => {
        async function loadNotifications() {
            const response = await api.get("notifications");

            const data = response.data.map(notification => ({
                ...notification,
                timeDistance: formatDistance(
                    parseISO(notification.createdAt),
                    new Date(),
                    {addSuffix: true, locale: pt}
                )
            }))
            
            setNotificatios(data);            
        }

        loadNotifications()
    }, []);

    // Exibir e escnder notificações
    function handleToggleVisible() {
        setVisible(!visible)
    };

    // Marcar notificação como lida
    async function handleMarkRead(id) {
        await api.put(`notifications/${id}`);

        setNotificatios(
            notifications.map(notification => notification._id === id ? { ...notification, read:true } : notification)
        )
    }

    return (
        <Container>
            <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>

            <NotificationList visible={visible}>
                <Scroll>
                    {notifications.map(notification => (
                        <Notification key={notification._id} unread={!notification.read}>
                        <p>{notification.content}</p>
                        <time>{notification.timeDistance}</time>
                        <button type="button" onClick={() => {handleMarkRead(notification._id)}} >Marcar como lida</button>
                    </Notification>
                    ))}
                </Scroll>
            </NotificationList>
        </Container>
    )
}
