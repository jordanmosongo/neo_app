import React from "react";
import { Button } from "react-native-paper";
import { FONTS } from "../../../constants/theme";

type PropsType = {
    radius?: number,
    verticalMargin?: number,
    marginRight?: any,
    padding?: any,
    withBorder?: boolean,
    icon?: any,
    color: any,
    txtColor: any,
    loading?: boolean,
    label: String,
    labelColor?: any,
    handleClick: () => void
}

const MainButton = (props: PropsType) => {
  return (
    <>
      <Button
        style={{ 
           borderRadius: props.radius || 50, 
           marginVertical: props.verticalMargin || 10,
           marginRight: props.marginRight,
           padding: props.padding,
           borderColor: props.withBorder ? props.txtColor : 'transparent',
           borderWidth: props.withBorder ? 1 : 0
        }}
        icon={props.icon}
        mode="contained"
        buttonColor={props.color}
        textColor={props.txtColor}
        labelStyle={{ color: props.txtColor, fontFamily: FONTS.POPPINS_REGULAR }}
        loading={props.loading}
        uppercase={false}
        onPress={() => props.handleClick()}
      >
        {props.label}
      </Button>
    </>
  );
};

export default MainButton;


