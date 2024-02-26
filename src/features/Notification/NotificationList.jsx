import React from "react";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import NotificationTemplate from "./NotificationTemplate";
import { useNotification } from "./useNotification";

function NotificationList() {
    const { notification, isLoading } = useNotification();

    if (isLoading) return <Spinner />;

    if (!notification || notification.length === 0) return <Empty>No Notifications To Display</Empty>;

    return (
        <ul>
            {notification.map((notificationData, index) => (
                <NotificationTemplate key={index} notificationData={notificationData}/>
            ))}
        </ul>
    );
}

export default NotificationList;
