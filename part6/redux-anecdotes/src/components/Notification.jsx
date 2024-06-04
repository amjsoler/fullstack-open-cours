import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {clearNotification, setNotificationThunk} from "../reducers/notificationReducer.js";

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNotificationThunk(notification, 5))
  }, []);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
      <div style={style}>
        {notification}
      </div>
  )
}

export default Notification