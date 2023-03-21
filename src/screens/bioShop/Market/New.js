import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState,useImperativeHandle} from 'react';
import CampaignCard from './ChildComponents/CampaignCard';
import NotFound from '../../../components/NotFound';
import rowFormate from '../../../utils/rowFormate';
import CampaignModal from './ChildComponents/CampaignModal';
import {connect, useDispatch} from 'react-redux';
import * as campaignsAct from '../../../store/actions/campaignsAct';
import Loader from '../../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import deviceInfo from "react-native-device-info"

const tablet=deviceInfo.isTablet() 

const New = ({campaignsRed, getCampaigns,data,loader=null}) => {
  const [isShowCampaignModal, setIsShowCampaignModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isApiCall, setIsApiCall] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const numColumns = tablet?3:2;

  useEffect(() => {
    setIsApiCall(true);
    getCampaigns("marketplace", 1,data.id,data.category_id,data.sortBy).then(() => setIsApiCall(false));
    return ()=>{
      dispatch({type: 'clearCampaignData'});
    }
  }, [navigation]);

  useEffect(()=>{
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch({type: 'clearCampaignData'});
    });

    return unsubscribe;
  },[navigation])

  useEffect(() => {
    if (loader !== null) {
      setIsApiCall(!isApiCall)
    }
  }, [loader])
  

  const loadMore = useCallback(() => {
    if (campaignsRed?.totalCount > campaignsRed.data.length) {
      getCampaigns("marketplace", campaignsRed.pagination?.next?.page,data.id,data.category_id,data.sortBy);
    }
  }, [campaignsRed.pagination?.next?.page]);

  function renderFooter() {
    if (campaignsRed?.totalCount > campaignsRed.data.length) {
      return (
        <>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Loading...</Text>
            <ActivityIndicator color="black" style={{marginLeft: 8}} />
          </View>
        </>
      );
    }
    return null;
  }

  if (isApiCall) {
    return <Loader />;
  }

  return (
    <>
      <View style={styles.cont}>
        <FlatList
          data={rowFormate(campaignsRed.data, numColumns)}
          renderItem={({item, index}) => {
            return (
              <View
                key={item[0].id}
                style={{
                  flexDirection: 'row',
                  justifyContent: (item.length==(tablet?3:2))?'space-evenly':'flex-start',
                  // marginLeft:(item.length!=(tablet?3:2))?responsiveFontSize(0.6):0
                }}>
                {item.map((it, i) => {
                  return (
                    <CampaignCard
                      data={it}
                      marginLeft={(item.length!=(tablet?3:2))?responsiveFontSize(tablet?0.5:0.6):0}
                      key={i}
                      onPressSelectCampaign={() => {
                        setIsShowCampaignModal(true);
                        setSelectedProduct(it);
                      }}
                    />
                  );
                })}
              </View>
            );
          }}
          horizontal={false}
          contentContainerStyle={{marginTop:responsiveFontSize(1)}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, i) => i.toString()}
          ListEmptyComponent={()=><NotFound text={"No Campaign Found"}/>}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore()}
          ListFooterComponent={renderFooter}
        />
        {isShowCampaignModal && (
          <CampaignModal
            isModalVisible={isShowCampaignModal}
            closeModal={() => setIsShowCampaignModal(false)}
            data={selectedProduct}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = ({campaignsRed}) => {
  return {campaignsRed};
};

export default connect(mapStateToProps, campaignsAct)(New);
