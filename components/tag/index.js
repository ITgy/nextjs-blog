import styles from './tag.module.css';

export default function Tag({content, indicte}){
    const style1 = {
        background: "linear-gradient(to right, #FFEBCC, #FFDF9E)",
        color: "#CF8910"
    }
    const style2 = {
        background: "linear-gradient(to right, #76aff2, #0070f3)",
        color: "#CF8910"
    }
    return (
        <div className={`${styles.tagName}`} style={indicte?style1:style2}>{content}</div>
    )
}