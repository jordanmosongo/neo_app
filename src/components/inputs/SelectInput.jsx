import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import apiUrls from "../../../apiUrls";
import { useSelector } from "react-redux";

export const SelectPickerInput = (props) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [data, setData] = useState([]);

    const token = useSelector(({ user: { tokens } }) => tokens.access);

    const fetchInterests = async() => {
      try {
        const {data} = await axios.get(`${apiUrls.interests}`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        const formattedData = data.map((interest) => ({
          value: interest,
          label: interest,
        }));
        setData(formattedData);
      } catch (error) {
        console.log("error fetching interests", error);
      }
    }

    useEffect(() => {
        setSelectedValues(props.defaultInterests);
    }, [props.defaultInterests]);

    useEffect(() => {
      (async() => await fetchInterests())();
    }, []);

    useEffect(() => {
      props.setInterest(selectedValues);
    }, [selectedValues]);

    

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Centres d'intérets"
                value={selectedValues}
                onChange={(items) => {
                    setSelectedValues(items);
                }}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    dropdown: { height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, paddingHorizontal: 10 },
    selectedStyle: { borderRadius: 5, backgroundColor: "#ddd", padding: 5, margin: 2 },
    selectedText: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
});
