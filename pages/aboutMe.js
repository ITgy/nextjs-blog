import styles from '../styles/aboutMe.module.css';
import { useRef, useState } from 'react';
import Picture from '../components/picture/index';


export default function AboutMe() {
    const cardObj = useRef(null);
    const [rotateObj, setRotateObj] = useState(null);
    const [imgStyle, setImgStyle] = useState(null);

    const [clientX, setClientX] = useState(0);
    const [clientY, setClienty] = useState(0);

    // 计算盒子移动幅度
    function computedTransform(num, doc) {
        return (num / doc * 40 - 20).toFixed(1);
    }

    // 计算背景图移动幅度
    function computedBGPosition(num, doc){
        return (60 - Number((num / doc * 20).toFixed(1)) + '%');
    }

    function handleMouseMove(e) {
        setClientX(e.clientX);
        setClienty(e.clientY);

        setRotateObj({
            // transform: `rotateX(${computedTransform(e.clientX, window.innerWidth)}deg) rotateY(${computedTransform(e.clientY, window.innerHeight)}deg)`,
            backgroundPosition: `${computedBGPosition(e.clientX, window.innerWidth)} ${computedBGPosition(e.clientY, window.innerHeight)}`
        })
        setImgStyle({
            transform: `translateX(${-computedTransform(e.clientX, window.innerWidth)}px) translateY(${-computedTransform(e.clientY, window.innerHeight)}px)`
        })
    }

    return (
        <div className={styles.container} onMouseMove={handleMouseMove}>
            <Picture clientX={clientX} clientY={clientY}></Picture>
        </div>
    )
}