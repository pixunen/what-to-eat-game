import styles from './styles/page.module.css'
import { getData } from './lib/data-service';

export default async function Home() {
  const data = getData();
  return (
    <>
    <div className={styles.title}>
      <h1>What to Eat?</h1>
    </div>
    <div>{(await data).map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <img src={item.imgURL} alt={item.name} />
          </div>
        ))}
    </div>
    </>
  )
}
