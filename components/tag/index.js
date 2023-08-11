import styles from './tag.module.css';

export default function Tag({tagInfo={}, className='', onSelect}){
    const style1 = {
        background: "linear-gradient(to right, #FFEBCC, #FFDF9E)",
        color: "#CF8910"
    }
    const style2 = {
        background: "linear-gradient(to right, #bbdaff, #3692ff)",
        // color: "#0070f3"
        color: "#ffffff"
    }
    return (
        <div className={`${styles.tagName} ${className}`} onClick={()=>{onSelect(tagInfo)}} style={tagInfo.indicte?style2:style1}>{tagInfo.tagName}</div>
    )
}