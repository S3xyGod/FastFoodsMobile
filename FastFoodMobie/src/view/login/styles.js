import { StyleSheet } from "react-native";
import size, { _mph, _mpw } from '../../untils/size';
import colors from '../../untils/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    imageLogin: {
        height: _mph(300),
        width: size.ScreenWidth,
        marginTop: _mph(20),
        alignItems: 'center',
        alignContent: 'center',
        alignContent: 'center',
        resizeMode: 'stretch'
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: "powderblue"
    },
    viewBtnLogin: {
        width: _mpw(150),
        height: _mph(30),
        borderRadius: 50,
        backgroundColor: colors.Green,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: size.REAL_SIZE_20
    },
    textBtnLogin: {
        fontSize: size.REAL_SIZE_16,
        color: colors.WHITE,
    },
    viewSignUp: {
        alignItems: 'center',
        marginTop: _mph(10),
        flexDirection: 'row',
        justifyContent: "center",
    },
    textDontHaveAcc: {
        fontSize: size.REAL_SIZE_12,
        color: 'black'
    },
    textSignUp: {
        fontSize: size.REAL_SIZE_12,
        color: colors.Green,
    },
    viewTextSignUp: {
        borderBottomWidth: 1,
        borderBottomColor: colors.Green,
    },
    viewCheckBox: {
        flexDirection: 'row',
        marginTop: _mph(10),
        alignSelf: 'auto',
        height: size.REAL_SIZE_40,
        alignItems: 'center'
    },
    viewTextCheckbox: {
        justifyContent: 'center',
    },
    labelCheckbox: {
        marginLeft: _mpw(10),
        fontSize: size.REAL_SIZE_14,
        color: "black"
    },
    fieldInput: {
        flexDirection: 'row',
        height: size.REAL_SIZE_40,
        backgroundColor: colors.Gray3,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: size.REM * 220,
        marginTop: _mph(10)
    },
    holderInput:{
        fontSize: 16,
        marginLeft: size.REAL_SIZE_16 
    }
});
