import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {
    Card, Paper, CardActionArea, CardMedia, CardContent
    , Typography, CardActions, Button
}
    from "@material-ui/core";
import InfiniteScroll from 'react-infinite-scroll-component';
// @material-ui/icons

// core components
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';


import axios from 'axios'
import cnn from '../custom/img/cnn.jpg'
import techcrunch from '../custom/img/techcrunch.png'
import wp from '../custom/img/wp.png'
import defaultImg from '../custom/img/bg.jpg'
import { colors } from "@material-ui/core";
// import { async } from "q";


// const useStyles = makeStyles();


const useStyles = makeStyles({
    root: {
        maxWidth: 345, margin: 10
    },
    media: {
        height: 140,
    },
});

export default function News(props) {
    const classes = useStyles();

    const [new_data, setNewData] = useState(true);
    const [more_data, setMoreData] = useState(true);
    const [lastNativeId, setLastNativeId] = useState(1);
    const [highestNativeId, setHighestNativeId] = useState(1);
    const [notificationValue, setNotificationValue] = useState(0);
    const [header_info_arr, setHeader_info_arr] = useState([]);

    const [items, setItems] = useState([]);
    const baseUrl = "https://news-collection-api.herokuapp.com";


    useEffect(() => {

        props.notification_value(notificationValue);

        props.info(header_info_arr);
    });


    useEffect(() => {
        fetchMoreData();
    }, []);

    useEffect(() => {
        getImages();
    }, []);



    // setMovies(prevMovies => ([...prevMovies, ...result]));


    setTimeout(async () => {
        try {
            var response = await axios.post(baseUrl + "/notify", { NativeId: highestNativeId }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // if (response.data.notificationValue > 0) {

            setNotificationValue(response.data.notificationValue);
            // }

        } catch (er) { }


    }, 15000);
    // };



    const refreshData = async () => {

        try {
            var response = '';
            setNotificationValue(0);
            response = await axios.post(baseUrl + "/refresh_news", { NativeId: highestNativeId }, {
                headers: { 'Content-Type': 'application/json' }
            });


            if (response.data.length > 0) {
                var highestDat = await response.data[0];
                setHighestNativeId(highestDat.nativeid);

                await setItems(
                    items.unshift(
                        response.data
                    )
                );
            }
        } catch (er) {

        }


    };

    const getImages = async () => {

        try {
            var response = '';

            response = await axios.post(baseUrl + "/getImages", { NativeId: highestNativeId }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.status) {
                setHeader_info_arr(response.data.data);
            }
        } catch (er) { }


    };

    const fetchMoreData = async () => {
        try {
            var response = '';

            // if ((lastNativeId == 1 && new_data) || (lastNativeId != 1 && !new_data)) {

            response = await axios.post(baseUrl + "/get_news", { new_data, NativeId: lastNativeId }, {
                headers: { 'Content-Type': 'application/json' }
            });

            await setMoreData(response.data.more);
            if (response.data.status && response.data.data.length > 0) {

                await setItems(
                    items.concat(
                        response.data.data
                    )
                );


                if (new_data) {
                    var highestData = await response.data.data[0];
                    setHighestNativeId(highestData.nativeid);
                }

                await setNewData(false);
                var lastData = await response.data.data[response.data.data.length - 1];

                await setLastNativeId(lastData.nativeid);

            }
            // }
        } catch (er) { }
        // }, 15000);
    };

    // const imageClasses = classNames(
    //     classes.imgRaised,
    //     classes.imgRoundedCircle,
    //     classes.imgFluid
    // );

    return (
        <div >
            <h2 >Here are the Latest News</h2>
            <br />
            <div>


                <InfiniteScroll
                    dataLength={items.length} //This is important field to render the next data
                    next={fetchMoreData}
                    hasMore={more_data}
                    loader={<h4 style={{ color: '#000' }}>...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center', color: '#000' }}>
                            <b>last</b>
                        </p>
                    }

                    // below props only if you need pull down functionality
                    refreshFunction={refreshData}
                    pullDownToRefresh={notificationValue > 0}
                    pullDownToRefreshContent={
                        // Pull down to refresh
                        <h3 style={{ textAlign: 'center', color: '#000' }}>&#8595; </h3>
                    }
                    releaseToRefreshContent={
                        // Release to refresh
                        <h3 style={{ textAlign: 'center', color: '#000' }}>&#8593; </h3>
                    }

                >
                    <GridContainer>
                        {items.map((item, index) => (
                            <GridItem xs={12} sm={12} md={12} key={index} >
                                {/* <Paper elevation={3} className="app__newss"> */}
                                {/* [item.image.split(".").length-1] */}
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={
                                                item.image.split(".").indexOf('png')>-1 || item.image.split(".").indexOf('jpg')>-1 || item.image.split(".").indexOf('gif')>-1 || item.image.split(".").indexOf('tif')>-1?item.image:item.website=="cnn"?cnn:item.website=="techcrunch"?techcrunch:item.website=="washingtonpost"?wp:defaultImg
                                            }
                                            title={item.title.replace('"',"'")}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="subtitle2" >
                                                {item.title.replace('"',"'")}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.description.replace('"',"'")}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>

                                        <small  >{item.news_date != "" ? new Date(item.news_date).toDateString()
                                            : new Date()}</small>

                                        <Button size="small" color="primary" href={item.link}
                                            target="_blank">
                                            Learn More</Button>

                                    </CardActions>
                                </Card>



                                {/* <Card  > 
                                    <GridItem xs={12} sm={12} md={12} >
                                        <img src={item.image} alt="..." className="app__news_image" />
                                    </GridItem>
                                    <h4 className="app__news_title">
                                        {item.topic}
                                        <br />
                                        <small >{item.title}</small>
                                    </h4>
                                    
                                    <p className="app__news_desp">
                                        {item.description}
                                        <br></br>
                                        <span>{item.news_date != "" ? new Date(item.news_date).toDateString()
                                            : new Date()}</span>
                                    </p>
                                    <div className="app__news_read"> click here to &nbsp;
                                    <a href={item.link}
                                            target="_blank"
                                        >
                                            read more
                                    </a>{" "}

                                    </div>
                                    

                                </Card> */}
                                {/* </Paper> */}
                            </GridItem>
                        )
                        )
                        }
                    </GridContainer>
                </InfiniteScroll>

            </div>
        </div>
    );
}
