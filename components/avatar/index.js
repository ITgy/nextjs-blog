import styles from './avatar.module.css';

export default function Avatar({url}){

    return (
        <div className={styles.avatar}>
            <img style={{objectFit: 'cover'}} src={`${process.env.isProduct?'/blog-deploy':''}${url}`} ></img>
        </div>
    )
}