import React from 'react';
import { Hero } from '../Hero/Hero';
import { Features } from '../Features/Features';
import Collection from '../collection/Collection';
import OfficePopularChoice from '../OfficePopular/OfficePopular';
import RoomPopular from '../RoomPopular/RoomPopular';
import ChairPopular from '../ChairPopular/ChairPopular';
import ProductPage from '../ProductPage/ProductPage';
import ProductSlider from '../ProductSlider/ProductSlider';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import ProductListing from '../ProductListing/ProductListing';
import ShopByNotes from './ShopByNotes';
import LuxuryHome from './LuxuryHome';
 
const Home = () => {
    return (
        <div className=''>
            <Hero />
              {/* <Features /> */}
              {/* <Collection /> */}
              <ProductListing/>
              <LuxuryHome/>
              {/* <OfficePopularChoice /> */}
              {/* <RoomPopular /> */}
              {/* <ChairPopular /> */}
              {/* <ProductPage /> */}
              <ShopByNotes/>
              <ProductSlider />
              <CustomerReviews />
        
        </div>
    );
};

export default Home;