import Link from 'next/link';
import styles from './tabbar.module.css';


export default function Tabbar({ list }) {
    return (
        <ul className={styles.container}>
            {
                list.map(item => (
                    <Link href={item.url} key={item.id}>
                        <li className={styles.li}>{item.label}{item.num ? `(${item.num})`: ''}</li>
                    </Link>
                ))
            }
        </ul>
    )
}