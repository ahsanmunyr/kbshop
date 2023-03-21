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
import {connect, useDispatch} from 'react-redux';
import * as campaignsAct from '../../../store/actions/campaignsAct';
import Loader from '../../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import InactiveCampaignModal from './ChildComponents/ActiveCampaignModal';

const Paused = ({getPausedCampaigns, campaignsRed}) => {
  const [isApiCall, setIsApiCall] = useState(true);
  const [isShowInActiveCampaignModal, setIsShowInActiveCampaignModal] =
    useState(false);
  const [selectInActiveCampaign, setSelectInActiveCampaign] = useState(null);
  const navigation = useNavigation();
  const numColumns = 2;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsApiCall(true);
    getPausedCampaigns('in_active', 1).then(() => setIsApiCall(false));

    const unsubscribe = navigation.addListener('blur', () => {
      dispatch({type: 'clearCampaignData'});
    });

    return unsubscribe;
  }, [navigation]);

  const loadMore = useCallback(() => {
    if (campaignsRed?.totalCount > campaignsRed.data.length) {
      getPausedCampaigns('in_active', campaignsRed.pagination?.next?.page);
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
    setIsShowInActiveCampaignModal(prev => !prev);
    setSelectInActiveCampaign(data);
  };

  return (
    <>
      <View style={styles.cont}>
        {/* {console.log(campaignsRed.data,"PPPPPPPPPP")} */}
        <FlatList
          data={rowFormate(campaignsRed.data, numColumns)}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent:
                    item.length == 2 ? 'space-between' : 'flex-start',
                  marginLeft: item.length != 2 ? responsiveFontSize(0.6) : 0,
                }}
                key={index}>
                {item.map((it, i) => {
                  return (
                    <ActiveCard
                      data={it}
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
          ListEmptyComponent={NotFound}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMore()}
          ListFooterComponent={renderFooter}
        />
        {isShowInActiveCampaignModal && (
          <InactiveCampaignModal
            isModalVisible={isShowInActiveCampaignModal}
            closeModal={() => setIsShowInActiveCampaignModal(false)}
            data={selectInActiveCampaign}
            msg="Are You Sure You Want To Active This Campaign?"
            isActive={false}
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

export default connect(mapStateToProps, campaignsAct)(Paused);
