import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import * as instaAct from '../../../store/actions/instagram';
import * as action from '../../../store/actions/bioShop';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Post from './Post';
import rowFormate from '../../../utils/rowFormate';
import { useDispatch } from 'react-redux';
import InstagramModal from '../../../components/InstagramModal';
import NotFound from '../../../components/NotFound';
import deviceInfo from "react-native-device-info"
import WebWindow from '../../home/WebWindow';
import DropDownComp from '../../../components/DropDownComp'
import Btn from '../../../components/Btn';
import ConnectionSetup from '../../../components/ConnectionSetup';
import colors from '../../../assets/colors/colors';
import AddGallaryModal from '../../../components/AddGallaryModal';

const tablet = deviceInfo.isTablet()

function Instagram({
  navigation,
  getInstaPost,
  instaPost,
  authRed,
  instPostLoadMore,
  bioShopReducer,
  getBioShopData,
}) {
  const [groupByOptions, setGroupByOptions] = useState([
    { label: 'Gallery', value: 'gallery' },
    { label: 'Instagram', value: 'instagram' }
  ]);

  const [isOpenDrpdwn, setIsOpenDrpdwn] = useState(false);
  const [selectedSource, setSelectedSource] = useState("gallery")
  const [modal, onChangeModalState] = useState(false);
  const [objData, onChangeObjData] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [webModal, setWebModal] = useState(false)
  const [addModal,setAddModal]=useState(false)
  const [webData, setWebData] = useState({})

  // getBioShopData(authRed?.data?.instagram_username),

  useEffect(() => {
    const { instagram_token, instagram_username, pixel_id } = authRed?.data;
    getBioShopData(instagram_username ? instagram_username : pixel_id)
    // getInstaPost(instagram_token, instagram_username).then(() =>
    //   setLoading(false),
    // );

    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(true)
      dispatch({ type: 'clearInstaPost' });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    dispatch({ type: 'clearInstaPost' });
    setLoading(true)
    const { instagram_token, instagram_username } = authRed?.data;
    getInstaPost(instagram_token, instagram_username, selectedSource).then(() =>
      setLoading(false),
    );
  }, [selectedSource, authRed])



  function renderItem({ item }) {
    return (
      <View
        style={{
          ...styles.item,
          justifyContent: (item.length == 2 || item.length == 4) ? 'space-evenly' : 'flex-start',
          marginLeft: (item.length == 1) ? responsiveFontSize(tablet ? 0.8 : 1.25) : 0,
        }}
        key={item[0].id}>
        {item.map((it, i) => {
          return (
            <Post
              index={(item.length != 4 && item.length > 2) ? true : false}
              key={it.id}
              OnChangeModal={onChangeModalState}
              DataSet={onChangeObjData}
              data={it}
            />
          );
        })}
      </View>
    );
  }

  function renderFooter() {
    return (
      <>
        {instaPost.paging?.next ? (
          <View style={styles.footer}>
            <Text style={styles.btnText}>Loading...</Text>
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          </View>
        ) : null}
      </>
    );
  }

  const loadMore = useCallback(() => {
    if (instaPost.paging?.next) {
      instPostLoadMore(instaPost.paging?.next, authRed.data.instagram_username, selectedSource);
    }
  }, [instaPost.paging?.next]);

  // console.log(instaPost.data, "DATA")

  function openWeb(data) {
    setWebData(data)
    setWebModal(true)
  }



  // console.log(bioShopReducer?.data, "================================")

  console.log("mygallery",rowFormate(instaPost.data, tablet ? 4 : 2))
  if (!loading) {
    return (
      <View style={{ flex: 1 }}>
        <WebWindow
          closeModle={() => setWebModal(false)}
          bioData={bioShopReducer?.data || null}
          data={webData}
          visible={webModal}
        />
        <AddGallaryModal
        visible={addModal}
        closeModal={()=>setAddModal(false)}
        reloadData={()=>{
          dispatch({ type: 'clearInstaPost' });
          const { instagram_token, instagram_username } = authRed?.data;
          getInstaPost(instagram_token, instagram_username, selectedSource).then(() =>
            setLoading(false),
          )
        }}
        />
        {modal && (
          <InstagramModal
            ModalState={modal}
            ChangeModalState={onChangeModalState}
            obj={{...objData,source:selectedSource}}
            categories={bioShopReducer?.data?.categories}
            onChangeSelectSource={setSelectedSource}
            // categories={bioShopReducer?.data?.categories}
            cat={'categoryItem'}
            openWeb={openWeb}
          />
        )}
        <DropDownComp
          items={groupByOptions}
          open={isOpenDrpdwn}
          value={selectedSource}
          setOpen={setIsOpenDrpdwn}
          onSelectItem={data => setSelectedSource(data.value)}
          listMode="SCROLLVIEW"
          placeholdertxt="Select"
          style={{ width: responsiveWidth(92.5), height: responsiveHeight(5.5) }}
          containerStyle={{ width: responsiveWidth(92.5), marginBottom: responsiveFontSize(1) }}
          dropDownContainerStyle={{ width: responsiveWidth(92.5) }}
          textStyle={{ fontSize: responsiveFontSize(tablet ? 0.75 : 1.3) }}
          tickIconStyle={{
            width: responsiveFontSize(1.4),
            height: responsiveFontSize(1.4),
          }}
        />
        {
          selectedSource == "instagram" && !(authRed.data.instagram_username) ? (
            <ConnectionSetup back={"none"} navigation={navigation} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={rowFormate(instaPost.data, tablet ? 4 : 2)}
              renderItem={renderItem}
              keyExtractor={item => item[0].id}
              ListEmptyComponent={<NotFound text={"No Post Found"} />}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              onEndReached={loadMore}
            />
          )
        }
       {selectedSource === "gallery" && <View style={{ position: 'absolute', bottom: responsiveFontSize(1), right: responsiveFontSize(1),width:responsiveFontSize(tablet ? 6 : 8),height:responsiveFontSize(tablet ? 6 : 8) }}>
          <TouchableOpacity 
          onPress={()=>setAddModal(true)}
          style={styles.addBtn}>
            <Text style={styles.textBtn}>ADD{'\n'}POST</Text>
          </TouchableOpacity>
        </View>}
      </View>
    );
  } else {
    return <Loader />;
  }
}

function mapStateToProps({ instaPost, authRed, bioShopReducer }) {
  return { instaPost, authRed, bioShopReducer };
}

export default connect(mapStateToProps, { ...instaAct, ...action })(Instagram);

const styles = StyleSheet.create({
  item: {
    width: tablet ? '93.5%' : '94%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  addBtn: {
    width: responsiveFontSize(tablet ? 6 : 8),
    borderRadius: responsiveFontSize(4),
    height: responsiveFontSize(tablet ? 6 : 8),
    backgroundColor: colors.themeblue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  textBtn: {
    fontSize: responsiveFontSize(tablet ? 1 : 1.5),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
