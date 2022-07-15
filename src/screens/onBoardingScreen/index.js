import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    StatusBar,
    FlatList,
    View,
    Text,
    TouchableOpacity, Image
} from "react-native";
import {accessibilityRole} from "react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes";


const {width, height} = Dimensions.get("window");

const COLORS = {primary: '#f15454', white: '#fff'};

const slides = [
    {
        id: '1',
        image: require('../../images/Countdown-Screenshot-2.png'),
        title: 'Keep track from anywhere',
        subtitle: 'Countdown to Graduation will help you keep track of your ' +
            'courses, credits, and gpa anywhere with screens to see just your major, ' +
            'core, minor, or elective courses' +
        ' and a screen to see them all.'

    },
    {
        id: '2',
        image: require('../../images/Countdown-Screenshot.png'),
        title: 'Search for courses',
        subtitle: 'Easily search through Chestnut Hill College\'s course catalog for the courses you\'re taking.' +
            '  It\'s ok if you don\'t know the exact name of a course.  ' +
            'Just enter part of it and Countdown to Graduation will find it for you.'
    },
    {
        id: '3',
        image: require('../../images/Countdown-Screenshot-3.png'),
        title: 'Save and edit courses',
        subtitle: 'Save your courses and make changes to them whenever you need.  ' +
            'Then, check your gpa and countdown your credits until your graduation.'
    },
];

const Slide = ({item}) => {
    return  (
        <View style={{alignItems: 'center'}}>
            <Image source={item.image} style={{height: '65%', width, resizeMode: 'contain'}}/>
            <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        </View>
    );
};
const onBoardingScreen = ({navigation}) => {
    const [currentSlideIndex,setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef(null);
    const Footer = () => {
        return (
            <View style={{
                height: height * 0.25,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop:20,
                    }}>
                    {slides.map((_,index) => (
                        <View key={index} style={[styles.indicator,
                            currentSlideIndex == index && {
                                backgroundColor: COLORS.white,
                                width: 25,
                            },
                            ]} />
                    ))}
                </View>
                <View accessibilityRole={"adjustable"} style={{marginBottom: 20}}>
                    {
                        currentSlideIndex == slides.length -1 ? <View style={{height: 50}}>
                            <TouchableOpacity accessibilityRole={"button"} style={[styles.btn]} onPress={() => navigation.replace('Home')} >
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                    Begin
                                </Text>
                            </TouchableOpacity>
                        </View> :  <View style = {{flexDirection: 'row'}}>
                            <TouchableOpacity
                                accessibilityRole={"button"}
                                accessibilityHint={"Skip Entire Tutorial"}
                                onPress={skip}
                                style={[styles.btn,
                                    {
                                        borderWidth: 1,
                                        borderColor: COLORS.white
                                    },
                                ]}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                    Skip
                                </Text>
                            </TouchableOpacity>
                            <View style = {{width: 15}}/>
                            <TouchableOpacity
                                accessibilityRole={"button"}
                                accessibilityHint={"Next Tutorial Slide"}
                                style={[styles.btn]}
                                onPress={goNextSlide}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    };
    const updateCurrentSlideIndex = e => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);

    };
    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if(nextSlideIndex != slides.length){
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({offset});
            setCurrentSlideIndex(nextSlideIndex);
        }

    };
    const skip = () => {
        const lastSlideIndex = slides.length -1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex);
      
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
            <StatusBar backgroundColor={COLORS.primary} />
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                pagingEnabled
                data={slides}
                contentContainerStyle={{height: height * 0.75}}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Slide item={item}/>}
            />
            <Footer />
        </SafeAreaView>
                );
};
const styles = StyleSheet.create({
    title:{
        color: COLORS.white,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',


    },
    subtitle:{
        color: COLORS.white,
        fontSize: 13,
        maxWidth: '70%',
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 23,
        width: 350,

    },
    indicator:{
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        margin: 2,
        flex: 1,
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        flex: 1,
        flexGrow:1,
        width: 0,
    },

});
export default onBoardingScreen;
