import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// REACT
import { useEffect, useState } from "react";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
// import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// EXTERNAL LIBRARIES
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

// REDUX IMPORT
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherApiSlice";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.weather.isLoading);
  const temp = useSelector((state) => state.weather.weather);

  const { t, i18n } = useTranslation();

  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");

  const direction = locale === "ar" ? "rtl" : "ltr";

  // function handleLanguageClick() {
  //   const newLocale = locale === "en" ? "ar" : "en";
  //   setLocale(newLocale);
  // }

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(locale);
    moment.locale(locale);
    setDateAndTime(moment().locale(locale).format("LLLL"));
  }, [locale, i18n]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              dir={direction}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              <div>
                <div
                  className="up-details"
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={direction}
                >
                  <Typography
                    variant="h2"
                    style={{
                      marginRight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {t("Cairo")}
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>

                <hr />

                <div
                  className="details"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}

                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      <img src={temp.icon} alt="weather icon" />
                    </div>

                    <Typography variant="h6">{t(temp.description)}</Typography>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
                    </div>
                  </div>

                  <CloudIcon
                    className="cloudIcon"
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              dir={direction}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              {/* <Button
                style={{ color: "white" }}
                variant="text"
                onClick={handleLanguageClick}
              >
                {locale === "en" ? "Arabic" : "إنجليزي"}
              </Button> */}
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
