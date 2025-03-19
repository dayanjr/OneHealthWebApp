// import { ClassNames } from '@emotion/react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useAppContext } from '../contexts/userContexts';

interface SelectedNotification {
    key: string | null;
    value: string | null;
    date: string;
}

interface AllNotificationProps {
    notification_id: string;
    notification_title: string;
    notification_text: string;
    created_at: string;
}

interface UserNotificationProps {
    user_notification_id: number;
    notification_id: number;
    notification_title: string;
    notification_text: string;
    recieved_at: string;
}

export default function Dashboard() {
    // var notifications = {
    //     "Your medication is due for a refill": "Your medication [med name] is due for a refill! Be sure to refill it at your pharmacy of choice before your next dose on [date].",
    //     "Don't forget to log when you take your medication!": "Logging when you take your medication will help you gain rewards, and help your doctor know that you've taken your medications.",
    //     "New study released about your medication": "Your medication [med name] has a new study on it! Read the results here [link]",
    //     "Password has been reset": "You password was reset successfully on [date]. If this was NOT you, please reset your password immediately, or contact [email/number] right away! If this WAS you that changed your password, you may ignore this message.",
    //     "Welcome to OneHealth!": "We want to thank you for putting your health first and signing up for OneHealth! We can't wait for you to be able to start earning rewards and seeing the benefits of taking care of yourself; you deserve it!",
    // };
    const { sharedValue } = useAppContext();
    const [notifications] = useState<AllNotificationProps[]>([]);
    const [userNotification, setUserNotifications] = useState<UserNotificationProps[]>([]);
    // const allNotifications = Object.entries(notifications);

    const [selectedNotification, setSelectedNotification] = useState<SelectedNotification>({key:null, value:null,date:''});
    const [showAll, setShowAll] = useState(false);

    const options:any  = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};

    // function getNotifications(){
    //     axios.get('http://localhost:3000/users/notifications')
    //     .then((response) => {
    //         setAllNotifications(response.data);
    //         console.log(response.data);
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // }

    function addNotification(){
        axios.post('http://localhost:3000/users/notifications', {
          user_id: sharedValue.id,
          notification_id: Math.floor(Math.random() * 6)+1,
        })
        .then((response) => {
          console.log(response);
          getUserNotifications();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    function getUserNotifications(){
        axios.get(`http://localhost:3000/users/notifications/${sharedValue.id}`).
        then((response) => {
            console.log(response.data);
            setUserNotifications(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleNotificationClick = (key:string, value:string, date:string) => {
        setSelectedNotification({ key, value, date });
    };
    // const handleShowAllClick = () => {
    //     setShowAll(true);
    //     getNotifications();
    // };
    const handleBackClick = () => {
        setSelectedNotification({key:null,value:null,date:''});
        setShowAll(false);
    };

    useEffect(() => {
        getUserNotifications();
    }, []);

    // To show the notification details on the right side of the page instead of in an overlay,
    // just move the conditionals outside of "notification-preview"
    return(
        <>
            <div id = "notification-preview" className = "card">
                <button onClick={addNotification}>Get Notification</button>
                <h2>Notifications:</h2>
                {[...userNotification].sort((a,b)=> {
            const dateA = new Date(a.recieved_at).getTime();
            const dateB = new Date(b.recieved_at).getTime();
            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
            return 0;
        }).map((notification) => (
                    <div className = "notification-button" key={notification.user_notification_id} onClick={() => handleNotificationClick(notification.notification_title, notification.notification_text, notification.recieved_at)}>
                        {notification.notification_title}
                    </div>
                ))}
                {!selectedNotification.key && !showAll ? (
                    <></>
                ) : selectedNotification.key ? (
                        <div className="overlay">
                            <div className="card">
                                <h2>{selectedNotification.key}</h2>
                                <p>Recieved at: {new Date(selectedNotification.date).toLocaleString('en-US', options)}</p>
                                <p>{selectedNotification.value}</p>
                                <button onClick={handleBackClick}>Back</button>
                            </div>
                        </div>
                    ) : (
                        <div className="overlay">
                            <div className="card">
                                {notifications.map((notification) => (
                                    <div className = "notification-button" key={notification.notification_id} onClick={() => handleNotificationClick(notification.notification_title, notification.notification_text, notification.created_at)}>
                                        {notification.notification_title}
                                    </div>
                                ))}
                                <button onClick={handleBackClick}>Back</button>
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
}