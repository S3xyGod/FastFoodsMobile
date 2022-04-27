import { StyleSheet } from "react-native";
import size, { _mph, _mpw } from '../../untils/size';
import colors from '../../untils/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
      },
      scrollView: {
        // flexGrow: 1,
        marginTop: _mph(5),
        alignItems: 'center',
      },
      slide: {
        height: _mph(150),
      },
      viewScroolNgang: {
        marginHorizontal: _mph(5),
        marginTop: _mph(5)
      },
      viewHinhAnhKemTitle: {
        width: size.ScreenWidth / 3,
        height: _mph(50),
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.Green,
        marginHorizontal: _mph(5),
        alignItems: 'center',
        borderRadius: _mph(15),
        backgroundColor: colors.Green,
      },
      imageItemScroolNgang: {
        resizeMode: 'stretch',
        height: '80%',
        width: '40%',
      },
      viewTxt:{
        width: '55%',
        alignItems:'center',
      },
      txtScroolNgang: {
        marginLeft: _mpw(2),
        textAlign:'center',
        color: colors.Black
      }

});