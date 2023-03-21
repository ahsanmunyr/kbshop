// @ts-nocheck
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Avatar, Bubble, Send, InputToolbar } from 'react-native-gifted-chat'
import * as liveChatAct from '../../../store/actions/liveChatAct';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    Linking,
    ActivityIndicator,
    Alert,
    Platform,
    SafeAreaView,
    KeyboardAvoidingView,
    FlatList,
    TextInput,
    Keyboard

} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import IconCross from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import {
    NavigationContainer,
    useNavigation,
    useTheme,
} from '@react-navigation/native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import ShareIcon from 'react-native-vector-icons/Entypo';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import ShopIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';
import numeral from 'numeral';
import deviceInfo from 'react-native-device-info';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {
    ChatRoom,
    DeleteMessageRequest,
    DisconnectUserRequest,
    SendMessageRequest,
} from 'amazon-ivs-chat-messaging';
import Loader from '../../../components/Loader';

const { width, height } = Dimensions.get('window');
const tablet = deviceInfo.isTablet();


const ChatScreen = ({ event, getChat, getChatRed, getChatTokenRed, authRed, saveChat, current, createChatToken }) => {

    const [messages, setMessages] = useState([]);
    const [comments, setComments] = useState('');
    const [loader, onChangeLoader] = useState(false);
    const [value, setValue] = useState('');
    const [connected, setConnected] = useState(false);
    const [chatRoom, setChatRoom] = useState([]);
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
      
        useEffect(() => {
          const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            console.log(e, "e")
            setKeyboardStatus("Keyboard Shown");
          });
          const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
               console.log(e, "e")
            setKeyboardStatus("Keyboard Hidden");
          });
      
          return () => {
            showSubscription.remove();
            hideSubscription.remove();
          };
        }, []);

    useEffect(() => {
        if (event?._id) {
            getChat(event?._id)
        }
    }, [])

    useEffect(() => {
        onChangeLoader(true)
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
    }, [getChatTokenRed]);

    useEffect(() => {
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
    }, [getChatRed])

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

                const data = {
                    author: message?.attributes?.name,
                    avatar: message?.attributes?.image,
                    user_id: message?.attributes?.user_id,
                    content: message.content,
                    accountType: message?.attributes?.accountType,
                    datetime: message?.sendTime
                };

                // {
                //     _id: i || item?.user_id,
                //     text: item?.content,
                //     createdAt: new Date(),
                //     user: {
                //         _id: item?.user_id,
                //         name: item.author,
                //         avatar: item?.avatar
                //     }
                // };
                // console.log(data1, "{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}")
                setMessages((preState) => [...preState, data1]);

                if (message?.attributes?.user_id === authRed?.data?._id && event?._id) {
                    saveChat(event?._id, data)
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
    const onSend = useCallback((messages = []) => {
        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        // sendMessageServer(messages[0]?.text)
    }, [])


    const sendMessageServer = async (message) => {
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
    };




    if (!connected && !loader) {
        return (
            <Loader />
        )
    }

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

    // function renderBubble(props) {

    //     return (
    //         <Bubble
    //             {...props}

    //             wrapperStyle={{

    //                 left: {
    //                     backgroundColor: props.currentMessage.user.accountType == 'brand' ? colors.themeblue : 'white',
    //                 },
    //             }}
    //         />
    //     );
    // }
    // function renderMessage(props) {
    //     // console.log(props.currentMessage.text, "propspropspropsprops")
    //     return (
    //         <View style={{ padding: responsiveFontSize(1) }}>
    //             <Text style={{ color: props.currentMessage.user.accountType == 'brand' && 'white' }} >{props.currentMessage.text}</Text>
    //         </View>
    //     )
    // }
    // function renderUsername(props) {
    //     // console.log(props.currentMessage.text, "propspropspropsprops")
    //     return (
    //         <View style={{ padding: responsiveFontSize(1), height: responsiveFontSize(4), width: responsiveWidth(5) }}>
    //             <Text style={{ color: 'black' }} >{props.currentMessage.user.name}</Text>
    //         </View>
    //     )
    // }

    function renderMessage(props) {
        // console.log(props.currentMessage.text, "propspropspropsprops")
        if (props.currentMessage.user.accountType == 'brand') {
            return (
             
                <View style={{
                    // padding: responsiveFontSize(1),
                    paddingVertical: responsiveFontSize(2),
                    paddingHorizontal: responsiveFontSize(2),
                    // height: responsiveFontSize(10), 
                    marginHorizontal: responsiveScreenFontSize(1),
                    backgroundColor: colors.themeblue,
                    maxWidth: '90%',
                    minWidth: '50%',
                    marginVertical: responsiveScreenFontSize(0.4),
                    borderRadius: responsiveFontSize(1), alignSelf: 'flex-start'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                        <Text style={{ color: 'white', fontSize: responsiveFontSize(1.8), fontWeight: '800' }} >{props.currentMessage.user.name}</Text>
                        <Icon
                            name="checkbox"
                            style={{ marginLeft: responsiveFontSize(0.2) }}
                            color={'white'}
                            size={responsiveFontSize(2.3)}
                        />


                    </View>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.6), fontWeight: '400', textAlign: 'left' }} >{props.currentMessage.text}</Text>
                    <View style={{ height: responsiveHeight(1) }} />
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(1.3), textAlign: 'right' }}>{dateToFromNowDaily(props?.currentMessage?.createdAt.toString())}</Text>
                </View>
            )
        } else {
            return (
                <View style={{
                    // padding: responsiveFontSize(1),
                    paddingVertical: responsiveFontSize(2),
                    paddingHorizontal: responsiveFontSize(2),
                    // height: responsiveFontSize(10), 
                    marginHorizontal: responsiveScreenFontSize(1),
                    backgroundColor: '#e8e8e8',
                    maxWidth: '90%',
                    minWidth: '50%',
                    marginVertical: responsiveScreenFontSize(0.4),
                    borderRadius: responsiveFontSize(1), alignSelf: 'flex-start'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                        <Text style={{ color: 'black', fontSize: responsiveFontSize(1.8), fontWeight: '800' }} >{props.currentMessage.user.name}{' '}</Text>



                    </View>
                    <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6), fontWeight: '400', maxWidth: '80%', textAlign: 'left' }} numberOfLines={10} >{props.currentMessage.text}</Text>
                    <View style={{ height: responsiveHeight(1) }} />
                    <Text style={{ color: 'black', fontSize: responsiveFontSize(1.3), textAlign: 'right', }}>{dateToFromNowDaily(props?.currentMessage?.createdAt.toString())}</Text>
                </View>
            )
        }
    }


    function renderInputToolbar(props) {
        return (
           
            <View style={{ height: responsiveScreenFontSize(5), width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', borderColor: 'grey' }}>
                <TextInput
                    placeholder='Type a message...'
                    onChangeText={v => setComments(v)}
                    value={comments}
                    keyboardType='default'
                    style={{ width: '80%', height: responsiveScreenFontSize(5), color: 'black' }}
                />
                <TouchableOpacity onPress={() => { onSend("ASDAS") }} style={{ width: '20%', height: responsiveScreenFontSize(5), justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, right: 10 }}>
                    <Text style={{ color: 'blue', fontSize: responsiveFontSize(2), fontWeight: '700', textAlign: 'center' }}>SEND</Text>
                </TouchableOpacity>
            </View>
    
        );
    }

    return (
       
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <GiftedChat
                    disableComposer={current == 'previous' && true}
                    wrapInSafeArea='true'
                    renderMessage={renderMessage}
                    scrollToBottomOffset={400}
                    alignTop={false}
                    scrollToBottom={true}
                    timeFormat='LT'
                    placeholder='Type a message...'
                    user={mapUser(messages)}
                    messages={messages}
                    onSend={messages => {
                        sendMessageServer(messages[0]?.text)
                        // onSend(messages)
                    }}
                
                    inverted={false}
                    user={{
                        _id: authRed?.data?._id,
                    }}
                    
                    // renderInputToolbar={renderInputToolbar}
                />

                {
                    Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
                }
            </View>
      
    )
}

function mapStateToProps({ getChatRed, saveChatRed, authRed, getChatTokenRed,  }) {
    return { getChatRed, saveChatRed, getChatTokenRed, authRed };
}

export default connect(mapStateToProps, liveChatAct)(ChatScreen);