import { useState } from 'react';
import BackButton from '../../components/BackButton';
import styles from './ChangeName.module.css';
import { useChangeName } from '../../hooks/useChangeName';
import { useNavigate } from 'react-router-dom';

export default function ChangeName() {
    const navigate = useNavigate()
     const { changeName, loading, error } = useChangeName();
    const [name , setName] = useState("");

   async function handleSubmit(e){
        e.preventDefault();
        try{
            if (!name) return;
            await changeName(name);
            setName("");
             navigate('/account')
        }
        catch(err){
            console.log(err.message);
        }
      
    }
     return <div className={styles.seniorParent}>
      <BackButton/>
<div className={styles.parent}>
    <div className={styles.container}>
        <h1 className={styles.heading}>Edit Name</h1>
        <p className={styles.desc}>You can set your name to anything that fits your vibe. We treat it more like your nickname.</p>
        <form className="inputFieldsContainer" onSubmit={handleSubmit}>
                  <input
                    className="inputFields"
                    type="name"
                    placeholder="Enter new name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                 
                  <button
                   type='submit'
                    disabled={loading}
                    className={styles.doneButton}
                  >
                    {loading ? "Changing..." : "Done"}
                  </button>
                  {error && <p style={{ color: "red" , marginTop:'2rem' }}>{error}</p>}
                </form>
    </div>
  </div>
     </div>
}