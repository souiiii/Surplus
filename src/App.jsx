import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Signup from "./pages/PublicPages/SignUp.jsx";
import Login from "./pages/PublicPages/Login";
import Home from "./pages/ProtectedPages/Home";
import History from "./pages/ProtectedPages/History";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotFound from "./components/NotFound.jsx";
import AddWorkOut from "./pages/ProtectedPages/AddWorkOut.jsx";
import ExerciseDetails from "./pages/ProtectedPages/ExerciseDetails.jsx";
import BackButtonHandler from "./components/BackButtonHandler.jsx";
import AddSet from "./pages/ProtectedPages/AddSet.jsx";
import PageWrapper from "./components/PageWrapper.jsx";
import React, { useEffect, useRef, useState } from "react";
import Accounts from "./pages/ProtectedPages/Accounts.jsx";
import About from "./pages/ProtectedPages/About.jsx";
import ChangeName from "./pages/ProtectedPages/ChangeName.jsx";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

function AnimatedRoutes() {
  const location = useLocation();
  const full = useRef(null);
  const half = useRef(null);
  const circle = useRef(null);
  const [loading , setLoading] = useState(true);

 useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // clean up on unmount
    };
  }, []);


  useEffect(function(){
    setTimeout(()=>setLoading(false),3200)
  },[])
  useEffect(function(){
    const t = gsap.timeline();
    t.to(full.current, {delay: 1.7, duration: 0.5, x: '0', opacity: 1, scale:1, ease:'power1.inOut'})
    .to(half.current,{x:"0", scale:1, ease: 'power1.inOut', duration:0.4},"-=0.4");
    const t2 = gsap.timeline();
    t2.to(circle.current, { scaleY: 0.1,  ease: 'power1.inOut',yoyo:true,  repeat: 2, delay: 0.7,
  transformOrigin: "center center", 
  duration: 0.2}).to(circle.current,{ scaleY: 1, ease: 'power1.inOut', transformOrigin: "center center", duration: 0.3})
  },[])
  return (
    <AnimatePresence mode="wait">
      {loading?
      <PageWrapper >
        <div className="logoDiv">
          <div className="svg-logo full" >
            
            <svg ref={full} className="svg-full" width="300" height="154.5" viewBox="0 0 200 103" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path style={{visibility: 'hidden'}} d="M31.8952 47.829C31.1988 47.7719 30.7778 48.0149 30.6322 48.5583C30.4812 49.1217 30.4952 49.7941 30.6741 50.5753C30.8275 51.3713 31.1627 52.1729 31.6797 52.98C33.0393 55.0698 35.2485 56.5245 38.3073 57.3441C39.8166 57.7485 41.2926 57.8744 42.7354 57.7218C43.9352 58.7982 44.7428 60.2116 45.158 61.962C45.5733 63.7125 45.5437 65.4731 45.0692 67.244C43.829 71.8724 40.94 74.9267 36.4023 76.4068C32.505 77.6704 28.1214 77.6497 23.2515 76.3448C19.6293 75.3742 16.6858 74.1649 14.4209 72.7169C12.1506 71.289 10.3924 69.761 9.14628 68.133C9.03932 66.6809 9.17725 65.2404 9.56009 63.8116C9.94293 62.3829 10.4819 61.1361 11.177 60.0714C11.8721 59.0067 12.6762 58.2192 13.5894 57.709C14.1387 58.3955 15.2388 59.2402 16.8896 60.2433C18.5404 61.2464 20.1003 61.9448 21.5693 62.3384C23.0384 62.732 24.0487 62.9057 24.6003 62.8594C25.1318 62.8077 25.4487 62.5906 25.5512 62.2083C25.5997 62.0272 25.6154 61.8481 25.5981 61.6709C24.8453 61.6633 23.9155 61.5112 22.8087 61.2146C18.8846 60.1632 15.933 58.3802 13.9539 55.8656C11.6291 52.8701 11.0599 49.1589 12.2461 44.7317C13.2922 40.8277 15.74 38.0111 19.5896 36.2819C23.7493 34.4416 28.7168 34.2953 34.4923 35.8428C37.6718 36.6947 40.364 37.6749 42.5689 38.7834C44.7792 39.8717 46.8321 41.306 48.7275 43.0865C49.649 45.6843 49.8078 48.1102 49.2039 50.364C48.5946 52.6379 47.3157 54.3119 45.3672 55.3858C43.4187 56.4598 41.3175 56.6948 39.0637 56.0909C36.7897 55.4816 35.0624 54.5227 33.8817 53.2142C32.6808 51.9003 32.0187 50.1052 31.8952 47.829Z" fill="#fdfbf9"/>
        <circle cx="24.5" cy="46.5" r="2.5" fill="#21272b"/>
        <path d="M77.88 49.44V72H69V68.56C68.3067 69.6267 67.3733 70.4933 66.2 71.16C65.0533 71.8267 63.68 72.16 62.08 72.16C59.4933 72.16 57.4667 71.2933 56 69.56C54.56 67.8267 53.84 65.48 53.84 62.52V49.44H62.68V61.4C62.68 62.4667 62.96 63.32 63.52 63.96C64.1067 64.5733 64.88 64.88 65.84 64.88C66.8267 64.88 67.6 64.5733 68.16 63.96C68.72 63.32 69 62.4667 69 61.4V49.44H77.88ZM92.7706 53.6C93.6773 52.2933 94.784 51.2533 96.0906 50.48C97.3973 49.68 98.7573 49.28 100.171 49.28V58.76H97.6506C95.9706 58.76 94.7306 59.0533 93.9306 59.64C93.1573 60.2267 92.7706 61.2667 92.7706 62.76V72H83.8906V49.44H92.7706V53.6ZM113.443 52.52C114.003 51.48 114.803 50.6667 115.843 50.08C116.909 49.4667 118.176 49.16 119.643 49.16C121.403 49.16 122.989 49.6267 124.403 50.56C125.816 51.4667 126.923 52.8 127.723 54.56C128.549 56.2933 128.963 58.3467 128.963 60.72C128.963 63.0933 128.549 65.16 127.723 66.92C126.923 68.6533 125.816 69.9867 124.403 70.92C122.989 71.8267 121.403 72.28 119.643 72.28C118.176 72.28 116.909 71.9867 115.843 71.4C114.803 70.7867 114.003 69.96 113.443 68.92V82.8H104.563V49.44H113.443V52.52ZM119.963 60.72C119.963 59.52 119.656 58.5867 119.043 57.92C118.429 57.2533 117.643 56.92 116.683 56.92C115.723 56.92 114.936 57.2533 114.322 57.92C113.709 58.5867 113.403 59.52 113.403 60.72C113.403 61.92 113.709 62.8533 114.322 63.52C114.936 64.1867 115.723 64.52 116.683 64.52C117.643 64.52 118.429 64.1867 119.043 63.52C119.656 62.8533 119.963 61.92 119.963 60.72ZM142.63 42.4V72H133.75V42.4H142.63ZM172.521 49.44V72H163.641V68.56C162.947 69.6267 162.014 70.4933 160.841 71.16C159.694 71.8267 158.321 72.16 156.721 72.16C154.134 72.16 152.107 71.2933 150.641 69.56C149.201 67.8267 148.481 65.48 148.481 62.52V49.44H157.321V61.4C157.321 62.4667 157.601 63.32 158.161 63.96C158.747 64.5733 159.521 64.88 160.481 64.88C161.467 64.88 162.241 64.5733 162.801 63.96C163.361 63.32 163.641 62.4667 163.641 61.4V49.44H172.521ZM188.571 72.28C186.438 72.28 184.545 71.9333 182.891 71.24C181.265 70.5467 179.971 69.5867 179.011 68.36C178.051 67.1333 177.505 65.7467 177.371 64.2H185.891C185.998 64.8667 186.278 65.36 186.731 65.68C187.211 66 187.811 66.16 188.531 66.16C188.985 66.16 189.345 66.0667 189.611 65.88C189.878 65.6667 190.011 65.4133 190.011 65.12C190.011 64.6133 189.731 64.2533 189.171 64.04C188.611 63.8267 187.665 63.5867 186.331 63.32C184.705 63 183.358 62.6533 182.291 62.28C181.251 61.9067 180.331 61.2667 179.531 60.36C178.758 59.4533 178.371 58.2 178.371 56.6C178.371 55.2133 178.731 53.96 179.451 52.84C180.198 51.6933 181.291 50.8 182.731 50.16C184.171 49.4933 185.918 49.16 187.971 49.16C191.011 49.16 193.385 49.9067 195.091 51.4C196.825 52.8933 197.865 54.84 198.211 57.24H190.331C190.198 56.6267 189.918 56.16 189.491 55.84C189.065 55.4933 188.491 55.32 187.771 55.32C187.318 55.32 186.971 55.4133 186.731 55.6C186.491 55.76 186.371 56.0133 186.371 56.36C186.371 56.8133 186.651 57.16 187.211 57.4C187.771 57.6133 188.665 57.84 189.891 58.08C191.518 58.4 192.891 58.76 194.011 59.16C195.131 59.56 196.105 60.2533 196.931 61.24C197.758 62.2 198.171 63.5333 198.171 65.24C198.171 66.5733 197.785 67.7733 197.011 68.84C196.238 69.9067 195.118 70.7467 193.651 71.36C192.211 71.9733 190.518 72.28 188.571 72.28Z" fill="#fdfbf9"/>
            </svg>
          </div>
          <div   className="svg-logo half">

            <svg ref={half} className={"svg-half"} width="300" height="154.5" viewBox="0 0 200 103" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.8952 47.829C31.1988 47.7719 30.7778 48.0149 30.6322 48.5583C30.4812 49.1217 30.4952 49.7941 30.6741 50.5753C30.8275 51.3713 31.1627 52.1729 31.6797 52.98C33.0393 55.0698 35.2485 56.5245 38.3073 57.3441C39.8166 57.7485 41.2926 57.8744 42.7354 57.7218C43.9352 58.7982 44.7428 60.2116 45.158 61.962C45.5733 63.7125 45.5437 65.4731 45.0692 67.244C43.829 71.8724 40.94 74.9267 36.4023 76.4068C32.505 77.6704 28.1214 77.6497 23.2515 76.3448C19.6293 75.3742 16.6858 74.1649 14.4209 72.7169C12.1506 71.289 10.3924 69.761 9.14628 68.133C9.03932 66.6809 9.17725 65.2404 9.56009 63.8116C9.94293 62.3829 10.4819 61.1361 11.177 60.0714C11.8721 59.0067 12.6762 58.2192 13.5894 57.709C14.1387 58.3955 15.2388 59.2402 16.8896 60.2433C18.5404 61.2464 20.1003 61.9448 21.5693 62.3384C23.0384 62.732 24.0487 62.9057 24.6003 62.8594C25.1318 62.8077 25.4487 62.5906 25.5512 62.2083C25.5997 62.0272 25.6154 61.8481 25.5981 61.6709C24.8453 61.6633 23.9155 61.5112 22.8087 61.2146C18.8846 60.1632 15.933 58.3802 13.9539 55.8656C11.6291 52.8701 11.0599 49.1589 12.2461 44.7317C13.2922 40.8277 15.74 38.0111 19.5896 36.2819C23.7493 34.4416 28.7168 34.2953 34.4923 35.8428C37.6718 36.6947 40.364 37.6749 42.5689 38.7834C44.7792 39.8717 46.8321 41.306 48.7275 43.0865C49.649 45.6843 49.8078 48.1102 49.2039 50.364C48.5946 52.6379 47.3157 54.3119 45.3672 55.3858C43.4187 56.4598 41.3175 56.6948 39.0637 56.0909C36.7897 55.4816 35.0624 54.5227 33.8817 53.2142C32.6808 51.9003 32.0187 50.1052 31.8952 47.829Z" fill="#fdfbf9"/>
        <circle ref={circle} className="circle" cx="24.5" cy="46.5" r="2.5" fill="#21272b"/>
        <path style={{visibility: 'hidden'}}  d="M77.88 49.44V72H69V68.56C68.3067 69.6267 67.3733 70.4933 66.2 71.16C65.0533 71.8267 63.68 72.16 62.08 72.16C59.4933 72.16 57.4667 71.2933 56 69.56C54.56 67.8267 53.84 65.48 53.84 62.52V49.44H62.68V61.4C62.68 62.4667 62.96 63.32 63.52 63.96C64.1067 64.5733 64.88 64.88 65.84 64.88C66.8267 64.88 67.6 64.5733 68.16 63.96C68.72 63.32 69 62.4667 69 61.4V49.44H77.88ZM92.7706 53.6C93.6773 52.2933 94.784 51.2533 96.0906 50.48C97.3973 49.68 98.7573 49.28 100.171 49.28V58.76H97.6506C95.9706 58.76 94.7306 59.0533 93.9306 59.64C93.1573 60.2267 92.7706 61.2667 92.7706 62.76V72H83.8906V49.44H92.7706V53.6ZM113.443 52.52C114.003 51.48 114.803 50.6667 115.843 50.08C116.909 49.4667 118.176 49.16 119.643 49.16C121.403 49.16 122.989 49.6267 124.403 50.56C125.816 51.4667 126.923 52.8 127.723 54.56C128.549 56.2933 128.963 58.3467 128.963 60.72C128.963 63.0933 128.549 65.16 127.723 66.92C126.923 68.6533 125.816 69.9867 124.403 70.92C122.989 71.8267 121.403 72.28 119.643 72.28C118.176 72.28 116.909 71.9867 115.843 71.4C114.803 70.7867 114.003 69.96 113.443 68.92V82.8H104.563V49.44H113.443V52.52ZM119.963 60.72C119.963 59.52 119.656 58.5867 119.043 57.92C118.429 57.2533 117.643 56.92 116.683 56.92C115.723 56.92 114.936 57.2533 114.322 57.92C113.709 58.5867 113.403 59.52 113.403 60.72C113.403 61.92 113.709 62.8533 114.322 63.52C114.936 64.1867 115.723 64.52 116.683 64.52C117.643 64.52 118.429 64.1867 119.043 63.52C119.656 62.8533 119.963 61.92 119.963 60.72ZM142.63 42.4V72H133.75V42.4H142.63ZM172.521 49.44V72H163.641V68.56C162.947 69.6267 162.014 70.4933 160.841 71.16C159.694 71.8267 158.321 72.16 156.721 72.16C154.134 72.16 152.107 71.2933 150.641 69.56C149.201 67.8267 148.481 65.48 148.481 62.52V49.44H157.321V61.4C157.321 62.4667 157.601 63.32 158.161 63.96C158.747 64.5733 159.521 64.88 160.481 64.88C161.467 64.88 162.241 64.5733 162.801 63.96C163.361 63.32 163.641 62.4667 163.641 61.4V49.44H172.521ZM188.571 72.28C186.438 72.28 184.545 71.9333 182.891 71.24C181.265 70.5467 179.971 69.5867 179.011 68.36C178.051 67.1333 177.505 65.7467 177.371 64.2H185.891C185.998 64.8667 186.278 65.36 186.731 65.68C187.211 66 187.811 66.16 188.531 66.16C188.985 66.16 189.345 66.0667 189.611 65.88C189.878 65.6667 190.011 65.4133 190.011 65.12C190.011 64.6133 189.731 64.2533 189.171 64.04C188.611 63.8267 187.665 63.5867 186.331 63.32C184.705 63 183.358 62.6533 182.291 62.28C181.251 61.9067 180.331 61.2667 179.531 60.36C178.758 59.4533 178.371 58.2 178.371 56.6C178.371 55.2133 178.731 53.96 179.451 52.84C180.198 51.6933 181.291 50.8 182.731 50.16C184.171 49.4933 185.918 49.16 187.971 49.16C191.011 49.16 193.385 49.9067 195.091 51.4C196.825 52.8933 197.865 54.84 198.211 57.24H190.331C190.198 56.6267 189.918 56.16 189.491 55.84C189.065 55.4933 188.491 55.32 187.771 55.32C187.318 55.32 186.971 55.4133 186.731 55.6C186.491 55.76 186.371 56.0133 186.371 56.36C186.371 56.8133 186.651 57.16 187.211 57.4C187.771 57.6133 188.665 57.84 189.891 58.08C191.518 58.4 192.891 58.76 194.011 59.16C195.131 59.56 196.105 60.2533 196.931 61.24C197.758 62.2 198.171 63.5333 198.171 65.24C198.171 66.5733 197.785 67.7733 197.011 68.84C196.238 69.9067 195.118 70.7467 193.651 71.36C192.211 71.9733 190.518 72.28 188.571 72.28Z" fill="#fdfbf9"/>
            </svg>
          </div>

          
        </div>
      </PageWrapper>:
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <Signup />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/history"
            element={
              <PageWrapper>
                <History />
              </PageWrapper>
            }
          />
          <Route
            path="/addWorkout"
            element={
              <PageWrapper>
                <AddWorkOut />
              </PageWrapper>
            }
          />
          <Route
            path="/account"
            element={
              <PageWrapper>
                <Accounts />
              </PageWrapper>
            }
          />
          <Route
            path="/account/editName"
            element={
              <PageWrapper>
                <ChangeName/>
              </PageWrapper>
            }
          />
          <Route
            path="/add-set/:date/:exerciseId"
            element={
              <PageWrapper>
                <AddSet />
              </PageWrapper>
            }
          />
          <Route
            path="/exercise/:date/:exerciseId"
            element={
              <PageWrapper>
                <ExerciseDetails />
              </PageWrapper>
            }
          />
          <Route path="/about" element={
            <PageWrapper>

            <About />
            </PageWrapper>
            }/>
          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
      }
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BackButtonHandler />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/PublicPages/SignUp.jsx";
// import Login from "./pages/PublicPages/Login";
// import Home from "./pages/ProtectedPages/Home";
// import History from "./pages/ProtectedPages/History";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import NotFound from "./components/NotFound.jsx";
// import AddWorkOut from "./pages/ProtectedPages/AddWorkOut.jsx";
// import ExerciseDetails from "./pages/ProtectedPages/ExerciseDetails.jsx";
// import BackButtonHandler from "./components/BackButtonHandler.jsx";
// import AddSet from "./pages/ProtectedPages/AddSet.jsx";

// export default function App() {
//   return (
//     // <div style={{ paddingTop: "env(safe-area-inset-top)" }}>Hello wow yaar</div>
//     <BrowserRouter>
//       <BackButtonHandler />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/signup" element={<Signup />} />{" "}
//         {/* Corrected casing to match component name */}
//         <Route path="/login" element={<Login />} />
//         {/* Protected Routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />{" "}
//           {/* Added to match navigation in SignUp */}
//           <Route path="/history" element={<History />} />
//           <Route path="/addWorkout" element={<AddWorkOut />} />
//           <Route path="/add-set/:date/:exerciseId" element={<AddSet />} />
//           <Route
//             path="/exercise/:date/:exerciseId"
//             element={<ExerciseDetails />}
//           />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
