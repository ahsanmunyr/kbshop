// @ts-nocheck
import {
  FlatList,View
} from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import NotFound from '../../components/NotFound';
import DelFavouriteModal from '../../components/DeleteModal';
import Loader from '../../components/Loader';
import FavItem from './FavItem';
import ShareModal from '../../components/ShareModal';
import { useIsFocused } from '@react-navigation/native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

export default function FavList({
  isLoading,
  favouriteRed,
  isShowDelModal,
  setIsShowDelModal,
  selectedFavItem,
  deleteFavourite,
  getFavourites,
  setIsLoading,
  selectedFilter,
  setSelectedFavItem,
  navigation
}) {

  const [shareModal,setShareModal]=useState(false)
  const [currentData,setCurrentData]=useState({})
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsLoading(true)
    isFocused && getFavourites(selectedFilter).then(() => setIsLoading(false));
  }, [isFocused])
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            data={favouriteRed}
            style={{backgroundColor:'white'}}
            renderItem={({ item }) => (
              <FavItem
                item={item}
                onDelete={setIsShowDelModal}
                setSelectedItem={setSelectedFavItem}
                onSelect={()=>{
                  if(item.promo!="KB0" && item.promo){
                    setShareModal(true)
                    setCurrentData(item)
                  }else{
                    navigation.navigate('bioshop', { shopName: item.instagram_username === "" ? item?.pixel_id : item.instagram_username });
                  }
                }}
              />
            )}
            horizontal={false}
            decelerationRate={0.5}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={<View style={{height:responsiveScreenFontSize(10)}} />}
            keyExtractor={(item, i) => i.toString()}
            ListEmptyComponent={() => <NotFound text={"No Favourite Found"} />}
          />
          <ShareModal
            visible={shareModal}
            closeModle={() => setShareModal(false)}
            currentData={currentData}
            call={() => {
              navigation.navigate('bioshop', { shopName: currentData.instagram_username, ...currentData });
            }}
          />
          <DelFavouriteModal
            visible={isShowDelModal}
            closeModal={() => setIsShowDelModal(false)}
            selectedItem={selectedFavItem}
            deleteFav={id => {
              setIsShowDelModal(false);
              deleteFavourite(id).then(() => {
                setIsLoading(true);
                getFavourites(selectedFilter).then(() => setIsLoading(false));
              });
            }}
          />
        </>
      )}
    </>
  )
}