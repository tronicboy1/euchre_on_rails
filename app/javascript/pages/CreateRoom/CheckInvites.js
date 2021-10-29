import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkInvites } from "../../store/auth-actions";

import styles from "./CheckInvites.module.css";

import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";

const CheckInvites = ({ token, userId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [bump, setBump] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBump(false);
    }, 500);
    return () => {
        clearTimeout(timer);
    };
  }, [bump]);

  const fetchInvites = () => {
    dispatch(checkInvites(token, userId));
    setBump(true);
  };

  return (
    <Card className="form">
      <div className={bump ? styles.bump : ""}>
        <Button onClick={fetchInvites} style={{ width: "100%" }}>
          {loading ? "Loading" : "Check for Invites"}
        </Button>
      </div>
    </Card>
  );
};

export default CheckInvites;
