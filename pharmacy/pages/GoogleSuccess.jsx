import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function GoogleSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    if (token) {

      localStorage.setItem("token", token);

      navigate("/");
    }

  }, []);

  return <p>Logging you in...</p>;
}