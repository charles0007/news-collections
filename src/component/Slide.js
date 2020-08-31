import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography } from '@material-ui/core'
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';

import cnn from '../custom/img/cnn.jpg'
import techcrunch from '../custom/img/techcrunch.png'
import wp from '../custom/img/wp.png'
import image1 from "../custom/img/bg.jpg";
import image2 from "../custom/img/bg2.jpg";
import image3 from "../custom/img/bg3.jpg";

function Slide({ items, bg_image }) {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        afterChange: function (index) {
            var img = items[index].image;//index==0?image1:index==1?image2:index==2?image3:""
            bg_image(`${img}`);
            // console.log(img
            // //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            // );
        }
    };

    return (
        <div >
            <GridContainer>
                <GridItem xs={12} sm={12} md={11} >
                    <Carousel {...settings}>

                        {items.length > 0 ?
                            <Paper >
                                <img src={
                                    items[0].image.split(".").indexOf('png') > -1 || items[0].image.split(".").indexOf('jpg') > -1 || items[0].image.split(".").indexOf('gif') > -1 || items[0].image.split(".").indexOf('tif') > -1 ? items[0].image : items[0].website == "cnn" ? cnn : items[0].website == "techcrunch" ? techcrunch : items[0].website == "washingtonpost" ? wp : image1
                                } alt={items[0].title.replace('"', "'")} className="app__slide_image" />
                                <div className="app__slide_header" >
                                    {/* <span>{items[0].title}</span> */}
                                    <Typography gutterBottom variant="h6" >
                                        {items[0].title.replace('"', "'")}
                                    </Typography>
                                    <p>{items[0].description.replace('"', "'")}</p>
                                    <br />
                                    <Button className="CheckButton" variant="outlined" color="secondary">
                                        Learn More!
                        </Button>
                                </div>
                            </Paper>
                            : ""}
                        {items.length > 1 ?
                            <Paper >
                                <img src={
                                    items[1].image.split(".").indexOf('png') > -1 || items[1].image.split(".").indexOf('jpg') > -1 || items[1].image.split(".").indexOf('gif') > -1 || items[1].image.split(".").indexOf('tif') > -1 ? items[1].image : items[1].website == "cnn" ? cnn : items[1].website == "techcrunch" ? techcrunch : items[1].website == "washingtonpost" ? wp : image2


                                } alt={items[1].title.replace('"', "'")} className="app__slide_image" />
                                <div className="app__slide_header" >
                                    <Typography gutterBottom variant="h6" >
                                        {items[1].title.replace('"', "'")}
                                    </Typography>
                                    <p>{items[1].description.replace('"', "'")}</p>
                                    <br />
                                    <Button className="CheckButton" variant="outlined" color="secondary">
                                        Learn More!
                        </Button>
                                </div>
                            </Paper>
                            : ""}

                        {items.length > 2 ?
                            <Paper >
                                <img src={
                                    items[2].image.split(".").indexOf('png') > -1 || items[2].image.split(".").indexOf('jpg') > -1 || items[2].image.split(".").indexOf('gif') > -1 || items[2].image.split(".").indexOf('tif') > -1 ? items[2].image : items[2].website == "cnn" ? cnn : items[2].website == "techcrunch" ? techcrunch : items[2].website == "washingtonpost" ? wp : image3

                                } alt={items[2].title.replace('"', "'")} className="app__slide_image" />
                                <div className="app__slide_header" >
                                    <Typography gutterBottom variant="h6" >
                                        {items[2].title.replace('"', "'")}
                                    </Typography>
                                    <p>{items[2].description.replace('"', "'")}</p>
                                    <br />
                                    <Button className="CheckButton" variant="outlined" color="secondary">
                                        Learn More!
                        </Button>
                                </div>
                            </Paper>
                            : ""}
                        {/* {
                

                items.map((item, index) => (

                    <Paper key={index}>
                        <img src={item.image} alt={item.title} className="slick-image" />
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>

                        <Button className="CheckButton">
                            Check it out!
                        </Button>
                    </Paper>
              
                ))

            } */}
                    </Carousel>

                </GridItem>
            </GridContainer>
        </div>
    )
}

export default Slide