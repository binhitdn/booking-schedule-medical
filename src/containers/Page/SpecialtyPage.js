import './SpecialtyPage.scss'
import {getAllSpeciality} from '../../services/userService';



import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SpecialtyPage = () => {
    const [specialties, setSpecialties] = useState([]);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const [specialtiesView, setSpecialtiesView] = useState([]);
    const [search, setSearch] = useState('');
   
   useEffect(() => {
    let updateSpecialtíes = async () => {
        let specialtiess = await getAllSpeciality();
        setSpecialties(specialtiess.specialities);
        setSpecialtiesView(specialtiess.specialities);
    }
    updateSpecialtíes();

     
   }, []);

     let parsePhoto = (image) => {
        if (image) {

            return new Buffer(image, 'base64').toString('binary');

        } else {
            return "";
        }
    }
    let searchSpecialties = (e) => {
        let specialtiesViews = specialties.filter((specialty) => {
            return removeAccents(specialty.name.toLowerCase()).includes(removeAccents(search.toLowerCase()));
        })
        setSpecialtiesView(specialtiesViews);
    }
    useEffect(() => {
        searchSpecialties();
    }, [search]);

    useEffect(() => {
        
        console.log('specialtiesView', specialtiesView);
    }, []);
    
    let removeAccents = (str) => {
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
      }
    return (
        <div class="special-page">
            <div class="special-page__header">
                <h4>Chuyên khoa</h4>
                <p>
                    CareHappy hỗ trợ bạn tìm kiếm các chuyên khoa y tế đa dạng,nhanh chóng và chính xác nhất.
                </p>
            </div>
            <div class="special-page__search">
                <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm chuyên khoa" value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        />
                </div>
            </div>
            <div class="special-page__content">
                <div class="special-page__content__specialties">
                    {
                        specialtiesView && specialtiesView.map((specialty, index) => {
                            console.log(specialty);
                            return (
                                <div class="special-page__content__specialties__item"
                                >
                                <div class="div-special-background"
                                style={{background: `url(${parsePhoto(specialty.image)})`}}
                                >
                                 <Link to={`/specialities/${specialty.id}`} className="view_specialty_detail">
                                     <div className="detail-btn">
                                        Xem chuyên khoa
                                     </div>
                                    </Link>       
                                </div>
                                <p class="div-special-name">{specialty.name}</p>
                            </div>
                            )
                        })
                    }
                </div>
            </div>


        </div>
    );
}
export default SpecialtyPage;