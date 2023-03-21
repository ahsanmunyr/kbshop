
// @ts-nocheck
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    Dimensions,
    Image,
    ScrollView,
    ImageBackground,
    Linking,
    ActivityIndicator,
    Alert,
    Platform,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    StatusBar
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { GiftedChat, Avatar, Bubble, Send, InputToolbar } from 'react-native-gifted-chat'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import deviceInfoModule from 'react-native-device-info';
import CrossIcon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from '../../../../assets/colors/colors';
import * as liveChatAct from '../../../../store/actions/liveChatAct';
import Loader from '../../../../components/Loader';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import moment from 'moment';
import {
    ChatRoom,
    DeleteMessageRequest,
    DisconnectUserRequest,
    SendMessageRequest,
} from 'amazon-ivs-chat-messaging';

const tablet = deviceInfoModule.isTablet();



const ChatModal = ({
    saveInfluencerChat,
    getChatInfluencerRed,
    getChatInfluencer,
    influencer,
    opens,
    close,
    portrait,
    index,
    createChatToken,
    data,
    getChatTokenRed,
    getChatRed,
    saveChatRed,
    authRed,
    getChat,
    saveChat,
    onChangeHid,
    title,
    createChatTokenClear,
    flatLayout
}) => {
    const [loader, onChangeLoader] = useState(false)
    const [messages, setMessages] = useState([]);
    const [comments, setComments] = useState('');
    const [value, setValue] = useState('');
    const tabHeight = useBottomTabBarHeight()
    const [connected, setConnected] = useState(false);
    const [chatRoom, setChatRoom] = useState([]);
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            console.log("open")
            setKeyboardStatus("open");
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
            console.log("cloase")
            setKeyboardStatus("close");
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    const closeFunction = () => {
        portrait(false)
        close(false)
        onChangeHid(false)
        if (!influencer) {
            chatRoom?.disconnect()
            createChatTokenClear()
        }

    }

    useEffect(() => {
        onChangeLoader(true)
        if (influencer) {

            getChatInfluencer(data?._id).then(() => {
                setConnected(true)
            })
        } else {
            getChat(data?._id)
        }

    }, [])


    useEffect(() => {
        onChangeLoader(true)
        if (!influencer) {
            if (getChatTokenRed?.token) {
                // console.log(getChatTokenRed, "==========================================================================")
                const room = new ChatRoom({
                    regionOrUrl: 'us-east-1',
                    tokenProvider: () => ({
                        token: getChatTokenRed.token,
                        sessionExpirationTime: new Date(getChatTokenRed.sessionExpirationTime),
                        tokenExpirationTime: new Date(getChatTokenRed.tokenExpirationTime),
                    }),
                });

                setChatRoom(room);
                setConnected(false)
            }
        }
    }, [getChatTokenRed]);


    useEffect(() => {
        // console.log(getChatRed?.data, "getChatRed?.data")
        if (influencer) {
            if (getChatInfluencerRed?.data) {
                let arrayObj = getChatInfluencerRed?.data
                arrayObj = arrayObj.map((item, i) => {
                    return {
                        _id: i || item?.user_id,
                        text: item?.content,
                        createdAt: item?.datetime,
                        user: {
                            _id: item?.user_id,
                            name: item.author,
                            avatar: item?.avatar,
                            accountType: item?.accountType,
                        }
                    };
                });

                let newSortArray = arrayObj.sort(function (a, b) {

                    return new Date(a.createdAt) - new Date(b.createdAt);
                });
                setMessages(newSortArray)
            }
        }
        else {

            if (getChatRed?.data) {
                let arrayObj = getChatRed?.data
                arrayObj = arrayObj.map((item, i) => {
                    return {
                        _id: i || item?.user_id,
                        text: item?.content,
                        createdAt: item?.datetime,
                        user: {
                            _id: item?.user_id,
                            name: item.author,
                            avatar: item?.avatar,
                            accountType: item?.accountType,
                        }
                    };
                });

                let newSortArray = arrayObj.sort(function (a, b) {

                    return new Date(a.createdAt) - new Date(b.createdAt);
                });
                setMessages(newSortArray)
            }

        }

    }, [getChatRed, getChatInfluencerRed])


    if (!influencer) {
        useEffect(() => {
            // If chat room listeners are not available, do not continue
            if (!chatRoom.addListener) {
                return;
            }
            /**
             * Called when room is establishing the initial connection or reestablishing
             * connection after socket failure/token expiration/etc
             */
            const unsubscribeOnConnecting = chatRoom.addListener(
                'connecting',
                () => { }
            );

            /** Called when connection has been established. */
            const unsubscribeOnConnected = chatRoom.addListener('connect', (a, b) => {
                setConnected(true);
                // console.log('a', a);
                // console.log('b', b);
            });

            /** Called when a room has been disconnected. */
            const unsubscribeOnDisconnected = chatRoom.addListener(
                'disconnect',
                () => { }
            );

            /** Called when a chat message has been received. */
            const unsubscribeOnMessageReceived = chatRoom.addListener(
                'message',
                (message) => {

                    const data1 = {
                        _id: message?.attributes?.id,
                        text: message.content,
                        createdAt: message?.sendTime,
                        user: {
                            _id: message?.attributes?.user_id,
                            name: message?.attributes?.name,
                            avatar: message?.attributes?.image,
                            accountType: message?.attributes?.accountType,
                        }
                    }

                    const dataa = {
                        author: message?.attributes?.name,
                        avatar: message?.attributes?.image,
                        user_id: message?.attributes?.user_id,
                        content: message.content,
                        accountType: message?.attributes?.accountType,
                        datetime: message?.sendTime
                    };

                    console.log(data1, dataa)

                    setMessages((preState) => [...preState, data1]);

                    if (message?.attributes?.user_id === authRed?.data?._id && data?._id) {

                        saveChat(data?._id, dataa)
                    }
                    // else{
                    //     setMessages((preState) => [...preState, data1]);
                    // }
                    // {
                    //   message?.attributes?.user_id === userInfo?._id &&
                    //     eventId &&
                    //     dispatch(saveChat(eventId, data));
                    // }

                    // scrollToBottom();

                    /* Example message:
                     * {
                     *   id: "5OPsDdX18qcJ",
                     *   sender: { userId: "user1" },
                     *   content: "hello world",
                     *   sendTime: new Date("2022-10-11T12:46:41.723Z"),
                     *   requestId: "d1b511d8-d5ed-4346-b43f-49197c6e61de"
                     * }
                     */
                }
            );

            /** Called when a chat event has been received. */
            const unsubscribeOnEventReceived = chatRoom.addListener(
                'event',
                (event) => {
                    /* Example event:
                     * {
                     *   id: "5OPsDdX18qcJ",
                     *   eventName: "customEvent,
                     *   sendTime: new Date("2022-10-11T12:46:41.723Z"),
                     *   requestId: "d1b511d8-d5ed-4346-b43f-49197c6e61de",
                     *   attributes: { "Custom Attribute": "Custom Attribute Value" }
                     * }
                     */
                }
            );

            /** Called when `aws:DELETE_MESSAGE` system event has been received. */
            const unsubscribeOnMessageDelete = chatRoom.addListener(
                'messageDelete',
                (deleteMessageEvent) => {
                    /* Example delete message event:
                     * {
                     *   id: "AYk6xKitV4On",
                     *   messageId: "R1BLTDN84zEO",
                     *   reason: "Spam",
                     *   sendTime: new Date("2022-10-11T12:56:41.113Z"),
                     *   requestId: "b379050a-2324-497b-9604-575cb5a9c5cd",
                     *   attributes: { MessageID: "R1BLTDN84zEO", Reason: "Spam" }
                     * }
                     */
                }
            );

            /** Called when `aws:DISCONNECT_USER` system event has been received. */
            const unsubscribeOnUserDisconnect = chatRoom.addListener(
                'userDisconnect',
                (disconnectUserEvent) => {
                    /* Example event payload:
                     * {
                     *   id: "AYk6xKitV4On",
                     *   userId": "R1BLTDN84zEO",
                     *   reason": "Spam",
                     *   sendTime": new Date("2022-10-11T12:56:41.113Z"),
                     *   requestId": "b379050a-2324-497b-9604-575cb5a9c5cd",
                     *   attributes": { UserId: "R1BLTDN84zEO", Reason: "Spam" }
                     * }
                     */
                }
            );
            // alert("AHSAN")

            chatRoom.connect();

            return () => {
                unsubscribeOnConnected();
                unsubscribeOnDisconnected();
                unsubscribeOnUserDisconnect();
                unsubscribeOnConnecting();
                unsubscribeOnMessageReceived();
                unsubscribeOnEventReceived();
                unsubscribeOnMessageDelete();

                // chatRoom.disconnect()
            };
        }, [chatRoom]);
    }
    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    //     console.log(messages[0], "messages[0]messages[0]messages[0]")
    //     sendMessageServer(messages[0]?.text)
    // }, [])


    const sendMessageServer = async (message, props) => {
        if (influencer) {

            // console.log(props, "props")
            const content = `${message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}`;
            let request = new SendMessageRequest(content);
            console.log(request, "request")
            const data1 = {
                _id: request.requestId,
                text: request.content,
                createdAt: new Date(),
                user: {
                    _id: authRed?.data?._id,
                    name: authRed?.data?.name,
                    avatar: authRed?.data?.profile_image_url,
                    accountType: authRed?.data?.account_type,
                }
            }

            const dataa = {
                author: authRed?.data?.name,
                avatar: authRed?.data?.profile_image_url,
                user_id: authRed?.data?._id,
                content: request.content,
                accountType: authRed?.data?.account_type,
                datetime: new Date(),
            };


            setMessages((preState) => [...preState, data1]);
            saveInfluencerChat(data?._id, dataa)
            // if (message?.attributes?.user_id === authRed?.data?._id && data?._id) {

            //     saveChat(data?._id, dataa)
            // }


        } else {
            const content = `${message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}`;
            let request = new SendMessageRequest(content);
            try {
                await chatRoom.sendMessage({
                    ...request,
                    Attributes: {
                        user_id: authRed?.data?._id,
                        name: authRed?.data?.name,
                        image: authRed?.data?.profile_image_url,
                        accountType: authRed?.data?.account_type,
                    }
                });
            } catch (error) {
                console.log(error, "errorerrorerrorerror")
            }
        }
    };

    function dateToFromNowDaily(myDate) {
        var fromNow = moment(myDate).format('LLL');

        return moment(myDate).calendar(null, {
            lastWeek: 'LLL',
            lastDay: '[Yesterday] h:mm A',
            sameDay: '[Today] h:mm A',
            sameElse: function () {
                return "[" + fromNow + "]";
            }
        });
    }


    function mapUser(user) {
        return {
            _id: user.id,
            name: user.displayName,
            avatar: user.displayPictureUrl,
        };
    }

    function renderMessage(props) {

        // <View style={{
        //     width: responsiveFontSize(tablet?3.1:5.1),
        //     height: responsiveFontSize(tablet?3.1:5.1),
        //     borderRadius: responsiveScreenFontSize(50),
        //     borderWidth: responsiveScreenFontSize(0.3),
        //     justifyContent: 'center', alignItems: 'center',
        //     marginTop: responsiveScreenFontSize(1.4)

        // }}>
        //     <Image resizeMode='cover' style={{
        //         width: responsiveHeight(tablet?3:5),
        //         height: responsiveHeight(tablet?3:5),
        //         borderRadius: responsiveScreenFontSize(50)
        //     }} source={{ uri: data?.brand_profile }} />
        // </View>
        // console.log(props.currentMessage.user, "[[[[[[[[[[[[[[[[[")
        if (props.currentMessage.user.accountType == 'brand') {
            return (

                <View style={{
                    width: '100%',
                    marginVertical: responsiveScreenFontSize(0.4),
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start'
                }}>
                    <View style={{ width: '15%' }}>
                        <View style={{
                            width: responsiveFontSize(tablet ? 3.1 : 5.1),
                            height: responsiveFontSize(tablet ? 3.1 : 5.1),
                            borderRadius: responsiveScreenFontSize(50),
                            borderWidth: responsiveScreenFontSize(tablet ? 0.1 : 0.3),
                            justifyContent: 'center', alignItems: 'center',
                            marginTop: responsiveScreenFontSize(tablet ? 0.75 : 1.4)

                        }}>
                            <Image resizeMode='cover' style={{
                                width: responsiveHeight(tablet ? 3 : 5),
                                height: responsiveHeight(tablet ? 3 : 5),
                                borderRadius: responsiveScreenFontSize(50)
                            }} source={{ uri: data?.brand_profile }} />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            width: '85%'
                        }}>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            backgroundColor: '#ebebeb',
                            padding: responsiveScreenFontSize(tablet ? 0.5 : 1),
                            borderRadius: responsiveFontSize(tablet ? 1 : 2),
                            width: '100%'
                        }}
                        >
                            <View style={{
                                borderRadius: responsiveFontSize(2),
                                // width:responsiveWidth(10),
                                paddingHorizontal: responsiveFontSize(1),
                                height: responsiveHeight(3),
                                backgroundColor: 'white',
                                position: 'absolute', top: -10, right: -4, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: tablet ? responsiveFontSize(1.2) : responsiveFontSize(1.5) }}>0 {' '}</Text>

                                <AntDesign
                                    name="hearto"
                                    color={'#010b40'}
                                    size={responsiveFontSize(tablet ? 1 : 1)}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                                <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(tablet ? 1 : 1.5), fontWeight: '500' }} >{props.currentMessage.user.name}{' '}</Text>
                                <Icon
                                    name="checkbox"
                                    style={{ marginLeft: responsiveFontSize(0.2) }}
                                    color={colors.themeblue}
                                    size={responsiveFontSize(tablet ? 1 : 2.3)}
                                />

                            </View>
                            <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(tablet ? 0.75 : 1.7), fontWeight: '400', textAlign: 'left', marginVertical: responsiveScreenFontSize(0.5) }} numberOfLines={10} >{props.currentMessage.text}</Text>
                            {/* <Text style={{ color: 'black', fontSize: responsiveFontSize(1.3), textAlign: 'left', }}>{dateToFromNowDaily(props?.currentMessage?.createdAt.toString())}</Text> */}
                        </View>
                        <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', marginTop: responsiveFontSize(tablet ? 0.5 : 1.25), justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 0.75 : 1.3), textAlign: 'left', }}>{dateToFromNowDaily(props?.currentMessage?.createdAt.toString())}</Text>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 0.75 : 1.3), textAlign: 'left', }}>Reply</Text>
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginLeft: responsiveHeight(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>


                            <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(1.5), fontWeight: '800' }} >{props.currentMessage.user.name}</Text>
                            <Icon
                                name="checkbox"
                                style={{ marginLeft: responsiveFontSize(0.2) }}
                                color={colors.themeblue}
                                size={responsiveFontSize(2.3)}
                            />


                        </View>
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.7), fontWeight: '400', textAlign: 'left', marginVertical: responsiveScreenFontSize(0.5) }} >{props.currentMessage.text}</Text>
                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.3), textAlign: 'left' }}>{dateToFromNowDaily(props?.currentMessage?.createdAt.toString())}</Text>
                    </View> */}
                    <View style={{ height: responsiveHeight(tablet ? 0.75 : 1) }} />

                </View>
            )
        } else {
            return (
                <View style={{
                    width: '100%',
                    marginVertical: responsiveScreenFontSize(0.4),
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start'
                }}>
                    <View style={{ width: '15%' }}>
                        <View style={{
                            width: responsiveFontSize(tablet ? 3.1 : 5.1),
                            height: responsiveFontSize(tablet ? 3.1 : 5.1),
                            borderRadius: responsiveScreenFontSize(50),
                            borderWidth: responsiveScreenFontSize(0.05),
                            justifyContent: 'center', alignItems: 'center',
                            marginTop: responsiveScreenFontSize(tablet ? 0.75 : 1.4)
                        }}>
                            <Text style={{
                                fontSize: responsiveScreenFontSize(tablet ? 1.5 : 2), fontWeight: '900',
                                textTransform: 'capitalize'
                            }}>{props.currentMessage.user.name[0]}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            width: '85%'
                        }}>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            backgroundColor: '#ebebeb',
                            padding: responsiveScreenFontSize(tablet ? 0.5 : 1),
                            borderRadius: responsiveFontSize(tablet ? 1 : 2),
                            width: '100%'
                        }}
                        >
                            <View style={{
                                borderRadius: responsiveFontSize(2),
                                // width:responsiveWidth(10),
                                paddingHorizontal: responsiveFontSize(1),
                                height: responsiveHeight(3),
                                backgroundColor: 'white',
                                position: 'absolute', top: -10, right: -4, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: tablet ? responsiveFontSize(1) : responsiveFontSize(1.5) }}>0 {' '}</Text>

                                <AntDesign
                                    name="hearto"
                                    color={'#010b40'}
                                    size={responsiveFontSize(tablet ? 0.5 : 1)}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                                <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(tablet ? 1 : 1.5), fontWeight: '500' }} >{props.currentMessage.user.name}{' '}</Text>
                            </View>
                            <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(tablet ? 0.75 : 1.7), fontWeight: '400', textAlign: 'left', marginVertical: responsiveScreenFontSize(0.5) }} numberOfLines={10} >{props.currentMessage.text}</Text>
                            {/* <Text style={{ color: 'black', fontSize: responsiveFontSize(1.3), textAlign: 'left', }}>{dateToFromNowDaily(props?.currentMessage?.createdAt.toString())}</Text> */}
                        </View>
                        <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', marginTop: responsiveFontSize(tablet ? 0.5 : 1.25), justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 0.75 : 1.3), textAlign: 'left', }}>{dateToFromNowDaily(props?.currentMessage?.createdAt.toString())}</Text>
                            <Text style={{ color: 'black', fontSize: responsiveFontSize(tablet ? 0.75 : 1.3), textAlign: 'left', }}>Reply</Text>
                        </View>
                    </View>
                    <View style={{ height: responsiveHeight(tablet ? 0.75 : 1.5) }} />

                </View>
            )
        }
    }

    // console.log(flatLayout.width/flatLayout.height,"fff")

    function renderInputToolbar(props) {
        // console.log(props,"props")
        return (
            <View style={{
                height: responsiveHeight(tablet ? 5 : 9),
                // paddingVertical:responsiveHeight(8),
                width: responsiveWidth(100),
                // marginHorizontal: responsiveHeight(8),
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#f5f5f5',
                alignSelf: 'center',
                backgroundColor: '#ebebeb',
                justifyContent: 'center',
                alignItems: 'center',
                // paddingBottom:responsiveScreenFontSize(1)

            }}>
                <View style={{
                    height: responsiveScreenFontSize(tablet ? 3 : 6),
                    width: responsiveWidth(tablet ? 95 : 90),
                    flexDirection: 'row',
                    borderRadius: responsiveScreenFontSize(tablet ? 1.5 : 3),
                    justifyContent: 'center', alignItems: 'center',
                    borderColor: colors.themeblue,
                    backgroundColor: 'white'
                    // paddingBottom:responsiveScreenFontSize(1)

                }}>
                    <TextInput
                        placeholder='Tap here to write'
                        onChangeText={v => setComments(v)}
                        value={comments}
                        // textAlign='left'
                        keyboardType='default'
                        placeholderTextColor={colors.themeblue}
                        style={{ width: '80%', color: colors.themeblue, paddingLeft: 30, fontSize: responsiveFontSize(tablet ? 1 : 1.75) }}
                    />
                    <TouchableOpacity onPress={() => {
                        // console.log("first")
                        // onSend(props.messages[0])
                        sendMessageServer(comments, props)
                        setComments('')
                    }} style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: colors.themeblue, fontSize: responsiveFontSize(tablet ? 1.25 : 2), fontWeight: '700', textAlign: 'center' }}>
                            {
                                comments.length > 0 ?
                                    'SEND' : '@'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    function isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToTop = 80;
        return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
    }

    function loadMoreMessage() {
        console.log("LOAD MORE MESSAGES")
    }


    return (

        <Modal
            key={index}
            animationType="fade"
            transparent={true}
            style={{
                flex: 1,
                justifyContent: 'center',
                elevation: 5,

            }}
            onRequestClose={() => {
                closeFunction()
            }}
            statusBarTranslucent={true}
            visible={opens}>

            <KeyboardAvoidingView
                behavior={"height"}
                enabled={Platform.OS === "ios" ? false :true }
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}
            >

                <SafeAreaView style={{flex:1}}>
                    <View style={styles.modalCont}>

                        {/* <TouchableWithoutFeedback onPress={() => {
    closeFunction()
}}>
    <View style={styles.modalViews}></View>
</TouchableWithoutFeedback> */}
                        <View style={[styles.modalView, {
                            height: (flatLayout?.height + responsiveScreenFontSize(tablet?4.5:8)) - Dimensions.get('screen').width / (16 / 9),
                            // marginBottom: keyboardStatus == 'open' ? responsiveHeight(tablet?30.8:38.5) : 0,
                            // height: tablet ? responsiveHeight(50+8) :  responsiveHeight(56)
                            // (responsiveHeight(96)-responsiveWidth(56.25))
                        }]}>
                            <View style={{
                                width: '100%',
                                // height: responsiveScreenFontSize(5),
                                justifyContent: 'space-between',
                                alignItems: 'flex-start', flexDirection: 'row', top: -10
                            }}>
                                <View style={{ justifyContent: 'center', alignItems: "center", alignSelf: 'center', width: '100%', }}>
                                    <Text style={{ color: colors.themeblue, fontSize: responsiveScreenFontSize(tablet ? 1.25 : 2), textAlign: 'center' }}>{title} ({messages?.length})</Text>
                                    {/* <Ionicons
                        name="ios-chatbox-ellipses"
                        color={colors.themeblue}
                        size={responsiveFontSize(tablet ? 1 : 3)}
                    />
                    */}
                                    <View style={{ position: 'absolute', right: 0 }}>
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: 'center', alignItems: 'flex-start', height: responsiveScreenFontSize(5)
                                            }}
                                            onPress={() => {
                                                closeFunction()
                                            }}>
                                            <AntDesign
                                                name="close"
                                                color={'#010b40'}
                                                size={responsiveFontSize(tablet ? 2 : 3)}
                                            />

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {
                                loader && !connected ? <Loader color={colors.themeblue} /> : <View style={{ flex: 1, backgroundColor: 'white', }}>
                                    <GiftedChat
                                        disableComposer={false}
                                        listViewProps={{
                                            showsVerticalScrollIndicator: false,
                                            // scrollEventThrottle: 400,
                                            // onScroll: ({ nativeEvent }) => { if (isCloseToTop(nativeEvent)) loadMoreMessage(); }
                                            // style: { marginBottom: responsiveHeight(5) },
                                        }}
                                        wrapInSafeArea='true'
                                        renderMessage={renderMessage}
                                        scrollToBottomOffset={400}
                                        alignTop={true}
                                        scrollToBottom={true}
                                        timeFormat='LT'
                                        // placeholder='Type a message...'
                                        user={mapUser(messages)}
                                        messages={messages}
                                        // onSend={messages => {
                                        //     sendMessageServer(messages[0]?.text)
                                        //     console.log(messages, "messages")
                                        //     // onSend(messages)
                                        // }}

                                        inverted={false}
                                        user={{
                                            _id: authRed?.data?._id,
                                        }}
                                        minInputToolbarHeight={responsiveHeight(9)}
                                        renderInputToolbar={renderInputToolbar}
                                    />
                                    {/* {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
            } */}

                                </View>
                            }


                            {/* <View style={{ height: responsiveScreenFontSize(1) }} /> */}
                        </View>
                        {
                            keyboardStatus == 'open' ?
                                <View style={{ height: responsiveHeight(0) }}></View> : null

                        }
                        {/* <View style={{ height: responsiveHeight(2) }}></View> */}
                    </View>
                </SafeAreaView>

            </KeyboardAvoidingView>

        </Modal>

    );
};


const styles = StyleSheet.create({
    btn: {
        height: responsiveFontSize(4),
        width: responsiveFontSize(20),
        margin: 5,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCont: {
        flex: 1,
        // justifyContent: '',
        // alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        // height: tablet? responsiveHeight(50): responsiveScreenFontSize(55),
        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,
        paddingTop: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(3),


    },
    modalViews: {
        width: responsiveWidth(100),
        backgroundColor: 'rgba(0,0,0,0.0)',
        height: tablet ? responsiveHeight(50) : responsiveScreenFontSize(48),
        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 15,

    },
    modalHeadCont: {
        alignSelf: 'flex-end',
    },
    crossBtn: {
        alignItems: 'flex-end',
        width: responsiveWidth(6),
    },
    modalBody: {},
    sortByCont: {
        marginVertical: responsiveHeight(1),
    },
    datePicker: {
        backgroundColor: 'white',
        width: responsiveWidth(40),
        height: responsiveHeight(4.5),
        borderRadius: responsiveFontSize(0.5),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        justifyContent: 'center',
    },
});

function mapStateToProps({ getChatTokenRed, getChatRed, saveChatRed, authRed, getChatInfluencerRed }) {
    return {
        getChatTokenRed, getChatRed, saveChatRed, authRed, getChatInfluencerRed
    };
}

export default connect(mapStateToProps, liveChatAct)(ChatModal);

