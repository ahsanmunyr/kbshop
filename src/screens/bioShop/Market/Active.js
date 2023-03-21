import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import NotFound from '../../../components/NotFound';
import rowFormate from '../../../utils/rowFormate';
import ActiveCard from './ChildComponents/ActiveCard';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {connect, useDispatch} from 'react-redux';
import * as campaignsAct from '../../../store/actions/campaignsAct';
import Loader from '../../../components/Loader';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import ActiveCampaignModal from './ChildComponents/ActiveCampaignModal';
import deviceInfo from 'react-native-device-info';

const tablet = deviceInfo.isTablet();
const Active = ({getCampaigns, campaignsRed, navigation}) => {
  const [isApiCall, setIsApiCall] = useState(true);
  const [isShowActiveCampaignModal, setIsShowActiveCampaignModal] =
    useState(false);
  const [selectActiveCampaign, setSelectActiveCampaign] = useState(null);
  const numColumns = tablet ? 3 : 2;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({type: 'clearCampaignData'});
    };
  }, []);

  useEffect(() => {
    setIsApiCall(true);
    getCampaigns('active', 1).then(() => setIsApiCall(false));

    const unsubscribe = navigation.addListener('blur', () => {
      dispatch({type: 'clearCampaignData'});
    });

    return unsubscribe;
  }, [navigation]);

  const loadMore = useCallback(() => {
    if (campaignsRed?.totalCount > campaignsRed.data.length) {
      getCampaigns('active', campaignsRed.pagination?.next?.page);
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

  const onToggleOpenModal = data => {
    setIsShowActiveCampaignModal(prev => !prev);
    setSelectActiveCampaign(data);
  };

  return (
    <>
      <View style={styles.cont}>
        <FlatList
          data={rowFormate(campaignsRed.data, numColumns)}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent:
                    item.length == (tablet ? 3 : 2)
                      ? 'space-evenly'
                      : 'flex-start',
                }}
                key={index}>
                {item.map((it, i) => {
                  return (
                    <ActiveCard
                      data={it}
                      marginLeft={
                        item.length != (tablet ? 3 : 2)
                          ? responsiveFontSize(tablet ? 0.5 : 0.6)
                          : 0
                      }
                      key={i}
                      onToggleOpenModal={onToggleOpenModal}
                    />
                  );
                })}
              </View>
            );
          }}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: responsiveFontSize(1)}}
          keyExtractor={(item, i) => i.toString()}
          ListEmptyComponent={<NotFound  text={'No Campaign available at this time. Please check back later'} />}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore()}
          ListFooterComponent={renderFooter}
        />
        {isShowActiveCampaignModal && (
          <ActiveCampaignModal
            isModalVisible={isShowActiveCampaignModal}
            closeModal={() => setIsShowActiveCampaignModal(false)}
            data={selectActiveCampaign}
            msg="Are You Sure You Want To Pause This Campaign?"
            isActive={true}
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

export default connect(mapStateToProps, campaignsAct)(Active);
