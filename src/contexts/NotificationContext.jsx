import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuth } from './AuthContext';
import api from '../services/api';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);

  const doctorId = user?.DoctorId?.toString() || user?.id?.toString() || user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']?.toString();

  const fetchUnreadData = useCallback(async () => {
    if (!doctorId) return;
    try {
      const [countRes, notifRes] = await Promise.all([
        api.get(`/Chat/UnreadCount/${doctorId}`),
        api.get(`/Chat/Notifications/${doctorId}`)
      ]);
      setUnreadCount(countRes.data);
      setNotifications(notifRes.data || []);
    } catch (err) {
      console.error('Failed to fetch notification data', err);
    }
  }, [doctorId]);

  useEffect(() => {
    if (isLoggedIn && doctorId) {
      fetchUnreadData();
      
      const hubUrl = (api.defaults.baseURL || '').replace('/api', '') + '/chatHub';
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${hubUrl}?userId=${doctorId}`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

      newConnection.on('ReceiveMessage', (message) => {
        // If message is for me and I'm not the sender
        if (message.receiverId === doctorId) {
          setUnreadCount(prev => prev + 1);
          setNotifications(prev => [message, ...prev].slice(0, 10));
          
          // Optionally play sound or show browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`New message from ${message.patient?.fullName || 'Patient'}`, {
              body: message.content,
              icon: '/logo_edit.png'
            });
          }
        }
      });

      newConnection.start()
        .then(() => {
          console.log('Notification Hub Connected');
          setConnection(newConnection);
        })
        .catch(err => console.error('Notification Hub Error', err));

      return () => {
        if (newConnection) newConnection.stop();
      };
    } else {
      setUnreadCount(0);
      setNotifications([]);
      if (connection) {
        connection.stop();
        setConnection(null);
      }
    }
  }, [isLoggedIn, doctorId]);

  const markAllAsRead = async (senderId) => {
    if (!doctorId) return;
    try {
      await api.post(`/Chat/MarkAsRead?receiverId=${doctorId}&senderId=${senderId}`);
      fetchUnreadData();
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const getUnreadCountForPatient = (pId) => {
    return notifications.filter(n => n.senderId === pId.toString()).length;
  };

  return (
    <NotificationContext.Provider value={{ unreadCount, notifications, fetchUnreadData, markAllAsRead, getUnreadCountForPatient }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
