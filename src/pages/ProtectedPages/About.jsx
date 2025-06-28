import NavBar from "../../components/NavBar"
import styles from "./About.module.css"
export default function About(){
    return <div className={styles.parent}>
        <div className={styles.aboutContainer}>

        <h1 className={styles.heading1}>About Surplus</h1>
        <div className={styles.contentContainer
        }>
            Welcome to <span className={styles.highlightedText}>Surplus</span>, your all-in-one fitness companion — designed to help you track workouts, monitor progress, and stay consistent with your fitness goals. 
<br/><br/>
Built with a focus on simplicity and performance, this cross-platform app lets you:<br/>
-Log exercises, sets, reps, and weight.<br/>
-Track your progress over time.<br/>
-Securely manage your fitness data with personalized accounts
        </div>
        </div>
        <div className={styles.aboutContainer}>
            <h1 className={styles.heading2}>About me</h1>
            <div className={styles.contentContainer
        }><span className={styles.quote}>“Hey, I’m <span className={styles.highlightedText}>Shahid</span> — a developer, fitness enthusiast, and someone who’s constantly chasing growth, both in code and in the gym.<br/><br/>

I built this app as a personal solution to a problem I faced: tracking workouts without switching between cluttered apps and spreadsheets. I wanted something clean, fast, and reliable — so I built it myself.”</span>
<br/><br/>
— Shahid</div>
        </div>
        <NavBar/>
    </div>
}