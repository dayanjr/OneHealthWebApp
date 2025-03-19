import pool from "../model/db.js";

export const selectAllNotifications = () => {
    const notifications = pool.query("SELECT * FROM notifications");
    return notifications;
  }
  
  export const selectUserNotifications = (id: number) => {
    const notifications = pool.query("SELECT n.notification_id,\
    n.notification_title,\
    n.notification_text,\
    un.recieved_at,\
    un.user_notification_id \
    FROM notifications n \
    JOIN user_notifications un ON n.notification_id = un.notification_id\
    JOIN users u ON un.user_id = u.id \
    WHERE u.id = $1\
    ORDER BY un.recieved_at DESC", [id]);
    return notifications;
  }
  
  export const createNotification = (user_id: string, notification_id: string) => {
    pool.query("INSERT INTO user_notifications (user_id, notification_id) VALUES($1, $2)", [user_id, notification_id]);
  }