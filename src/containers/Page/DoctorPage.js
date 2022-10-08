import './DoctorPage.scss'
import {getTopDocterHome} from '../../services/userService'




import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const DoctorPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const [doctorsView, setDoctorsView] = useState([]);
    const [search, setSearch] = useState('');
   
   useEffect(() => {
    let updateDoctors = async () => {
        let doctors = await getTopDocterHome();
        console.log('doctors', doctors);
        
        setDoctors(doctors.data);
        setDoctorsView(doctors.data);
     
    }
    updateDoctors();

     
   }, []);

   let parsePhoto = (image) => {
    if (image) {

        return new Buffer(image, 'base64').toString('binary');

    } else {
        return "";
    }
}
    // let searchDoctors = (e) => {
    //     let doctorsView = doctors.filter((doctor) => {
    //         return removeAccents(doctor.name.toLowerCase()).includes(removeAccents(search.toLowerCase()));
    //     })
    //     setDoctorsView(doctorsView);
        
    // }
    // useEffect(() => {
    //     searchDoctors();
    // }, [search]);

    // useEffect(() => {
    //     console.log('doctorsView', doctors);
    // }, []);

   
    
    // let removeAccents = (str) => {
    //     return str.normalize('NFD')
    //               .replace(/[\u0300-\u036f]/g, '')
    //               .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    //   }
    return (
        <div class="doctor-page">
            <div class="doctor-page__header">
                <h4>Bác Sĩ</h4>
                <p>
                    CareHappy hỗ trợ bạn tìm kiếm những bác sĩ uy tín, chuyên nghiệp và nhiệt tình nhất.
                </p>
            </div>
            {/* <div class="doctor-page__search">
                <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm bác sĩ" value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        />
                </div>
            </div> */}
            <div class="doctor-page__content">
            <h4 class="doctor-title-outstanding">Bác sĩ nổi bật</h4>
                <div class="doctor-page__content__doctors">
                    
                    {
                        doctorsView && doctorsView.map((doctor, index) => {
                            return (
                                
                                        <Link className="img-customize" key={index}
                                        to={"doctors/"+doctor.id}
                                   
                                >
                                    <div className="section-doctor-trend-item">
                                        {console.log('doctor', doctor)}
                                        <div className="anh-bac-si" style={{
                                            background: `url(${parsePhoto(doctor.image)})`
                                        }}>

                                        </div>
                                    </div>

                                    <div className="name">
                                        <h6 class="name-doctor">{doctor.positionData.valueVi + " " + doctor.lastName + " " + doctor.firstName}</h6>
                                        <p>Khoa xương khớp</p>
                                        <span>Lượt xem: 0</span> 
                                        <span>Lượt khám: 0</span>
                                        <div>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                        </div>

                                    </div>
                                </Link>
                                
                            )
                        })
                    }
                </div>
            </div>


        </div>
    );
}
export default DoctorPage;