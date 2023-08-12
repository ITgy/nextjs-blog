import styles from './picture.module.css';
import {useState, useEffect} from 'react';

export default function Picture({url='/images/avatar2.png', bgUrl='/images/bg2.jpg', clientX, clientY, bgWidth = 175, bgHeight = 250, width=175, height=300,className = ''}) {
    const baseBgStyle = {
        backgroundImg: process.env.isProduct ? `/nextjs-blog${bgUrl}` : bgUrl,
        width: `${bgWidth}px`,
        height: `${bgHeight}px`
    }
    const baseStyle = {
        width: `${width}px`,
        height: `${height}px`
    }
    
    const [rotateObj, setRotateObj] = useState({
        ...baseBgStyle
    });
    const [imgStyle, setImgStyle] = useState({
        ...baseStyle
    });
    

    useEffect(() => {
        setRotateObj({
            ...baseBgStyle,
            // transform: `rotateX(${computedTransform(clientX, window.innerWidth)}deg) rotateY(${computedTransform(clientY, window.innerHeight)}deg)`,
            backgroundPosition: `${computedBGPosition(clientX, window.innerWidth)} ${computedBGPosition(clientY, window.innerHeight)}`
        })
        setImgStyle({
            ...baseStyle,
            transform: `translateX(${-computedTransform(clientX, window.innerWidth)}px) translateY(${-computedTransform(clientY, window.innerHeight)}px)`
        })
    }, [clientX, clientY])

    // 计算盒子移动幅度
    function computedTransform(num, doc) {
        return (num / doc * 40 - 20).toFixed(1);
    }

    // 计算背景图移动幅度
    function computedBGPosition(num, doc){
        return (60 - Number((num / doc * 20).toFixed(1)) + '%');
    }

    return (
        <div style={rotateObj} className={`${styles.card} ${className}`}>
            <img className={styles.img} style={imgStyle} src={`${process.env.isProduct?'/nextjs-blog':''}${url}`}></img>
        </div>
    )
}