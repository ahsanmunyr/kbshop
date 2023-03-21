// @ts-nocheck
import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import {persistStore, persistReducer, createTransform} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';


import categories from "./reducers/categories/categories";
import {bioShopReducer,bioShopAllPosts,categoriesReducer} from "./reducers/bioShop/bioShop";
import favouriteRed from "./reducers/favouriteRed/favouriteRed";
import popularCategories from "./reducers/categories/popularCategories";
import popularBrands from "./reducers/brands/brands";
import popularInfluencer from "./reducers/influencer/influencer";
import allBrands from "./reducers/brands/allBrands";
import allInfluencers from "./reducers/influencer/allInfluencer";
import { getPostReducer, getPostShopReducer } from "./reducers/Post/post";
import brandInfluencers from "./reducers/categories/brandInfluencers";
import searhList from "./reducers/search/searhlist";
import authRed from "./reducers/authRed/authRed";
import { categoryType } from "./reducers/market/market";
import countryStateCityRed from "./reducers/countryStateCityRed/countryStateCityRed";
import allCategories from "./reducers/categories/allCategories";
import seletedCategories from "./reducers/categories/selectedCategories";
import stripeProducts from "./reducers/categories/stripeProducts";
import campaignsRed from './reducers/campaignsRed/campaignsRed'
import instaPost from "./reducers/instagram/instaPost"
import userBrand from "./reducers/brands/userBrand";
import CatBrands from "./reducers/categories/catBrands";
import sales from "./reducers/campaignsRed/sales";
import myListRed from "./reducers/myListRed/myListRed";
import brandCatRed from "./reducers/brandCatRed/brandCatRed";
import purchasesRed from './reducers/purchasesRed/purchasesRed';
import bannerCoversRed from './reducers/bannerCoversRed/bannerCoversRed';
import featuredBrandsRed from "./reducers/brands/featuredBrandsRed";
import brandYouLoveRed from "./reducers/brandYouLoveRed/brandYouLoveRed";
import hotDealRed from "./reducers/hotDealRed/hotDealRed";
import subCategoryRed from "./reducers/subCategoryRed/subCategoryRed";
import categoryBannersRed from "./reducers/categoryBannersRed/categoryBannersRed";
import categoryFeaturedRed from "./reducers/categoryFeaturedRed/categoryFeaturedRed";
import categoryBrandsYouLoveRed from "./reducers/categoryBrandsYouLoveRed/categoryBrandsYouLoveRed";
import upcomingEvents from "./reducers/live/upcommingEvents";
import liveEvents from "./reducers/live/liveEvents";
import liveEventsBrand from "./reducers/live/liveEventsBrand";

import liveProducts from "./reducers/live/liveProducts";
import brandLiveEvents from "./reducers/live/brandLiveEvents";
import productDetail from "./reducers/live/productDetail";
import hostEventRed from "./reducers/live/hostEventRed";
import cartList from "./reducers/live/cartList";
import shippingAddressRed from "./reducers/shippingAddressRed/shippingAddressRed";
import hostEventLiveRed from './reducers/live/hostEventLiveRed';
import {getShippingRatesRed, getShippingAddressRed} from './reducers/live/getShippingRatesRed';
import previousEvents from "./reducers/live/previousEvents";
import previousEventsBrand from "./reducers/live/previousEventsBrand";

import getPerviousEventItem from "./reducers/live/previousEventsItem";
import getChatRed from "./reducers/chatRed/getChatRed";
import saveChatRed from "./reducers/chatRed/saveChatRed";
import getChatTokenRed from "./reducers/chatRed/getTokenChatRed";
import purchaseListRed from "./reducers/statsRed/PurchaseListRed";
import referralStatsRed from "./reducers/purchasesRed/referralStatsRed";
import getInfluencerReviewsRed from "./reducers/live/getInfluencersReviews";
import getInfluencerReviewsOne from "./reducers/live/getInfluencersReviewsOne";
import getInfluencerReviewsRedBrand from "./reducers/live/getInfluencersReviewsBrand";
import profileAllLike from "./reducers/live/profileAllLikes"
import profileDetail from "./reducers/live/profileDetail";
import dashboardRed from './reducers/dashboardRed/dashboardRed';
import getChatInfluencerRed from "./reducers/chatRed/getChatInfluencerRed";

const reducers =combineReducers({
    categories,
    bioShopAllPosts,
    bioShopReducer,
    categoriesReducer,
    favouriteRed,
    popularCategories,
    popularBrands,
    popularInfluencer,
    allBrands,
    allInfluencers,
    getPostReducer,
    getPostShopReducer,
    brandInfluencers,
    searhList,
    authRed,
    categoryType,
    countryStateCityRed,
    allCategories,
    seletedCategories,
    stripeProducts,
    campaignsRed,
    instaPost,
    userBrand,
    CatBrands,
    sales,
    myListRed,
    brandCatRed,
    purchasesRed,
    bannerCoversRed,
    featuredBrandsRed,
    brandYouLoveRed,
    hotDealRed,
    subCategoryRed,
    categoryBannersRed,
    categoryFeaturedRed,
    categoryBrandsYouLoveRed,
    upcomingEvents,
    previousEvents,
    liveEvents,
    liveProducts,
    brandLiveEvents,
    productDetail,
    cartList,
    shippingAddressRed,
    hostEventRed,
    hostEventLiveRed,
    getShippingRatesRed,
    getPerviousEventItem,
    getChatRed,
    saveChatRed,
    getChatTokenRed,
    purchaseListRed,
    getShippingAddressRed,
    referralStatsRed,
    getInfluencerReviewsRed,
    previousEventsBrand,
    liveEventsBrand,
    profileDetail,
    getInfluencerReviewsRedBrand,
    getInfluencerReviewsOne,
    dashboardRed,
    profileAllLike,
    getChatInfluencerRed
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
      'brandInfluencers', 
      'popularBrands', 
      'categoryBrandsYouLoveRed', 
      'categoryBannersRed', 
      'categoryFeaturedRed', 
      'hotDealRed',
      'upcomingEvents',
      'previousEvents',
      'liveEvents',
      'getInfluencerReviewsRed'
    ],
  };

  const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,{},composeEnhancers(applyMiddleware(ReduxThunk)));

let persistor = persistStore(store);
export {persistor,store}