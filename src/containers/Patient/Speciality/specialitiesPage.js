import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./specialitiesPage.scss"
import {getSpecialityById} from '../../../services/userService'
import {HomeHeader} from '../../HomePage/HomeHeader'



class specialitiesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            image: '',
            contentHTML: '',
            isHiddenDescription: true,



        }
    }
    async componentDidMount() {
        let res = await getSpecialityById(this.state.id);
        this.setState({
            name: res.message.name,
            image: res.message.image,
            contentHTML: res.message.description
        })
     }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.lang !== this.props.lang) {
            let language = this.props.lang;
            this.getSelectDate(language)
        }
    }
   

      styleDescription = () => {
        if(!this.state.isHiddenDescription) {
            return {
                overflow: "hidden",
                background: "red"
                
            }
        } else {
            return {
                overflow: "visible"
            }
        }
    }
    parsePhoto = (avatar) => {
        if (avatar) {
            return new Buffer(avatar, 'base64').toString('binary');
        } else {
            return "";
        }
    }
    render() {
        return (
           <>
                
            <div className="detail-speciality-container">
                
                <div className="detail-speciality-content">
                <div className="speciality-background" style={{backgroundImage:`url(${this.parsePhoto(this.state.image)})`}}>
                   <div className="speciality-background-opacity">
                        <div className="speciality-background-content">
                        <div className="speciality-name">
                        {this.state.name}
                    </div>
                    <div className="speciality-description">
                        
                        <div dangerouslySetInnerHTML={{ __html: this.state.contentHTML }} class="speciality-description-child"
                        style={
                            this.styleDescription()
                        }
                        ></div>
                        
                    </div>
                    <div>
                    Đọc thêm
                </div>
                        </div>
                   </div>
                    
                </div>
                <div className="list-doctor-by-speciality">
                    <div className="list-doctor-by-speciality-child">
                        <select className="filter-doctor-location">
                            
                            <option >
                                Hà Nội
                            </option>
                            <option>
                                Đà Nẵng
                            </option>
                            <option>
                                TP.Hồ Chí Minh
                            </option>
                        </select>
                        <div className="doctors-by-speciality">
                            <div className="doctor-by-speciality">
                                
                            </div>
                        </div>
                    </div>

                </div>
                </div>
                
                
            </div>
           </>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};



export default connect(mapStateToProps, mapDispatchToProps)(specialitiesPage);
