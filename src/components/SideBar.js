import React, { useState, useEffect } from 'react'
import './SideBar.css';
import { Link } from 'react-router-dom';
// import {useTranslation} from 'react-i18next';
import {useSelector,useDispatch } from 'react-redux';


const SideBar = () => {
    const [activeId, setActiveId] = useState(1);
    const [language, setLanguage] = useState('vi');
    const dispatch = useDispatch();


    
   
    let switchLanguage = useSelector(state => state.app.language);
    
    useEffect(() => {
        setLanguage(switchLanguage);
    }, [switchLanguage])

    const menuItems = [
        {
            id: 1,
            en: "Home",
            vi: "Trang chủ",
            jp: "ホーム",
            link: "/",
            icon: "fas fa-home"
        },
        
        {
            id: 2,
            en: "Specialty",
            vi: "Chuyên khoa",
            jp: "専門",
            link: "/specialty",
            icon: "fa-duotone fa-flask"
        },
        {
            id: 3,
            en: "Doctor",
            vi: "Bác sĩ",
            jp: "医者",
            link: "/doctor",
            icon: "fa-solid fa-user-doctor"
        },
        {
            id: 4,
            en: "Health Facilities",
            vi: "Cơ sở y tế",
            jp: "医療施設",
            link: "/clinic",
            icon: "fa-solid fa-house-chimney-medical"
        },
        {
            id: 5,
            en: "HandBook",
            vi: "Cẩm nang",
            jp: "ハンドブック",
            link: "/handbook",
            icon: "fa-solid fa-newspaper"
        },
        {
            id: 6,
            en: "Community",
            vi: "Cộng đồng",
            jp: "コミュニティ",
            link: "/community",
            icon: "fa-solid fa-earth-americas"
        }
    ]

    return (
        
            <div className="side-bar">
                <ul className="side-bar-list">
                    { menuItems &&
                        menuItems.map((item, index) => {
                            return (
                                <li className="side-bar-item"
                                    key={index}
                                    onClick={
                                        () => {
                                            
                                            setActiveId(item.id);
                                           
                                        }
                                    }
                                >
                                    <Link className={
                                        "side-bar-link" + (activeId === item.id ? " active" : "")
                                    }
                                        onClick={(e) => {
                                            
                                            // setActiveId(item.id);
                                            // console.log(item);
                                        }}
                                        to={item.link}
                                    >
                                        <i className={item.icon + " menu-icon"}></i>
                                        <span className="side-bar-text">
                                            {item[language]}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                   
                    
                </ul>
                
            
           
        </div>
    )
}

export default SideBar
