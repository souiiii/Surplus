import { useEffect } from "react";
import { App } from "@capacitor/app";
import { useLocation, useNavigate } from "react-router-dom";

const BackButtonHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let handler;

    App.addListener("backButton", () => {
      const { pathname, state } = location;

      const isExerciseDetailsPage = pathname.startsWith("/exercise/");
      const isHistoryPage = pathname.startsWith("/history");
      const fromPage = state?.from || "/home";
      const selectedDate = state?.selectedDate;

      if (isExerciseDetailsPage || isHistoryPage) {
        if (fromPage) {
          navigate(fromPage, { replace: true, state: { selectedDate } });
        } else {
          navigate(-1);
        }
      } else if (pathname === "/" || pathname === "/home") {
        App.exitApp();
      } else {
        navigate(-1);
      }
    }).then((h) => {
      handler = h;
    });

    return () => {
      if (handler?.remove) handler.remove();
    };
  }, [location, navigate]);

  return null;
};

export default BackButtonHandler;
