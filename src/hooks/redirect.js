import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function useRedirectPublicUser() {
  const auth = useSelector((state) => state.auth.sessionToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate("/");
    }
  }, [auth, navigate]);
}

export function useRedirectPrivateUser() {
  const auth = useSelector((state) => state.auth.sessionToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== null) {
      navigate("/");
    }
  }, [auth, navigate]);
}
