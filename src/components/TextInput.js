import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTranslation} from 'react-i18next';
import { TextInput as Input, useTheme } from "react-native-paper";

export default function TextInput({ errorText, description, ...props  }) {

  const theme = useTheme();
  const {t, i18n} = useTranslation();
    const getTextAlignment = () => {
        const { i18n } = useTranslation();
      
        if (i18n.language === 'AR' || i18n.language === 'HE') {
          return 'right'; // Right-to-left alignment for Spanish
        } else {
          return 'left'; // Left-to-right alignment for other languages
        }
      };
      const textAlignment = getTextAlignment();

  return (
    <View style={styles.container} >
      <Input
        style={[styles.input, { textAlign: textAlignment }]}
        underlineColor="transparent"
        mode="outlined"
        selectionColor={theme.colors.primary}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
  },
  description: {
    fontSize: 13,
    color: 'blue',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
});