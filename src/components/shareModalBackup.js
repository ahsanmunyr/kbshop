import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Linking } from 'react-native'
import IconCross from "react-native-vector-icons/Entypo"
import { NavigationContainer, useNavigation, useTheme } from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import colors from "../assets/colors/colors"
import ShareIcon from "react-native-vector-icons/Entypo"
import FavIcon from "react-native-vector-icons/MaterialIcons"
import BioIcon from "react-native-vector-icons/FontAwesome"
import Share from 'react-native-share';
import { connect } from 'react-redux';
import * as favAct from "../store/actions/favouriteAct"
const { width, height } = Dimensions.get('window')
function NotifyModel({ visible, closeModle, data,setShop,addFavourite,authRed ,getFavourites}) {
    // console.log(authRed)
    const navigation=useNavigation()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            style={{ flex: 1, justifyContent: 'center', elevation: 5 }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <View style={{ ...styles.con, backgroundColor: "white" }}>
                    <View style={{ ...styles.btn, backgroundColor: "white" }}>
                        <TouchableOpacity onPress={() => {
                            closeModle()
                        }}>
                            <IconCross name="cross" color={colors.blue} size={responsiveFontSize(3)} />
                        </TouchableOpacity>
                        <View style={styles.imgCon}>
                            <Image
                                style={styles.img}
                                source={data.image ? { uri: data.image } : require('../assets/user.png')}
                            />
                            <Text style={{ margin: responsiveFontSize(1),fontSize:responsiveFontSize(1.6) }}>{data.name}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setShop(data.name)
                                    closeModle()
                                }}
                                style={{ ...styles.item, borderTopWidth: 0.5, marginTop: responsiveFontSize(3) }}>
                                <BioIcon
                                    name='shopping-cart'
                                    color="gray"
                                    style={styles.itemIcon}
                                    size={responsiveFontSize(2.5)}
                                />
                                <Text style={{ fontSize: responsiveFontSize(2) }}>
                                    BioShop
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    Share.open({
                                        title:'BioShop',
                                        url: `https://konnect.bio/${data.name}`
                                    }).then((res) => {
                                        console.log(res, "RES");
                                        closeModle()

                                      })
                                      .catch((err) => {
                                        err && console.log(err);
                                      });
                                }}
                                style={{ ...styles.item }}>
                                <ShareIcon
                                    name='share'
                                    color="gray"
                                    style={styles.itemIcon}
                                    size={responsiveFontSize(2.5)}
                                />
                                <Text style={{ fontSize: responsiveFontSize(2) }}>
                                    Share
                                </Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={{ ...styles.item }}
                                onPress={()=>{
                                    if(authRed?.success){
                                        addFavourite(data._id).then((res)=>{
                                            console.log(res.data)
                                            getFavourites()
                                        }).catch((err)=>{
                                            console.log(err.response.data)
                                        })
                                    }else{
                                        navigation.navigate("Favourite")
                                    }
                                    closeModle()
                                }}
                                >
                                <FavIcon
                                    name='favorite'
                                    color="gray"
                                    style={styles.itemIcon}
                                    size={responsiveFontSize(2.5)}
                                />
                                <Text style={{ fontSize: responsiveFontSize(2) }}>
                                    Add to Favourites
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

function mapStateToProps({ authRed }) {
    return {authRed}
  }

  export default connect(mapStateToProps,favAct)(NotifyModel);


const styles = StyleSheet.create({
    con: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 1.25,
        height: responsiveFontSize(50),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 20
    },
    iconCon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: responsiveFontSize(1.2),
        paddingVertical: responsiveFontSize(1.2),
        borderTopLeftRadius: responsiveFontSize(2.2),
        borderTopRightRadius: responsiveFontSize(2.2)
    },
    icon: {
        backgroundColor: 'white',
        borderWidth: 4,
        borderColor: '#001441',
        width: '18%',
        height: '18%',
        borderRadius: '18%' / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: responsiveFontSize(10),
        height: responsiveFontSize(10),
        borderRadius: responsiveFontSize(10) / 2
    },
    imgCon: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        width: '100%',
        borderBottomWidth: 0.5,
        padding: responsiveFontSize(1.5),
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        paddingRight: responsiveFontSize(2)
    }
})